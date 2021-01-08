/***************************************************************
 * Traveling Knight Logic Notes
 *************************************************************** 
  Starting with the initial x,y coordinates, we check to see if we can make 1 of 4 moves:
  - move up 1 space,
  - move down 1 space,
  - move up 2 spaces, or
  - move down 2 spaces
  
  Once we figure out whether we can move up or down by X number of spaces, we use our checkMoves util function to 
  figure out if we can move left or right by either 1 or 2 spaces.
  
  If we construct a proposed path that is in bounds AND the targetDestination is not a starting point
  we've already visited in the past, then we have a legitimate route we can add to our Map collection.
  
  Once we returned the proposed route and make sure we indeed haven't seen it yet, we 
  
  - store it in our allMovements Map, 
  - slice off the last coordinates from our path, and 
  - add the sliced coords to our startingPoints[] array. 
  
  That way, we can continue finding paths from the last position the Knight was moved to on the board. 
  
  Please note that there's no logic behind deciding where a Knight should go first. The order is currently hardcoded for the Knight to:
  
  - First try to move up one space,
  - Try to move down one space,
  - Try moving up two spaces, and finally,
  - Try moving down two spaces. 


  I also added a check on n board size. If n is ever smaller than 3, throw an error because
  we don't have a big enough board to make L shaped moves for our Knight.

  */

/***************************************************************
 * Util Functions
 ***************************************************************/

function checkBoardArgs(x, y, n) {
  if (typeof x !== "number" || typeof y !== "number" || typeof n !== "number") {
    throw new Error("You're missing a board coordinate.");
  }

  if (n < 3) {
    throw new Error("Please specify a bigger size for your board.");
  }
}

function isInBounds(x, y, n) {
  const xIsInBounds = x >= 0 && x <= n - 1;
  const yIsInBounds = y >= 0 && y <= n - 1;

  return xIsInBounds && yIsInBounds;
}

function getStartEndCoords(movementString, targetDir = "start") {
  const slicer = targetDir === "start" ? 2 : -2;
  return movementString
    .split(", ")
    .slice(slicer)
    .map((num) => parseInt(num, 10));
}

function tabularizeData(dataMap) {
  console.table(
    Array.from(dataMap.entries()).map(([key, path]) => ({
      start: key,
      path,
    }))
  );
}

function checkMoves(verticalCount, verticalDirection, gridArgs, allMovements) {
  const [xCoord, yCoord, n] = gridArgs;
  const startingPoint = `${xCoord}, ${yCoord}`;

  if (verticalCount === 1) {
    if (verticalDirection === "up") {
      const updatedXCoord = xCoord - 1;
      // Can we go left 2 times?
      if (
        isInBounds(updatedXCoord, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord - 1, n) &&
        isInBounds(updatedXCoord, yCoord - 2, n)
      ) {
        const finalDestination = `${updatedXCoord}, ${yCoord - 2}`;

        if (!allMovements.has(finalDestination)) {
          return `${startingPoint}, ${updatedXCoord}, ${yCoord}, ${updatedXCoord}, ${
            yCoord - 1
          }, ${updatedXCoord}, ${yCoord - 2}`;
        }
      }

      // Can we go right 2 times?
      if (
        isInBounds(updatedXCoord, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord + 1, n) &&
        isInBounds(updatedXCoord, yCoord + 2, n)
      ) {
        const finalDestination = `${updatedXCoord}, ${yCoord + 2}`;

        if (!allMovements.has(finalDestination)) {
          return `${startingPoint}, ${updatedXCoord}, ${yCoord}, ${updatedXCoord}, ${
            yCoord + 1
          }, ${updatedXCoord}, ${yCoord + 2}`;
        }
      }
    } else {
      const updatedXCoord = xCoord + 1;

      // Can we go left 2 times?
      if (
        isInBounds(updatedXCoord, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord - 1, n) &&
        isInBounds(updatedXCoord, yCoord - 2, n)
      ) {
        const finalDestination = `${updatedXCoord}, ${yCoord - 2}`;
        if (!allMovements.has(finalDestination)) {
          return `${startingPoint}, ${updatedXCoord}, ${yCoord}, ${updatedXCoord}, ${
            yCoord - 1
          }, ${updatedXCoord}, ${yCoord - 2}`;
        }
      }

      // Can we go right 2 times?
      if (
        isInBounds(updatedXCoord, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord + 1, n) &&
        isInBounds(updatedXCoord, yCoord + 2, n)
      ) {
        const finalDestination = `${updatedXCoord}, ${yCoord + 2}`;
        if (!allMovements.has(finalDestination)) {
          return `${startingPoint}, ${updatedXCoord}, ${yCoord}, ${updatedXCoord}, ${
            yCoord + 1
          }, ${updatedXCoord}, ${yCoord + 2}`;
        }
      }
    }
  }

  if (verticalCount === 2) {
    if (verticalDirection === "up") {
      const updatedXCoord = xCoord - 2;
      // Can we go left 1 time?
      if (
        isInBounds(xCoord - 1, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord - 1, n)
      ) {
        const finalDestination = `${updatedXCoord}, ${yCoord - 1}`;

        if (!allMovements.has(finalDestination)) {
          return `${startingPoint}, ${
            xCoord - 1
          }, ${yCoord}, ${updatedXCoord}, ${yCoord}, ${updatedXCoord}, ${
            yCoord - 1
          }`;
        }
      }

      // Can we go right 1 time?
      if (
        isInBounds(xCoord - 1, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord + 1, n)
      ) {
        const finalDestination = `${updatedXCoord}, ${yCoord + 1}`;

        if (!allMovements.has(finalDestination)) {
          return `${startingPoint}, ${
            xCoord - 1
          }, ${yCoord}, ${updatedXCoord}, ${yCoord}, ${updatedXCoord}, ${
            yCoord + 1
          }`;
        }
      }
    } else {
      const updatedXCoord = xCoord + 2;
      // Can we go left 1 time?
      if (
        isInBounds(xCoord + 1, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord - 1, n)
      ) {
        const finalDestination = `${updatedXCoord}, ${yCoord - 1}`;

        if (!allMovements.has(finalDestination)) {
          return `${startingPoint}, ${
            xCoord + 1
          }, ${yCoord}, ${updatedXCoord}, ${yCoord}, ${updatedXCoord}, ${
            yCoord - 1
          }`;
        }
      }

      // Can we go right 1 time?
      if (
        isInBounds(xCoord + 1, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord, n) &&
        isInBounds(updatedXCoord, yCoord + 1, n)
      ) {
        const finalDestination = `${updatedXCoord}, ${yCoord + 1}`;

        if (!allMovements.has(finalDestination)) {
          return `${startingPoint}, ${
            xCoord + 1
          }, ${yCoord}, ${updatedXCoord}, ${yCoord}, ${updatedXCoord}, ${
            yCoord + 1
          }`;
        }
      }
    }
  }

  // Otherwise, return nothing
  return null;
}

/******************************
 * Main Function
 ******************************/
function travelingKnight(x, y, n) {
  try {
    checkBoardArgs(x, y, n);

    if (!isInBounds(x, y, n)) {
      return [];
    }

    const allMovements = new Map();
    const startingPoints = [[x, y]];

    while (startingPoints.length) {
      // From the current position
      const [xCoord, yCoord] = startingPoints.pop();

      const currentStart = `${xCoord}, ${yCoord}`;

      const gridArgs = [xCoord, yCoord, n];

      // If we haven't seen this starting point
      if (!allMovements.has(currentStart)) {

        // Can we move one space up?
        if (isInBounds(xCoord - 1, yCoord, n)) {
          const result = checkMoves(1, "up", gridArgs, allMovements);

          if (result !== null && !allMovements.has(result)) {
            allMovements.set(currentStart, result);
            const lastStartingPoint = getStartEndCoords(result, "end");
            startingPoints.push(lastStartingPoint);
            continue;
          }
        }

        // Can we move one space down?
        if (isInBounds(xCoord + 1, yCoord, n)) {
          const result = checkMoves(1, "down", gridArgs, allMovements);

          if (result !== null && !allMovements.has(result)) {
            allMovements.set(currentStart, result);
            const lastStartingPoint = getStartEndCoords(result, "end");
            startingPoints.push(lastStartingPoint);
            continue;
          }
        }

        // Can we move two spaces up?
        if (isInBounds(xCoord - 2, yCoord, n)) {
          const result = checkMoves(2, "up", gridArgs, allMovements);

          if (result !== null && !allMovements.has(result)) {
            allMovements.set(currentStart, result);
            const lastStartingPoint = getStartEndCoords(result, "end");
            startingPoints.push(lastStartingPoint);
            continue;
          }
        }

        // Can we move two spaces down?
        if (isInBounds(xCoord + 2, yCoord, n)) {
          const result = checkMoves(2, "down", gridArgs, allMovements);

          if (result !== null && !allMovements.has(result)) {
            allMovements.set(currentStart, result);
            const lastStartingPoint = getStartEndCoords(result, "end");
            startingPoints.push(lastStartingPoint);
            continue;
          }
        }
      }
    }

    tabularizeData(allMovements);
  } catch (error) {
    console.error(error);
  }
}
