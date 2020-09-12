import parse from '@core/utils/parse';
import { toInlineStyles } from '@core/utils/functions';
import { defaultStyles } from '@core/utils/const';

const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return `${state && state[index] ? state[index] : DEFAULT_WIDTH}px`;
}

function getHeight(state, index) {
  return `${state && state[index] ? state[index] : DEFAULT_HEIGHT}px`;
}

function withWidthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index)
    };
  };
}

function createChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createCell(row, state) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id] || '';
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    });
    return `
      <div
        class="cell"
        contenteditable
        data-col="${col}" 
        data-id="${id}"
        data-type="cell"
        data-value="${data}"
        style="width: ${width}; ${styles}"
      >
        ${parse(data)}
      </div>
    `;
  };
}

function createCol({ col, index, width }) {
  return `
    <div class="col" data-resizable data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, rowState) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  const height = getHeight(rowState, index);
  return `
    <div class="row" data-resizable data-row="${index}" style="height: ${height}">
      <div class="row-info">
        ${index || ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

export default function createTable(rowsCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(createChar)
    .map(withWidthFrom(state))
    .map(createCol)
    .join('');

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(row, state))
      .join('');
    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}
