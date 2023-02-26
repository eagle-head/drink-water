import type { PropsWithChildren } from "react";

export {};

declare global {
  type TypographyVariants = {
    variant: "paragraph" | "subtitle" | "title";
  };

  type TypographyProps = Prettify<TypographyVariants & PropsWithChildren>;
}
