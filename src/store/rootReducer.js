import types from '@/store/types';

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}

export default function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case types.TABLE_RESIZE:
      field = action.data.resizeType === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: value(state, action, field) };

    case types.CHANGE_TEXT:
      return {
        ...state,
        currentText:
        action.data.value,
        dataState: value(state, 'dataState', action)
      };

    case types.CHANGE_STYLES:
      return { ...state, currentStyles: action.data };

    case types.APPLY_STYLES:
      val = state.stylesState || {};
      action.data.ids.forEach(id => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        stylesState: val,
        currentStyles: { ...state.currentStyles, ...action.data.value }
      };

    case types.CHANGE_TABLE_TITLE:
      return { ...state, tableTitle: action.data };

    case types.UPDATE_DATE:
      return { ...state, lastOpenDate: new Date().toJSON() };

    default:
      return state;
  }
}
