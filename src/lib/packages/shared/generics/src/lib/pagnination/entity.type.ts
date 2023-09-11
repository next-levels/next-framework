/**
 * standardized tag filter used for filtering. Though it that it can be dynamically interrated on the existing values
 * and the is undefined conditions are anymore necessary on each attribute in filtering in the backend.
 * Goal is to increase consistency. If specific implementation is neeeded it can be as well implemented and given
 * to the EntityFilter
 */
export abstract class EntityTagFilter {
  /**
   * 1: attribute name
   * 2: key to filter value
   * 3: condtion eg.: <, >, =, ...
   */
  attributes: FilterClause[];
}

export class KeyValuePair<K, V> {
  public key: K;
  public value: V;
}

export class FilterClause {
  public attribute: string;
  public query: string;
  public condition: '<' | '=' | '>' | 'LIKE';
}
