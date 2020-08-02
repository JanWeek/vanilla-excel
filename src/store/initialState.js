import { storage } from '@core/utils';
import { defaultStyles, defaultTableTitle } from '@core/const';

const defaultState = {
  tableTitle: defaultTableTitle,
  rowState: {},
  colState: {},
  currentText: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState;

export default initialState;
