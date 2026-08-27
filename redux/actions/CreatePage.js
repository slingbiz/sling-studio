import {
  FETCH_ERROR,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import ApiAuth from '../../@sling/services/ApiAuthConfig';
import {
  GET_ROUTES_LIST_API,
  SAVE_ROUTE,
  SET_CONFIG,
} from '../../shared/constants/Services';
import {getAiBase, generateHeaders, generateErrorMessage} from '../../shared/aiGenerate';
import {publishWidgetAction, saveGeneratedWidget} from './Widgets';
import {fetchLayoutConfig} from './Dashboard';
import {getRoutesList} from './Route';
import {
  buildLayoutRoot,
  uniquePageKey,
  uniqueRoutePath,
  uniqueWidgetKey,
  ensureWidgetLabel,
} from '../../modules/createPage/sectionContract';

export const generatePageFromPrompt = (prompt, themeConfig) => {
  return async (dispatch) => {
    try {
      const aiBase = getAiBase();
      const aiRes = await fetch(`${aiBase}/page/generate`, {
        method: 'POST',
        headers: generateHeaders(),
        body: JSON.stringify({prompt, themeConfig}),
      });
      const data = await aiRes.json();
      if (!aiRes.ok) {
        throw new Error(generateErrorMessage(aiRes, data));
      }
      if (!data.page || !Array.isArray(data.sections) || data.sections.length < 5) {
        throw new Error('That page did not split into sections. Try again.');
      }
      return data;
    } catch (error) {
      const msg = error.message || 'Could not generate this page.';
      dispatch({type: FETCH_ERROR, payload: msg});
      return null;
    }
  };
};

export const processGeneratedPage = ({page, sections, prompt, onStatus}) => {
  return async (dispatch) => {
    const say = (message) => {
      if (typeof onStatus === 'function') onStatus(message);
    };
    try {
      const usedKeys = new Set();
      const savedWidgets = [];
      for (const [index, section] of sections.entries()) {
        say(
          `Saving ${section.label || section.name || 'widget'} (${index + 1} of ${
            sections.length
          })`,
        );
        const key = uniqueWidgetKey(section.key || section.id, usedKeys);
        const widget = await dispatch(
          saveGeneratedWidget(
            {
              code: section.code,
              dependencies: section.dependencies,
              name: ensureWidgetLabel(section.name || section.label || key),
              description: section.description || section.label || '',
              key,
              icon: section.icon || 'widgets',
              type: 'widget',
              props: section.props || [],
            },
            prompt,
            {quiet: true},
          ),
        );
        if (!widget) {
          throw new Error(`Could not save “${section.label || key}” as a draft widget.`);
        }
        savedWidgets.push(widget);
      }

      say('Creating the page template');
      const pageKey = uniquePageKey(page?.key || page?.title);
      const Api = await ApiAuth();
      if (!Api) {
        throw new Error('Your session expired. Sign in again.');
      }
      const configRes = await Api.post(`${SET_CONFIG}`, {
        type: 'layout',
        pageKey,
        meta: {
          title: page?.title || 'Generated page',
          description: page?.description || 'Created from a prompt.',
        },
        isNewRecord: true,
        root: buildLayoutRoot(savedWidgets),
      });
      if (configRes.status !== 200 || !configRes.data?.status) {
        throw new Error(configRes.data?.msg || 'Could not create the page template.');
      }
      dispatch(fetchLayoutConfig());

      let taken = [];
      try {
        const listRes = await Api.post(`${GET_ROUTES_LIST_API}`, {
          page: 0,
          size: 200,
        });
        const bundle = listRes.data?.routesList || listRes.data || {};
        const routes = Array.isArray(bundle) ? bundle : bundle.pageRoutes || [];
        taken = routes.map((route) => route.url_string || route.url).filter(Boolean);
      } catch (err) {
        taken = [];
      }
      const path = uniqueRoutePath({
        title: page?.title,
        key: page?.key || pageKey,
        preferred: page?.path,
        taken,
      });
      say(`Adding the route ${path}`);
      const routeRes = await Api.post(`${SAVE_ROUTE}`, {
        name: page?.title || pageKey,
        keys: [],
        page_template: pageKey,
        url: path,
        sample_string: path,
      });
      if (
        routeRes.status !== 200 ||
        routeRes.data?.response?.status === false
      ) {
        throw new Error(
          routeRes.data?.response?.msg ||
            'Template saved, but the route could not be created.',
        );
      }
      dispatch(getRoutesList({page: 0, size: 100, quiet: true}));
      dispatch({
        type: SHOW_MESSAGE,
        payload: 'Saved as drafts. Publish when you want this page live.',
      });
      return {
        id: pageKey,
        pageKey,
        path,
        title: page?.title || pageKey,
        prompt,
        widgets: savedWidgets,
        published: false,
      };
    } catch (error) {
      const msg = error.message || 'Process failed.';
      dispatch({type: FETCH_ERROR, payload: msg});
      return null;
    }
  };
};

export const publishGeneratedPage = ({widgets}) => {
  return async (dispatch) => {
    try {
      const list = Array.isArray(widgets) ? widgets : [];
      if (!list.length) {
        throw new Error('There are no widgets to publish.');
      }
      const published = [];
      for (const widget of list) {
        const id = widget._id || widget.id;
        if (!id) continue;
        const next = await dispatch(publishWidgetAction(id, {quiet: true}));
        if (!next) {
          throw new Error(`Could not publish “${widget.name || widget.key}”.`);
        }
        published.push(next);
      }
      dispatch({
        type: SHOW_MESSAGE,
        payload: 'Published. These widgets are live anywhere this template is used.',
      });
      return published;
    } catch (error) {
      const msg = error.message || 'Publish failed.';
      dispatch({type: FETCH_ERROR, payload: msg});
      return null;
    }
  };
};
