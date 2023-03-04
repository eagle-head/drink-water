/* eslint-disable @typescript-eslint/ban-types */
export {};

declare global {
  type RNElement<T = unknown> = (props: T) => JSX.Element;
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};
}
