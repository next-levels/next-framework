export class ErrorCode {
  constructor(
    public message: string,
    public httpCode: number,
    public changeHttpCode = true
  ) {}
}
