export const escape = (value) => String(value).replace(/[&<>"']/g, (char) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

const shape = (node) => {
  const { x, y, width, height, type } = node;
  const left = x - width / 2;
  const top = y - height / 2;
  if (type === 'decision') {
    return `<path class="node-shape" d="M${x} ${top} L${x + width / 2} ${y} L${x} ${y + height / 2} L${left} ${y} Z"/>`;
  }
  const rect = (inset, radius) => `<rect class="node-shape" x="${left + inset}" y="${top + inset}" width="${width - inset * 2}" height="${height - inset * 2}" rx="${radius}"/>`;
  return rect(0, 8) + (type === 'human' ? rect(4, 5) : '');
};

function wrap(label, limit) {
  const lines = [];
  for (const word of label.split(' ')) {
    const last = lines.at(-1);
    if (last && last.length + word.length + 1 <= limit) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else {
      lines.push(word);
    }
  }
  return lines;
}

function renderNode(node, limit) {
  const lines = wrap(node.label, limit);
  const lineHeight = node.mobile ? 15 : 16;
  const textTop = node.y - (lines.length - 1) * lineHeight / 2;
  const text = lines.map((line, index) =>
    `<tspan x="${node.x}" y="${textTop + index * lineHeight}">${escape(line)}</tspan>`).join('');
  return `<g class="node ${node.type}${node.width < 100 ? ' small' : ''}">${shape(node)}<text dominant-baseline="central" text-anchor="middle">${text}</text></g>`;
}

function renderEdge(from, to, label, kind, marker, mobile, delay = 0) {
  const direction = Math.sign(to.x - from.x);
  const startBottom = from.y + from.height / 2;
  const endTop = to.y - to.height / 2;
  let path;
  let labelX;
  let labelY;
  if (kind === 'loop-left' || kind === 'loop-side') {
    const side = kind === 'loop-side' ? from.x : mobile ? 20 : 190;
    const startX = kind === 'loop-side' ? from.x : from.x - from.width / 2;
    const startY = kind === 'loop-side' ? from.y - from.height / 2 : from.y;
    path = `M${startX} ${startY} H${side} V${to.y} H${to.x - to.width / 2}`;
    labelX = side + 7;
    labelY = (from.y + to.y) / 2;
  } else if (kind === 'branch-out' || kind === 'branch-in') {
    const middleY = (startBottom + endTop) / 2;
    path = `M${from.x} ${startBottom} V${middleY} H${to.x} V${endTop}`;
  } else if (from.y === to.y) {
    const startX = from.x + direction * from.width / 2;
    const endX = to.x - direction * to.width / 2;
    path = `M${startX} ${from.y} H${endX}`;
    labelX = (startX + endX) / 2;
    labelY = from.y - (mobile ? 9 : 10);
  } else {
    path = `M${from.x} ${startBottom} V${endTop}`;
    labelX = from.x + 17;
    labelY = (startBottom + endTop) / 2 + 4;
  }
  const line = `<path class="edge ${kind === 'support' ? 'support' : 'primary'}" style="--edge-delay:${delay}ms" d="${path}" marker-end="url(#${marker})"/>`;
  return line + (label ? `<text class="edge-label" x="${labelX}" y="${labelY}" text-anchor="middle">${escape(label)}</text>` : '');
}

function marker(id) {
  return `<defs><marker id="${id}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 7 4 1 7" fill="none" stroke="context-stroke" stroke-width="1.1"/></marker></defs>`;
}

function figureSvg(id, diagram, mobile) {
  const columns = mobile ? [43, 160, 277] : [110, 360, 610];
  const canvasWidth = mobile ? 320 : 720;
  const rowHeight = mobile ? 76 : 65;
  const top = diagram.boundary ? 69 : 39;
  const nodes = Object.fromEntries(Object.entries(diagram.nodes).map(([key, [column, row, label, type = 'activity']]) =>
    [key, { x: columns[column], y: top + row * rowHeight, label, type, mobile,
      width: mobile ? (column === 1 ? 122 : 78) : (column === 1 ? 205 : 160), height: type === 'decision' ? 54 : 48 }]));
  const height = Math.max(...Object.values(nodes).map((node) => node.y)) + 42;
  const markerId = `${id}-${mobile ? 'narrow' : 'wide'}-arrow`;
  const boundaryLeft = mobile ? 5 : 23;
  const boundaryRight = mobile ? 225 : 485;
  const hasSource = Object.values(diagram.nodes).some(([column, row, , type]) => column === 0 && row === 0 && type === 'external');
  const sourceBay = hasSource ? `V${top + 31} H${mobile ? 84 : 197} V${top - 31} H${boundaryLeft}` : '';
  const boundary = diagram.boundary
    ? `<path class="boundary" d="M${boundaryLeft + 8} 30 H${boundaryRight - 8} Q${boundaryRight} 30 ${boundaryRight} 38 V${height - 15} Q${boundaryRight} ${height - 7} ${boundaryRight - 8} ${height - 7} H${boundaryLeft + 8} Q${boundaryLeft} ${height - 7} ${boundaryLeft} ${height - 15} ${sourceBay} V38 Q${boundaryLeft} 30 ${boundaryLeft + 8} 30 Z"/><text class="boundary-label" x="${mobile ? 89 : 205}" y="22">${escape(diagram.boundary)}</text>`
    : '';
  // The top-left bay keeps the external source outside the implementation boundary.
  // Other left-hand externals in boundary diagrams are intentionally placed in the right lane.
  const edges = diagram.edges.map(([from, to, label, kind]) =>
    renderEdge(nodes[from], nodes[to], label, kind, markerId, mobile, Math.min(320, (nodes[from].y - top) * .5))).join('');
  const shapes = Object.values(nodes).map((node) => renderNode(node, mobile ? (node.width < 100 ? 11 : 17) : (node.width < 170 ? 20 : 25))).join('');
  return `<svg class="detail-svg ${mobile ? 'narrow' : 'wide'}" viewBox="0 0 ${canvasWidth} ${height}" aria-hidden="true">${marker(markerId)}${boundary}${edges}${shapes}</svg>`;
}

export function detailFigure(id, diagram) {
  return `<figure class="diagram" data-diagram>
    <figcaption><span class="eyebrow">${escape(diagram.scope)}</span><span class="diagram-title">${escape(diagram.title)}</span></figcaption>
    <div class="diagram-art">${figureSvg(id, diagram, false)}${figureSvg(id, diagram, true)}</div>
    <p class="diagram-description">${escape(diagram.description)}</p>
    <details class="diagram-text">
      <summary>Read the workflow as text</summary>
      <ol>${diagram.steps.map((step) => `<li>${escape(step)}</li>`).join('')}</ol>
    </details>
  </figure>`;
}

export function overview(id, diagram, ids) {
  const step = 88;
  const width = ids.length * step;
  const markerId = `${id}-overview-arrow`;
  const nodes = ids.map((key, index) => {
    const [, , label, type = 'activity', short] = diagram.nodes[key];
    return { x: step * index + step / 2, y: 34, width: 70, height: 48, label: short || label, type, mobile: true };
  });
  return `<svg class="overview-svg" viewBox="0 0 ${width} 69" role="img" aria-label="${escape(nodes.map((node) => node.label).join(' → '))}">${marker(markerId)}${nodes.slice(1).map((node, index) => renderEdge(nodes[index], node, '', 'primary', markerId, true)).join('')}${nodes.map((node) => renderNode(node, 11)).join('')}</svg>`;
}
