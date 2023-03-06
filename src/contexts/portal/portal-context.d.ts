export {};

declare global {
  type PortalContent = {
    id: string;
    content: React.ReactNode;
  };

  type PortalContextType =
    | {
        addPortalContent: (content: React.ReactNode) => void;
        removeLastPortalContent: () => void;
      }
    | undefined;
}
