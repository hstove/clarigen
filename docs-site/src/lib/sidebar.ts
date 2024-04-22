import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItem[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export const docsSidebar: SidebarNavItem[] = [
  {
    title: 'Getting started',
    items: [
      {
        title: 'Quick start',
        href: '/docs/getting-started',
      },
      {
        title: 'Intro',
        href: '/docs/intro',
      },
      {
        title: 'CLI',
        href: '/docs/cli',
      },
      {
        title: 'Configuration',
        href: '/docs/configuration',
      },
      {
        title: 'Contract documentation generator',
        href: '/docs/documentation',
      },
    ],
  },
  {
    title: 'Clarity unit tests',
    items: [
      // {
      //   title: "Quick start",
      //   href: "/docs/unit-tests/quick-start"
      // }
    ],
  },
  {
    title: 'Building Clarity apps',
    items: [
      {
        title: 'Quick start',
        href: '/docs/apps/quick-start',
      },
      {
        title: 'Read-only functions',
        href: '/docs/apps/read-only-functions',
      },
      {
        title: 'Transactions',
        href: '/docs/apps/transactions',
      },
      {
        title: 'Factories',
        href: '/docs/apps/factory',
      },
      {
        title: 'Deployments',
        href: '/docs/apps/deployments',
      },
      {
        title: 'Post-conditions',
        href: '/docs/apps/post-conditions',
      },
      {
        title: 'Node',
        href: '/docs/apps/node',
      },
    ],
  },
];