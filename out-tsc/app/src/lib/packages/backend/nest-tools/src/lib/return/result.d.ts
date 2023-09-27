import { ErrorCode } from './error-code';
export declare class Result<T> {
    isSuccess: boolean;
    isFailure: boolean;
    error: ErrorCode | null;
    private readonly _value;
    private constructor();
    static ok<U>(value?: U): Result<U>;
    static fail<U>(error: ErrorCode): Result<U>;
    static combine(results: Result<any>[]): Result<any>;
    getValue(): T;
}
