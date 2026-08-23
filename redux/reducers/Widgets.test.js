import widgetsReducer from './Widgets';
import {GET_WIDGETS_DATA} from '../../shared/constants/ActionTypes';

const initial = {
  widgets: null,
  totalCount: 0,
  generating: false,
  generatedWidget: null,
};

describe('widgets reducer list paging', () => {
  test('replaces the list on first page', () => {
    const next = widgetsReducer(initial, {
      type: GET_WIDGETS_DATA,
      payload: {widgets: [{_id: 'a'}], totalCount: 9, append: false},
    });
    expect(next.widgets).toEqual([{_id: 'a'}]);
    expect(next.totalCount).toBe(9);
  });

  test('appends on load-more', () => {
    const start = {...initial, widgets: [{_id: 'a'}], totalCount: 9};
    const next = widgetsReducer(start, {
      type: GET_WIDGETS_DATA,
      payload: {widgets: [{_id: 'b'}], totalCount: 9, append: true},
    });
    expect(next.widgets).toEqual([{_id: 'a'}, {_id: 'b'}]);
    expect(next.totalCount).toBe(9);
  });

  test('accepts a raw array payload', () => {
    const next = widgetsReducer(initial, {
      type: GET_WIDGETS_DATA,
      payload: [{_id: 'a'}],
    });
    expect(next.widgets).toEqual([{_id: 'a'}]);
    expect(next.totalCount).toBe(1);
  });

  test('accepts {widgets} without append so updateWidget still replaces', () => {
    const next = widgetsReducer(
      {...initial, widgets: [{_id: 'old'}], totalCount: 1},
      {type: GET_WIDGETS_DATA, payload: {widgets: [{_id: 'new'}]}},
    );
    expect(next.widgets).toEqual([{_id: 'new'}]);
  });

  test('unwraps the API nest {widgets: {widgets, tc}} so the grid can map', () => {
    const next = widgetsReducer(initial, {
      type: GET_WIDGETS_DATA,
      payload: {widgets: {widgets: [{_id: 'a'}], tc: 4}, append: false},
    });
    expect(Array.isArray(next.widgets)).toBe(true);
    expect(next.widgets).toEqual([{_id: 'a'}]);
    expect(next.totalCount).toBe(4);
  });
});
