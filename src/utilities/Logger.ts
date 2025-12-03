/**
 * Logger utility for logging test information
 */

export class Logger {
  private static readonly RESET = '\x1b[0m';
  private static readonly BRIGHT = '\x1b[1m';
  private static readonly RED = '\x1b[31m';
  private static readonly GREEN = '\x1b[32m';
  private static readonly YELLOW = '\x1b[33m';
  private static readonly BLUE = '\x1b[34m';
  private static readonly CYAN = '\x1b[36m';

  static info(message: string): void {
    console.log(`${Logger.CYAN}[INFO]${Logger.RESET} ${message}`);
  }

  static success(message: string): void {
    console.log(`${Logger.GREEN}${Logger.BRIGHT}[SUCCESS]${Logger.RESET} ${message}`);
  }

  static warn(message: string): void {
    console.log(`${Logger.YELLOW}[WARN]${Logger.RESET} ${message}`);
  }

  static error(message: string): void {
    console.log(`${Logger.RED}${Logger.BRIGHT}[ERROR]${Logger.RESET} ${message}`);
  }

  static debug(message: string): void {
    console.log(`${Logger.BLUE}[DEBUG]${Logger.RESET} ${message}`);
  }

  static testStart(testName: string): void {
    console.log(
      `${Logger.BRIGHT}${Logger.BLUE}===================================${Logger.RESET}`
    );
    console.log(`${Logger.BRIGHT}Starting Test: ${testName}${Logger.RESET}`);
    console.log(
      `${Logger.BRIGHT}${Logger.BLUE}===================================${Logger.RESET}`
    );
  }

  static testEnd(testName: string): void {
    console.log(
      `${Logger.BRIGHT}${Logger.BLUE}===================================${Logger.RESET}`
    );
    console.log(`${Logger.BRIGHT}Test Completed: ${testName}${Logger.RESET}`);
    console.log(
      `${Logger.BRIGHT}${Logger.BLUE}===================================${Logger.RESET}`
    );
  }
}
