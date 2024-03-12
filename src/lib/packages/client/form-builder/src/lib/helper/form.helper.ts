export class FORM {
  static hasCreateFields(obj: any): boolean {
    return "createFields" in obj;
  }
  static hasDetailFields(obj: any): boolean {
    return "detailFields" in obj;
  }

  static hasListFilters(obj: any): boolean {
    return "listFilters" in obj;
  }
}
