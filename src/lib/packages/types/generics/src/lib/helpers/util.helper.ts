export class UTIL {
  static removeNullProperties(obj: { [key: string]: any }) {
    const newObj = { ...obj };
    for (const prop in newObj) {
      if (newObj[prop] === null) {
        delete newObj[prop];
      }
    }
    return newObj;
  }
}
