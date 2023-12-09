import { parseInput } from "../../util";

class Node<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;

  constructor(public data: T) {}
}

class LinkedList<T> {
  private head: Node<T> | null = null;

  public add(data: T): Node<T> {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
    } else {
      const last = this.last();

      node.prev = last;
      last!.next = node;
    }

    return node;
  }

  public first(): Node<T> | null {
    return this.head;
  }

  public last(): Node<T> | null {
    if (!this.head) {
      return null;
    }

    const recurse = (node: Node<T>): Node<T> => {
      return node.next ? recurse(node.next) : node;
    };

    return recurse(this.head);
  }

  public all(): T[] {
    if (!this.head) {
      return [];
    }

    const list: T[] = [];
    const recurse = (node: Node<T>): T[] => {
      list.push(node.data);
      return node.next ? recurse(node.next) : list;
    };

    return recurse(this.head);
  }
}

class History {
  values: number[];
  differences: number[];

  constructor(values: number[]) {
    this.values = values;

    this.differences = [];

    for (let i = 0; i < values.length - 1; i++) {
      this.differences.push(values[i + 1] - values[i]);
    }
  }

  isZero(): boolean {
    return this.differences.every((number) => number === 0);
  }

  getChild(): History | null {
    if (this.isZero()) {
      return null;
    }

    return new History(this.differences);
  }

  addValue(difference: number): number {
    const next = this.values[this.values.length - 1] + difference;
    this.differences.push(difference);
    this.values.push(next);

    return next;
  }
}

function calculateNextValueInSequence(history: History): number {
  let list = new LinkedList<History>();

  let item: History | null = history;
  do {
    list.add(item);
  } while ((item = item.getChild()));

  let node: Node<History> | null = list.last()!;
  do {
    if (node.data.isZero()) {
      node.data.addValue(0);

      continue;
    }

    node.data.addValue(
      node.next!.data.values[node.next!.data.values.length - 1]
    );

    if (node.prev === null) {
      return node.data.values[node.data.values.length - 1];
    }
  } while ((node = node.prev));

  throw "Failed to solve";
}

const input = parseInput<History>({
  split: {
    mapper: (line) => {
      const values = line.split(" ").map(Number);

      return new History(values);
    },
  },
});

function main() {
  return input
    .map((history) => calculateNextValueInSequence(history))
    .reduce((value, sum) => value + sum);
}

export default main();
