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
      type: 'CHANGE_STYLES',
      data
    };
  },

  applyStyles(data) {
    return {
      type: 'APPLY_STYLES',
      data
    };
  },

  changeTableTitle(data) {
    return {
      type: 'CHANGE_TABLE_TITLE',
      data
    };
  }
};

export default actions;
