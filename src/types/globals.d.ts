import type { Browser } from 'webdriverio';

declare global {
  const browser: Browser;
  function $(selector: string): WebdriverIO.Element;
  function $$(selector: string): WebdriverIO.Element[];
}

export {};
