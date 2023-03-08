import React from "react";
import type { PropsWithChildren } from "react";

import { View, StyleSheet } from "react-native";

const PortalContext = React.createContext<PortalContextType>(undefined);

export const PortalProvider: RNElement<PropsWithChildren> = ({ children }) => {
  const [portalComponent, setPortalComponent] = React.useState<React.ReactNode | null>(null);
  const portalRef = React.useRef<View>(null);

  React.useEffect(() => {
    if (portalComponent) {
      portalRef.current?.setNativeProps({
        pointerEvents: "auto",
      });

      return;
    }

    portalRef.current?.setNativeProps({
      pointerEvents: "none",
    });
  }, [portalComponent]);

  const mount = (component: React.ReactNode) => {
    setPortalComponent(component);
  };

  const unmount = () => {
    setPortalComponent(null);
  };

  return (
    <PortalContext.Provider value={{ mount, unmount }}>
      {children}
      {portalComponent ? (
        <View ref={portalRef} style={styles.container}>
          {portalComponent}
        </View>
      ) : null}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = React.useContext(PortalContext);

  if (context === undefined) {
    throw new Error("usePortal must be called from within a PortalProvider");
  }

  return context;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,

    backgroundColor: "rgba(0,0,0, 0.75)",
  },
});
