import { findError } from "./findError";

export default function followPath(map: string) {
  const rows: string[] = map.split("\n");
  const width: number = rows[0].length;
  const height: number = rows.length;
  let verticalMove: number = 0;
  let horizontalMove: number = 0;
  let x: number = 0;
  let y: number = 0;
  let stepX: number = 0;
  let stepY: number = 0;
  let letters: string = "";
  let steps: number = 0;
  let pathData: { x: number; y: number; currentChar: string }[] = [];

  if (!rows[rows.findIndex((row) => row.includes("@"))]) {
    return { error: "Missing start character", steps };
  }

  x = rows[rows.findIndex((row) => row.includes("@"))].indexOf("@");
  y = rows.findIndex((row) => row.includes("@"));

  while (true) {
    x += stepX;
    y += stepY;
    steps++;

    const currentChar: string = rows[y][x];

    if (findError(map, rows, steps, x, y, height, currentChar, stepX, stepY)) {
      return findError(
        map,
        rows,
        steps,
        x,
        y,
        height,
        currentChar,
        stepX,
        stepY
      );
    }

    if ((x >= width && y >= height) || currentChar === "x") {
      pathData.push({ x, y, currentChar });
      return {
        letters,
        pathData: pathData
          .map((pathInstance) => pathInstance.currentChar)
          .join(""),
      };
    }

    if (currentChar === "@") {
      if (rows[y].trim() === "@") {
        verticalMove = 1;
      } else {
        horizontalMove = 1;
      }
    }

    if (currentChar === "+") {
      if (stepX !== 0) {
        verticalMove =
          rows[y - 1] !== undefined
            ? rows[y - 1][x] &&
              (rows[y - 1][x] === "|" ||
                rows[y - 1][x] === "+" ||
                rows[y - 1][x].match(/[A-Z]/))
              ? -1
              : 1
            : 1;
        horizontalMove = 0;
      }
      if (stepY !== 0) {
        horizontalMove =
          rows[y][x - 1] === "-" || rows[y][x - 1] === "+" ? -1 : 1;
        verticalMove = 0;
      }
    }

    if (currentChar.match(/[A-Z]/)) {
      if (
        pathData.find(
          (pathInstance) =>
            pathInstance.x === x &&
            pathInstance.y === y &&
            pathInstance.currentChar === currentChar
        ) === undefined
      ) {
        letters += currentChar;

        if (stepX !== 0) {
          horizontalMove =
            rows[y][x + stepX].match(/[A-Za-z]/) ||
            rows[y][x + stepX] === "-" ||
            rows[y][x + horizontalMove] === "+"
              ? 1
              : 0;
          if (stepX <= 0) {
            horizontalMove *= -1;
          }

          if (horizontalMove !== 0) {
            verticalMove = 0;
          } else {
            horizontalMove = 0;
          }
        }

        if (stepY !== 0) {
          horizontalMove =
            rows[y][x - 1] === "-" ||
            rows[y][x - 1] === "+" ||
            rows[y][x - 1].match(/[A-Za-z]/)
              ? -1
              : rows[y][x + 1] &&
                (rows[y][x + 1] === "-" ||
                  rows[y][x + 1] === "+" ||
                  rows[y][x + 1].match(/[A-Za-z]/))
              ? 1
              : 0;

          verticalMove =
            rows[y + stepY] &&
            (rows[y + stepY][x].match(/[A-Za-z]/) ||
              rows[y + stepY][x] === "|" ||
              rows[y + verticalMove][x] === "+")
              ? 1
              : 0;
          if (stepY <= 0) {
            verticalMove *= -1;
          }

          if (verticalMove !== 0) {
            horizontalMove = 0;
          } else {
            verticalMove = 0;
          }
        }
      }
    }

    stepX = horizontalMove;
    stepY = verticalMove;

    pathData.push({ x, y, currentChar });
  }
}
