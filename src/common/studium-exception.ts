export class StudiumException {
  public static readonly test = new StudiumException('TEST', 'something bad happened');
  public static readonly test2 = new StudiumException('TEST', 'something bad');

  public readonly code: string;
  public readonly message: string;

  private constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}
