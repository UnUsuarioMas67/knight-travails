function getPossibleMoves(coords) {
  if (!isValidMove(coords)) {
    throw new Error('coords must be an array of two numbers with values between 0 and 7');
  }

  const [x, y] = coords;

  const moves = [
    [x + 1, y + 2],
    [x + 2, y + 1],
    [x - 1, y + 2],
    [x - 2, y + 1],
    [x - 1, y - 2],
    [x - 2, y - 1],
    [x + 1, y - 2],
    [x + 2, y - 1],
  ];

  // filter out invalid positions
  const validMoves = moves.filter((n) => {
    return isValidMove(n);
  });

  return validMoves;
}

function isValidMove(coords) {
  const lengthOfTwo = coords.length === 2;
  const [x, y] = coords;
  const betweenZeroAndSeven = x >= 0 && x <= 7 && y >= 0 && y <= 7;

  return lengthOfTwo && betweenZeroAndSeven;
}

function knightMoves(start, target) {
  if (!isValidMove(start) || !isValidMove(target)) {
    return [];
  }

  const printPath = function (path, cost) {
    let pathString = '';

    // Print the path
    console.log(`knightMoves([${start}], [${target}])`);
    console.log(`Target found in ${cost} moves!`);
    console.log(`Here is the path:`);
    for (let i = 0; i < path.length; i++) {
      pathString += i < path.length - 1 ? `[${path[i]}]` + ' -> ' : `[${path[i]}]`;
    }

    console.log(pathString);
  };

  const queue = [{ pos: start, path: [start], cost: 0 }];
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length !== 0) {
    const { pos, path, cost } = queue.shift();

    if (pos.toString() === target.toString()) {
      printPath(path, cost);
      return path;
    }

    for (let neighbor of getPossibleMoves(pos)) {
      if (visited.has(neighbor.toString())) {
        continue;
      }

      queue.push({ pos: neighbor, path: [...path, neighbor], cost: cost + 1 });
      visited.add(neighbor.toString());
    }
  }

  return [];
}

export { knightMoves };
