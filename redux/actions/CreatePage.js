import {
  FETCH_ERROR,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import ApiAuth from '../../@sling/services/ApiAuthConfig';
import {AI_SERVICE_URL, SAVE_ROUTE, SET_CONFIG} from '../../shared/constants/Services';
import {saveGeneratedWidget} from './Widgets';
import {fetchLayoutConfig} from './Dashboard';
import {getRoutesList} from './Route';
import {
  buildLayoutRoot,
  uniquePageKey,
  uniqueWidgetKey,
} from '../../modules/createPage/sectionContract';

export const generatePageFromPrompt = (prompt, themeConfig) => {
  return async (dispatch) => {
    try {
      const aiBase = (AI_SERVICE_URL || '').replace(/\/$/, '');
      const aiRes = await fetch(`${aiBase}/page/generate`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt, themeConfig}),
      });
      const data = await aiRes.json();
      if (!aiRes.ok) {
        throw new Error(data.error || 'Could not generate this page. Try a clearer prompt.');
      }
      if (!data.page || !Array.isArray(data.sections) || data.sections.length < 2) {
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

export const processGeneratedPage = ({page, sections, prompt}) => {
  return async (dispatch) => {
    try {
      const usedKeys = new Set();
      const savedWidgets = [];
      for (const section of sections) {
        const key = uniqueWidgetKey(section.key || section.id, usedKeys);
        const widget = await dispatch(
          saveGeneratedWidget(
            {
              code: section.code,
              dependencies: section.dependencies,
              name: section.name || section.label || key,
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

      const path = page?.path?.startsWith('/') ? page.path : `/${page?.path || pageKey}`;
      const routeRes = await Api.post(`${SAVE_ROUTE}`, {
        name: page?.title || pageKey,
        keys: [],
        page_template: pageKey,
        url: path,
        sample_string: path,
      });
      if (routeRes.status !== 200) {
        throw new Error('Template saved, but the route could not be created.');
      }
      dispatch(getRoutesList({page: 0, size: 100, quiet: true}));
      dispatch({
        type: SHOW_MESSAGE,
        payload: 'Saved as drafts. Edit them in Widgets and Page templates. Nothing is live yet.',
      });
      return {
        pageKey,
        path,
        widgetCount: savedWidgets.length,
      };
    } catch (error) {
      const msg = error.message || 'Process failed.';
      dispatch({type: FETCH_ERROR, payload: msg});
      return null;
    }
  };
};
