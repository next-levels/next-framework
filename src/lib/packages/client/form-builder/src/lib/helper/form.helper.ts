export class FORM {
  static hasCreateFields(obj: any): boolean {
    return 'createFields' in obj;
  }

  static hasDetailFields(obj: any): boolean {
    return 'detailFields' in obj;
  }

  static hasListFilters(obj: any): boolean {
    return 'listFilters' in obj;
  }

  static hasListActions(obj: any): boolean {
    return 'listActions' in obj;
  }

  static hasDetailActions(obj: any): boolean {
    return 'detailActions' in obj;
  }

  static hasHeadFields(obj: any): boolean {
    return 'headFields' in obj;
  }

  static hasDropdowns(obj: any): boolean {
    return 'dropdowns' in obj;
  }
}
