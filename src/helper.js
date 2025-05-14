export const getPositions = ({ xMax, zMax, n, nRow }) => {
  const fullSquare = xMax * zMax;
  const positionRadius = Math.floor(Math.sqrt(fullSquare / n) / 2);

  const distance = 2 * positionRadius || 1;
  const minZ = -7;
  const minX = -xMax + Math.random() / 0.1;

  const xN = Math.floor(xMax / distance);

  let positions = [];
  let count = 0;
  let lineMax = xMax;
  let lastX = -minX;

  while (count < 6) {
    lineMax = xMax + count * xMax * Math.random();
    lastX = count > 0 ? -lineMax : minX;

    while (lastX < lineMax) {
      positions.push({
        z: minZ - 5 * count * distance,
        x: lastX,
      });
      lastX += (Math.random() / 0.2 + distance) * (count + 1);
    }

    count += 1;
  }

  return positions;
};
