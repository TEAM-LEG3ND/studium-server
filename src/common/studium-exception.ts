export class StudiumException {
  public static readonly test = new StudiumException('TEST', 'something bad happened');
  public static readonly test2 = new StudiumException('TEST', 'something bad');
  public static readonly dataNotFound = new StudiumException('Data-Not-Found', 'requested data is missing');
  public static readonly idFormatError = new StudiumException('ID-is-NaN', 'invalid ID format: not a number');

  public readonly code: string;
  public readonly message: string;

  private constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}
