export function getNeighbors(row: number, column: number, rows: number, columns: number) {
  const neighbors: Array<[number, number]> = []
  for (let y = Math.max(0, row - 1); y <= Math.min(rows - 1, row + 1); y += 1) {
    for (let x = Math.max(0, column - 1); x <= Math.min(columns - 1, column + 1); x += 1) {
      if (y !== row || x !== column) neighbors.push([y, x])
    }
  }
  return neighbors
}
