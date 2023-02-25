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
      success: string;
      warning: string;
      error: string;
      disabled: string;
    };
    spacing: {
      [key: number]: string;
    };
  }
}
