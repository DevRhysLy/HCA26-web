export interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean;
  }
  
  export interface HeaderProps {
    logoText?: string;
    navItems: NavItem[];
    cta?: {
      label: string;
      href: string;
    };
  }
  