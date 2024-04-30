export class LIST {
  static hasListFields(obj: any): boolean {
    return 'listFields' in obj;
  }

  static hasSearchFields(obj: any): boolean {
    return 'searchFields' in obj;
  }

  static hasListActions(obj: any): boolean {
    return 'listActions' in obj;
  }

  static hasListFilters(obj: any): boolean {
    return 'listFilters' in obj;
  }

  static hasListType(obj: any): boolean {
    return 'listType' in obj;
  }
}
