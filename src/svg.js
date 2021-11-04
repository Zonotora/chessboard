const PIECES_PATH = "../assets/pieces.svg";

export const setAttributes = (elem, attributes) => {
  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      elem.setAttributeNS(null, key, attributes[key]);
    }
  }
};

export const createSvgElement = (elem, attributes = {}, parent = undefined) => {
  const domElem = document.createElementNS("http://www.w3.org/2000/svg", elem);
  setAttributes(domElem, attributes);

  if (parent) {
    parent.appendChild(domElem);
  }

  return domElem;
};

export const createSvg = (attributes = {}) => {
  return createSvgElement("svg", attributes);
};

export const createPiece = (name, attributes = {}, parent = undefined) => {
  return createSvgElement(
    "use",
    { ...attributes, href: `${PIECES_PATH}#${name}`, class: "piece" },
    parent
  );
};

export const createArrow = (
  x1,
  y1,
  x2,
  y2,
  attributes = {},
  parent = undefined
) => {
  const g = createSvgElement("g", null, parent);

  const xx1 = x1 + 0.5;
  const yy1 = y1 + 0.5;
  const xx2 = x2 + 0.5;
  const yy2 = y2 + 0.5;

  const h = 0.5;
  const w = 0.3;
  const endOffset = 0.1;
  let p2, p3;

  const points = (x1, y1, x2, y2) => {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const mag = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    const p1 = [xDiff / mag, yDiff / mag];
    const p2 = [-p1[1] * w, p1[0] * w];
    const p3 = [x2 - p1[0] * (h + endOffset), y2 - p1[1] * (h + endOffset)];
    return [p2, p3];
  };

  if (
    (Math.abs(xx2 - xx1) === 2 && Math.abs(yy2 - yy1) === 1) ||
    (Math.abs(xx2 - xx1) === 1 && Math.abs(yy2 - yy1) === 2)
  ) {
    const middle = Math.abs(xx2 - xx1) === 2 ? [xx2, yy1] : [xx1, yy2];
    [p2, p3] = points(middle[0], middle[1], xx2, yy2);

    createSvgElement(
      "path",
      {
        stroke: "#fcba038f",
        ...attributes,
        d: `M${xx1},${yy1} L${middle[0]}, ${middle[1]} L${p3[0]}, ${p3[1]}`,
        "stroke-width": "0.25",
        fill: "none",
      },
      g
    );
  } else {
    [p2, p3] = points(xx1, yy1, xx2, yy2);
    createSvgElement(
      "path",
      {
        stroke: "#fcba038f",
        ...attributes,
        d: `M${xx1},${yy1} L${p3[0]}, ${p3[1]}`,
        "stroke-width": "0.25",
        fill: "none",
      },
      g
    );
  }

  createSvgElement(
    "path",
    {
      fill: "#fcba038f",
      ...attributes,
      d: `M${p3[0]}, ${p3[1]} m${p2[0]}, ${p2[1]} l${-2 * p2[0]}, ${
        -2 * p2[1]
      } L${xx2}, ${yy2}  z`,
      stroke: "none",
    },
    g
  );

  return g;
};
