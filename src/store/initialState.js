import { defaultStyles, defaultTableTitle } from '@core/utils/const';
import { cloneObject } from '@core/utils/functions';

const defaultState = {
  tableTitle: defaultTableTitle,
  rowState: {},
  colState: {},
  currentText: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  lastOpenDate: new Date().toJSON()
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

const normalizeState = state => state ? normalize(state) : cloneObject(defaultState);

export default normalizeState;
