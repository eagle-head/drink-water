import React, { type PropsWithChildren } from "react";

const PortalContext = React.createContext<PortalContextType>(undefined);

function PortalProvider({ children }: PropsWithChildren) {
  const [uniqueId, setUniqueId] = React.useState(Date.now().toString());
  const [portalContent, setPortalContent] = React.useState<PortalContent[]>([]);

  function addPortalContent(content: React.ReactNode) {
    const newPortalContent = { id: uniqueId, content };
    setUniqueId(Date.now().toString());
    setPortalContent([...portalContent, newPortalContent]);
  }

  function removeLastPortalContent() {
    const newPortalContent = [...portalContent];
    newPortalContent.pop();
    setPortalContent(newPortalContent);
  }

  const value = { addPortalContent, removeLastPortalContent };

  return (
    <PortalContext.Provider value={value}>
      {children}
      {portalContent.length > 0
        ? portalContent.map(content => <React.Fragment key={content.id}>{content.content}</React.Fragment>)
        : null}
    </PortalContext.Provider>
  );
}

function usePortal() {
  const context = React.useContext(PortalContext);

  if (context === undefined) {
    throw new Error("usePortal must be called from within an PortalProvider");
  }

  return context;
}

export { PortalProvider, usePortal };

// EXAMPLE

// const handleModal = () => {
//   addPortalContent(
//     <View style={{ width: 300, backgroundColor: "pink", position: "absolute" }}>
//       <Text>This is an example portal component!</Text>
//       <Button variant="primary" size="large" title="drink" onPress={() => removeLastPortalContent()} />
//     </View>
//   );
// };
