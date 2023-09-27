/**
 * standardized tag filter used for filtering. Though it that it can be dynamically interrated on the existing values
 * and the is undefined conditions are anymore necessary on each attribute in filtering in the backend.
 * Goal is to increase consistency. If specific implementation is neeeded it can be as well implemented and given
 * to the EntityFilter
 */
export declare abstract class EntityTagFilter {
    /**
     * 1: attribute name
     * 2: key to filter value
     * 3: condtion eg.: <, >, =, ...
     */
    attributes: FilterClause[];
}
export declare class KeyValuePair<K, V> {
    key: K;
    value: V;
}
export declare class FilterClause {
    attribute: string;
    query: string;
    condition: '<' | '=' | '>' | 'LIKE';
}
