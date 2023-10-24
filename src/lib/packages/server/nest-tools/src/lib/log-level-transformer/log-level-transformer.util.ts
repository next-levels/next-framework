export const VALID_LOG_LEVELS = ['log', 'error', 'warn', 'debug', 'verbose'];

export function transformLogLevel(raw: string) {
  if (!raw) {
    return false;
  }

  const rawWithoutSpaces = raw.replace(/ /g, '');
  if (rawWithoutSpaces.length === 0) {
    return false;
  }

  const nonValidatedLevels = rawWithoutSpaces.split(',');
  if (nonValidatedLevels.length === 0) {
    return false;
  }

  const validatedLogLevels = [];
  nonValidatedLevels.forEach((nonLevel) => {
    const isValid = VALID_LOG_LEVELS.find((v) => v === nonLevel) !== undefined;

    if (!isValid) {
      console.warn(`Log-Level ${nonLevel} isn't valid. It will be not used!`);
      return;
    }

    validatedLogLevels.push(nonLevel);
  });

  if (validatedLogLevels.length === 0) {
    return false;
  }

  return validatedLogLevels;
}
