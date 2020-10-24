import $ from '@core/DOM';

export default function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-resizable');
    const resizeType = $resizer.data.resize;
    const coords = $parent.getCoords();
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
    const sideProp = resizeType === 'col' ? 'bottom' : 'right';
    const sidePropValue = resizeType === 'col' ? window.innerHeight : window.innerWidth;
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: `${-sidePropValue}px`
    });

    document.onmousemove = e => {
      if (resizeType === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({ right: `${-delta}px` });
      } else if (resizeType === 'row') {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({ bottom: `${-delta}px` });
      }
    };

    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;

      if (resizeType === 'col') {
        $parent.css({ width: `${value}px` });
        cells.forEach(cell => {
          cell.style.width = `${value}px`;
        });
      } else if (resizeType === 'row') {
        $parent.css({ height: `${value}px` });
      }

      resolve({
        value,
        resizeType,
        id: $parent.data[resizeType]
      });

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0
      });
    };
  });
}
