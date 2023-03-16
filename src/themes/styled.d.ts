// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      title: string;
      subtitle: string;
      paragraph: string;
      warning: string;
      disabled: string;
      divider: string;
      placeholder: string;
      successText: string;
      successBackground: string;
      successBorder: string;
      errorText: string;
      errorBackground: string;
      errorBorder: string;
      modalBackground: string;
    };
    spacing: {
      [key: number]: string;
    };
  }
}
