import React from "react";

import { Text } from "./typography.styles";

export const Typography: RNElement<TypographyProps> = React.memo(({ children, variant }) => {
  return (
    <Text variant={variant} accessibilityRole="text">
      {children}
    </Text>
  );
});
