import {parse} from '@babel/parser';
import {ALLOWED_LIBRARIES} from './config';

// Identifiers a widget has no legitimate reason to touch: they reach outside
// the isolated preview (real window/DOM/storage) or execute arbitrary code
// dynamically. The sandbox iframe already blocks most of what these could
// do (opaque origin, connect-src 'none', no allow-same-origin), but flagging
// them here lets Studio reject the code before it's even sent to preview,
// with a specific reason instead of a generic sandbox runtime error.
const BANNED_IDENTIFIERS = new Set([
  'window',
  'document',
  'globalThis',
  'self',
  'parent',
  'top',
  'frames',
  'localStorage',
  'sessionStorage',
  'indexedDB',
  'caches',
  'process',
  'require',
  'eval',
  'Function',
  'fetch',
  'XMLHttpRequest',
  'WebSocket',
  'Worker',
  'SharedWorker',
  'importScripts',
]);

function isNode(value) {
  return value && typeof value === 'object' && typeof value.type === 'string';
}

// Positions where an Identifier node is a *name* (object key, member
// property, declared binding) rather than a read reference to a variable.
// `top: 0` in a style object or `.parent` as a prop name must not trip the
// banned-identifier check the way `window.top` or `fetch(...)` should.
function isNamePosition(parent, key) {
  if (!parent) return false;
  if (
    (parent.type === 'ObjectProperty' ||
      parent.type === 'ObjectMethod' ||
      parent.type === 'ClassProperty' ||
      parent.type === 'ClassPrivateProperty' ||
      parent.type === 'ClassMethod') &&
    key === 'key' &&
    !parent.computed
  ) {
    return true;
  }
  if (
    (parent.type === 'MemberExpression' || parent.type === 'OptionalMemberExpression') &&
    key === 'property' &&
    !parent.computed
  ) {
    return true;
  }
  if (
    (parent.type === 'ImportSpecifier' ||
      parent.type === 'ImportDefaultSpecifier' ||
      parent.type === 'ImportNamespaceSpecifier' ||
      parent.type === 'ExportSpecifier') &&
    (key === 'imported' || key === 'local' || key === 'exported')
  ) {
    return true;
  }
  if (
    (parent.type === 'FunctionDeclaration' ||
      parent.type === 'FunctionExpression' ||
      parent.type === 'ArrowFunctionExpression' ||
      parent.type === 'ClassDeclaration' ||
      parent.type === 'ClassExpression' ||
      parent.type === 'VariableDeclarator') &&
    (key === 'id' || key === 'params')
  ) {
    return true;
  }
  return false;
}

function walk(node, visit, parent = null, parentKey = null) {
  if (Array.isArray(node)) {
    node.forEach((child) => walk(child, visit, parent, parentKey));
    return;
  }
  if (!isNode(node)) return;

  visit(node, parent, parentKey);

  for (const key of Object.keys(node)) {
    if (key === 'loc' || key === 'start' || key === 'end' || key === 'range') continue;
    const value = node[key];
    if (Array.isArray(value) || isNode(value)) {
      walk(value, visit, node, key);
    }
  }
}

function addViolation(violations, rule, message) {
  violations.push({rule, message});
}

/**
 * Statically checks AI-generated widget code against Sling's governance
 * policy before it is ever sent to the render sandbox: only allowlisted
 * libraries may be referenced, and no direct access to the browser globals
 * a self-contained widget should never need.
 */
export function checkCodePolicy(code, dependencies = {}) {
  const violations = [];

  const declaredLibraries = Object.keys(dependencies || {});
  declaredLibraries.forEach((lib) => {
    if (!ALLOWED_LIBRARIES.includes(lib)) {
      addViolation(
        violations,
        'disallowed-library',
        `"${lib}" is not an approved library for AI-generated widgets.`,
      );
    }
  });

  let ast;
  try {
    ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
      errorRecovery: true,
    });
  } catch (error) {
    addViolation(violations, 'parse-error', 'Generated code could not be parsed.');
    return {allowed: false, violations};
  }

  walk(ast.program, (node, parent, parentKey) => {
    if (node.type === 'Identifier' && isNamePosition(parent, parentKey)) {
      return;
    }

    if (node.type === 'ImportDeclaration') {
      // The render sandbox executes widget code via scope injection (its
      // dependencies come from the separate `dependencies` map, resolved to
      // real components inside the sandbox), not as an ES module — an
      // import statement can't run there at all, allowlisted source or not.
      addViolation(
        violations,
        'import-statement',
        'Generated widget code must not use import statements; declare dependencies separately.',
      );
      return;
    }

    // Dynamic import() parses as its own ImportExpression node in current
    // @babel/parser; older Babel versions represented it as a CallExpression
    // with an Import callee. Both are checked so this doesn't silently stop
    // catching it on a parser version bump either direction.
    if (
      node.type === 'ImportExpression' ||
      (node.type === 'CallExpression' && node.callee?.type === 'Import')
    ) {
      addViolation(
        violations,
        'dynamic-import',
        'Dynamic import() is not permitted in generated widgets.',
      );
      return;
    }

    if (node.type === 'Identifier' && BANNED_IDENTIFIERS.has(node.name)) {
      addViolation(
        violations,
        'banned-identifier',
        `Use of "${node.name}" is not permitted in generated widgets.`,
      );
    }
  });

  const seen = new Set();
  const deduped = violations.filter((v) => {
    const key = `${v.rule}:${v.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    allowed: deduped.length === 0,
    violations: deduped,
  };
}

export default checkCodePolicy;
