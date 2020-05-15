const CODES = {
  A: 65,
  Z: 90
};

function createCell(_, index) {
  return `
    <div class="cell" contenteditable data-col="${index}"></div>
  `;
}

function createCol(content, index) {
  return `
    <div class="column" data-resizable data-col="${index}">
      ${content}
      <div class="col-resize" data-resize="column"></div>
    </div>
  `;
}

function createRow(index, content) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-resizable>
      <div class="row-info">
        ${index || ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export default function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('');

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
