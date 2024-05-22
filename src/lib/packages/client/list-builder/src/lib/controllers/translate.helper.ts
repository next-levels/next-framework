export class TranslateHelper {
  private translateService: any;
  private model: string;

  constructor(translateService, model) {
    this.translateService = translateService;
    this.model = model;
  }

  // Method to translate a single string
  translateString(string: string): string {
    return this.translateService.instant(string);
  }

  // Method to translate a list of strings
  translateProperty(string): string {
    return this.translateString(this.model + '.properties.' + string);
  }

  translateFilter(string): string {
    return this.translateString(this.model + '.filters.' + string);
  }

  // Method to translate an object's values
  translateObject(object: { [key: string]: string }): {
    [key: string]: string;
  } {
    return Object.keys(object).reduce((acc, key) => {
      acc[key] = this.translateString(object[key]);
      return acc;
    }, {});
  }

  // Method to translate a list of objects
  translateListObject(
    objects: { [key: string]: string }[]
  ): { [key: string]: string }[] {
    return objects.map((object) => this.translateObject(object));
  }

  // Method to translate a list of lists of objects
  translateListListObject(
    listOfObjects: { [key: string]: string }[][]
  ): { [key: string]: string }[][] {
    return listOfObjects.map((objects) => this.translateListObject(objects));
  }
}

// Example usage
const translateService = {
  instant: (str: string) => `translated(${str})`,
};
