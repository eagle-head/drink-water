export {};

declare global {
  type PortalContextType =
    | {
        mount: (component: React.ReactNode) => void;
        unmount: () => void;
      }
    | undefined;
}
