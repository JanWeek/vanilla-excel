import types from '@/store/types';

const actions = {
  tableResize(data) {
    return {
      type: types.TABLE_RESIZE,
      data
    };
  },

  changeText(data) {
    return {
      type: types.CHANGE_TEXT,
      data
    };
  },

  changeStyles(data) {
    return {
      type: types.CHANGE_STYLES,
      data
    };
  },

  applyStyles(data) {
    return {
      type: types.APPLY_STYLES,
      data
    };
  },

  changeTableTitle(data) {
    return {
      type: types.CHANGE_TABLE_TITLE,
      data
    };
  },

  updateDate() {
    return {
      type: types.UPDATE_DATE
    };
  }
};

export default actions;
