class Logger {

  private c: {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };

  constructor() {
    this.c = console || {
      log: () => {/**/},
      warn: () => {/**/},
      error: () => {/**/}
    };
  }

  public log = (...args: any[]) => {
    this.c.log(...args);
  }

  public warn = (...args: any[]) => {
    this.c.warn(...args);
  }

  public error = (...args: any[]) => {
    this.c.error(...args);
  }

}

const logger = new Logger();

export { logger };
