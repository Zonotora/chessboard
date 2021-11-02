import {
  createSvg,
  createSvgElement,
  createPiece,
  createArrow,
} from "./svg.js";

export const FEN_START =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
export const FEN_EMPTY = "8/8/8/8/8/8/8/8";

const loadPieces = (svg) => {
  const pieces = [];
  const width = 45;
  const height = 45;

  const transform = svg.createSVGTransform();
  transform.setScale(1 / width, 1 / height);

  let start = FEN_START.replace(/\//g, "");
  for (let i = 0, index = 0; i < start.length; i++, index++) {
    const p = start[i];
    if (p === " ") break;

    if (isNaN(p)) {
      const ii = index % 8;
      const jj = Math.floor(index / 8);
      const x = ii * width;
      const y = jj * height;
      const piece = createPiece(p, { x, y }, svg);
      piece.transform.baseVal.appendItem(transform);
      pieces.push(piece);
    } else {
      index += parseInt(p) - 1;
    }
  }
  return pieces;
};

const loadTiles = (svg) => {
  const tiles = [];

  for (let i = 0; i < 64; i++) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const fill = (x + y) % 2 == 1 ? "#798f5a" : "#e7e7ce";
    const tile = createSvgElement(
      "rect",
      { x, y, width: 1, height: 1, fill },
      svg
    );
    tiles.push(tile);
  }
  return tiles;
};

export class Chessboard {
  constructor(parent, position) {
    this.parent = parent;
    this.position = position;
    this.board = createSvg({
      width: "500px",
      height: "500px",
      viewBox: "0 0 8 8",
    });
    this.parent.appendChild(this.board);
    this.tiles = loadTiles(this.board);
    this.pieces = loadPieces(this.board);
    const t = this.arrow();
  }

  arrow = (from, to) => {
    return createArrow(0, 2, 7, 4, null, this.board);
  };
}
