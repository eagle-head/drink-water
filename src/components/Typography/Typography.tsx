import React from "react";

import { Text } from "./typography.styles";

const Typography: RNElement<TypographyProps> = ({ children, variant }) => {
  return (
    <Text variant={variant} accessibilityRole="text">
      {children}
    </Text>
  );
};

const MemoizedTypography = React.memo<TypographyProps>(Typography);
export { MemoizedTypography as Typography };
