export function findError(
  map: string,
  rows: string[],
  steps: number,
  x: number,
  y: number,
  height: number,
  currentChar: string,
  stepX: number,
  stepY: number
) {
  let firstCharMatches: RegExpMatchArray | null = map.match(/@/g);
  let endCharMatches: RegExpMatchArray | null = map.match(/x/g);

  if (currentChar.trim() === "") {
    return { error: "Broken path", steps };
  }

  if (firstCharMatches && firstCharMatches?.length > 1) {
    return { error: "Multiple starting points", steps };
  }

  if (!endCharMatches || endCharMatches?.length < 1) {
    return { error: "Missing end character", steps };
  }

  if (x >= 0 && y >= 0 && steps === 1) {
    let surroundingChars: string[] = [];
    if (rows[y + 1] && rows[y + 1][x] && rows[y + 1][x].trim() !== "") {
      surroundingChars.push(rows[y + 1][x]);
    }

    if (rows[y - 1] && rows[y - 1][x] && rows[y - 1][x].trim() !== "") {
      surroundingChars.push(rows[y - 1][x]);
    }

    if (rows[y][x + 1] && rows[y][x + 1].trim() !== "") {
      surroundingChars.push(rows[y][x + 1]);
    }

    if (rows[y][x - 1] && rows[y][x - 1].trim() !== "") {
      surroundingChars.push(rows[y][x - 1]);
    }

    if (surroundingChars.length > 1) {
      return { error: "Multiple starting paths", steps };
    }
  }

  if (currentChar === "+") {
    if (stepX !== 0) {
      if (
        rows[y + 1] &&
        rows[y + 1][x] === "|" &&
        rows[y - 1] &&
        rows[y - 1][x] === "|"
      ) {
        return { error: "Fork in path", steps };
      }

      if (
        (rows[y + 1] &&
          rows[y + 1][x] === "|" &&
          rows[y - 1] &&
          rows[y - 1][x] === "|") ||
        (rows[y] && rows[y][x + stepX] === "-")
      ) {
        return { error: "Fake turn", steps };
      }
    }

    if (stepY !== 0) {
      if (
        (rows[y][x + 1] === "-" && rows[y][x - 1] === "-") ||
        (rows[y + stepY] && rows[y + stepY][x] === "|")
      ) {
        return { error: "Fake turn", steps };
      }
    }
  }

  if (y > height - 1 || x > rows[y].length - 1) {
    return {
      error: "currentChar is outside the valid range of the matrix",
      steps,
    };
  }

  return false;
}
