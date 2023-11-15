import { SelectedOption } from '../models/selected-option';

const operatorMapping = {
  '=': '$eq',
  '!=': '$not',
  '>': '$gt',
  '<': '$lt',
  beinhaltet: '$ilike',
};

const expressionMapping = {
  AND: '',
  OR: '$or',
};

export function mapSelectedOptions(selectedOptions: SelectedOption[]) {
  const result = [];
  for (let i = 0; i < selectedOptions.length; i++) {
    const currentOption = selectedOptions[i];

    if (currentOption.PopulatedFrom === 'Field') {
      const key = currentOption.Value;

      if (
        i + 1 < selectedOptions.length &&
        selectedOptions[i + 1].PopulatedFrom === 'Operator'
      ) {
        const expression =
          selectedOptions[i - 1] &&
          selectedOptions[i - 1].PopulatedFrom === 'Expression'
            ? // @ts-ignore
              expressionMapping[selectedOptions[i - 1].Value] || ''
            : '';
        const operation =
          // @ts-ignore
          operatorMapping[selectedOptions[i + 1].Value] ||
          selectedOptions[i + 1].Value;
        if (
          i + 2 < selectedOptions.length &&
          selectedOptions[i + 2].PopulatedFrom === 'Value'
        ) {
          const value = selectedOptions[i + 2].Value;

          result.push({
            key: key,
            operation: operation,
            value: value,
            expression: expression,
          });
          i += 2; // Skip the next two options since we've already processed them
        }
      }
    }
  }

  return result;
}
