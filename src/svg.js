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
  const svg = createSvgElement("svg", attributes);

  // create refs
  // arrow head
  const marker = createSvgElement(
    "marker",
    {
      id: "arrow",
      viewBox: "0 0 30 30",
      refX: "5",
      refY: "5",
      markerWidth: "6",
      markerHeight: "6",
      orient: "auto-start-reverse",
    },
    svg
  );
  createSvgElement(
    "path",
    { d: "M 0 0 L 10 5 L 0 10 z", fill: "#fcba03" },
    marker
  );

  return svg;
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
  return createSvgElement(
    "line",
    {
      x1: x1 + 0.5,
      y1: y1 + 0.5,
      x2: x2 + 0.5,
      y2: y2 + 0.5,
      stroke: "#fcba038f",
      "stroke-width": "0.25",
      "marker-end": "url(#arrow)",
      ...attributes,
    },
    parent
  );
};
