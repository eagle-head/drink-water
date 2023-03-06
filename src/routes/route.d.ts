export {};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootBottomTabsParamList {}
  }

  type RootBottomTabsParamList = {
    Home: undefined;
    History: undefined;
    Settings: undefined;
  };

  interface TabBarIconArgs {
    focused?: boolean;
    color: string;
    size: number;
    iconName: string;
  }

  type TabBarIcon = (args: TabBarIconArgs) => React.ReactNode;
}
