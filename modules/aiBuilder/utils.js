import {checkCodePolicy} from './codePolicy';

class CodeUtils {
  // Unescape the raw code string from the AI service and run it through the
  // static code policy check. Component/library resolution now happens
  // inside the sandbox itself (see pages/sandbox/widget-preview.js), so the
  // parent never needs to hand live component references across the
  // sandbox trust boundary — only serializable data (code text + a
  // library/component dependency list) crosses it.
  static cleanCode(response) {
    try {
      const {code: rawCode, dependencies = {}} = response;
      const unescapedCode = rawCode.replace(/\\n/g, '\n').replace(/\\"/g, '"');
      const trimmedCode = unescapedCode.trim();
      const policy = checkCodePolicy(trimmedCode, dependencies);

      return {
        code: trimmedCode,
        dependencies,
        policy,
      };
    } catch (error) {
      console.error('Error cleaning code:', error);
      return {
        code: '',
        dependencies: {},
        policy: {
          allowed: false,
          violations: [
            {rule: 'parse-error', message: 'Could not process the generated code.'},
          ],
        },
      };
    }
  }
}

export default CodeUtils;
