/* eslint-disable @typescript-eslint/ban-types */
export {};

declare global {
  type RNElement<T = unknown> = (params: T) => JSX.Element | null;
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};
}
