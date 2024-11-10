import { parseInput } from '../../util';

const cells = parseInput<string[]>({
  split: {
    delimiter: '\n',
    mapper: (line) => {
      return line.split('');
    },
  },
});

type Direction = 'n' | 's' | 'e' | 'w';
type PendingMovement = {
  from: Cell;
  entry: Direction;
};

type Cell = {
  key: string;
  char: string;

  n?: Cell;
  s?: Cell;
  e?: Cell;
  w?: Cell;
};

function getDirectionAfterReflection(
  direction: Direction,
  mirror: '\\' | '/',
): Direction {
  if (mirror === '/') {
    switch (direction) {
      case 'n':
        return 'e';
      case 's':
        return 'w';
      case 'e':
        return 'n';
      case 'w':
        return 's';
    }
  } else {
    switch (direction) {
      case 'n':
        return 'w';
      case 's':
        return 'e';
      case 'e':
        return 's';
      case 'w':
        return 'n';
    }
  }
}

const performPendingMovement = (
  movement: PendingMovement,
): PendingMovement[] => {
  const isFreeSpace =
    movement.from.char === '.' && movement.from[movement.entry];

  const isIgnoringSplitter =
    (movement.from.char === '|' && ['n', 's'].includes(movement.entry)) ||
    (movement.from.char === '-' && ['e', 'w'].includes(movement.entry));

  if ((isFreeSpace || isIgnoringSplitter) && movement.from[movement.entry]) {
    return [
      {
        from: movement.from[movement.entry]!,
        entry: movement.entry,
      },
    ];
  }

  if (movement.from.char === '/' || movement.from.char === '\\') {
    const newDirection = getDirectionAfterReflection(
      movement.entry,
      movement.from.char,
    );

    if (movement.from[newDirection]) {
      return [
        {
          from: movement.from[newDirection],
          entry: newDirection,
        },
      ];
    }
  }

  const movements: PendingMovement[] = [];
  if (movement.from.char === '|' && ['e', 'w'].includes(movement.entry)) {
    if (movement.from.n) {
      movements.push({
        from: movement.from.n,
        entry: 'n',
      });
    }

    if (movement.from.s) {
      movements.push({
        from: movement.from.s,
        entry: 's',
      });
    }

    return movements;
  }

  if (movement.from.char === '-' && ['n', 's'].includes(movement.entry)) {
    if (movement.from.e) {
      movements.push({
        from: movement.from.e,
        entry: 'e',
      });
    }

    if (movement.from.w) {
      movements.push({
        from: movement.from.w,
        entry: 'w',
      });
    }

    return movements;
  }

  return [];
};

const main = () => {
  const layout = cells.map((row, rowIndex) => {
    return row.map((cell, columnIndex): Cell => {
      return {
        key: `${rowIndex}x${columnIndex}`,
        char: cell,
      };
    });
  });

  const width = layout[0].length;
  const height = layout.length;

  for (const [rowIndex, row] of layout.entries()) {
    for (const [colIndex, col] of row.entries()) {
      if (colIndex > 0) {
        row[colIndex].w = row[colIndex - 1];
      }

      if (colIndex < width - 1) {
        row[colIndex].e = row[colIndex + 1];
      }

      if (rowIndex > 0) {
        row[colIndex].n = layout[rowIndex - 1][colIndex];
      }

      if (rowIndex < height - 1) {
        row[colIndex].s = layout[rowIndex + 1][colIndex];
      }
    }
  }

  const startCell = layout[0][0];

  const movementStack: PendingMovement[] = [
    {
      from: startCell,
      entry: 'e',
    },
  ];

  const alreadyVisited = new Set<string>();
  const energisedTiles = new Set<string>();

  let i = 0;
  while (movementStack.length) {
    i++;

    const movement = movementStack.shift()!;

    energisedTiles.add(movement.from.key);

    const movements = performPendingMovement(movement).filter((movement) => {
      return !alreadyVisited.has(`${movement.from.key}_${movement.entry}`);
    });

    for (const movement of movements) {
      alreadyVisited.add(`${movement.from.key}_${movement.entry}`);
    }

    movementStack.push(...movements);
  }

  return energisedTiles.size;
};

export default main();
