class ErrorHandler extends Error {
  constructor(public messsage: string, public statusCode: number) {
    super(messsage);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
