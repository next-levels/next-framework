export function findNearestEntity(
  url: string,
  translatableEntities: Function[]
): Function | null {
  const parts = url.split('/');

  if (parts.length < 3) {
    return null;
  }

  const entityName = parts[2];
  const lowerEntityName = entityName.toLowerCase();
  let bestMatch: Function | null = null;
  let bestMatchScore = Infinity;

  translatableEntities.forEach((EntityClass) => {
    const className = EntityClass.name.toLowerCase().replace('entity', '');
    const score = levenshteinDistance(lowerEntityName, className);

    if (score < bestMatchScore) {
      bestMatchScore = score;
      bestMatch = EntityClass;
    }
  });

  return bestMatch;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 1; i <= a.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 1; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }

  return matrix[a.length][b.length];
}
