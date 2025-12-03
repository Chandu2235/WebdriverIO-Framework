/**
 * Common utilities for test automation
 */

/**
 * Generate random string
 */
export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random number
 */
export function generateRandomNumber(min: number = 1, max: number = 1000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Wait for specific time
 */
export async function wait(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Compare two strings (case-insensitive)
 */
export function compareStrings(str1: string, str2: string): boolean {
  return str1.toLowerCase().trim() === str2.toLowerCase().trim();
}

/**
 * Extract number from string
 */
export function extractNumber(str: string): number {
  const match = str.match(/\d+\.?\d*/);
  return match ? parseFloat(match[0]) : 0;
}

/**
 * Get current date in format YYYY-MM-DD
 */
export function getCurrentDateFormatted(): string {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

/**
 * Retry function with exponential backoff
 */
export async function retry(
  fn: () => Promise<any>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<any> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      await wait(delayMs * Math.pow(2, attempt - 1));
    }
  }
}
