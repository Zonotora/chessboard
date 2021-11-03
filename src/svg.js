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
  const xDiff = xx2 - xx1;
  const yDiff = yy2 - yy1;
  const mag = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  const p1 = [xDiff / mag, yDiff / mag];
  const p2 = [-p1[1] * w, p1[0] * w];

  createSvgElement(
    "path",
    {
      d: `M${xx1},${yy1} L${xx2 - p1[0] * h}, ${yy2 - p1[1] * h}`,
      stroke: "#fcba038f",
      "stroke-width": "0.25",
      ...attributes,
    },
    g
  );

  createSvgElement(
    "path",
    {
      d: `M${xx2 - p1[0] * h}, ${yy2 - p1[1] * h} m${p2[0]}, ${p2[1]} l${
        -2 * p2[0]
      }, ${-2 * p2[1]} L${xx2}, ${yy2}  z`,
      fill: "#fcba038f",
      ...attributes,
    },
    g
  );

  return g;
};
