import { ErrorCode } from './error-code';

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: ErrorCode | null;
  private readonly _value: T;

  private constructor(
    isSuccess: boolean,
    error: ErrorCode | null,
    value: T = undefined as T
  ) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be
        successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result
        needs to contain an error message`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public static ok<U>(value?: U): Result<U> {
     return new Result<U>(true, null, value);
  }

  public static fail<U>(error: ErrorCode): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }
    return Result.ok<any>();
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value;
  }
}
