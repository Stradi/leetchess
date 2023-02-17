export interface INavigationItem {
  label: string;
  href: string;

  megaMenu?: {
    title: string;
    description: string;
    items: {
      label: string;
      href: string;
      description?: string;
    }[];
  };
}

export interface IConfig {
  navigation: INavigationItem[];
}
