import {
  Bell,
  Bookmark,
  Calendar,
  HelpCircle,
  Home,
  Mail,
  Settings,
  ShoppingCart,
  User,
} from 'lucide-react';

export const menuItems = [
  {
    name: 'Home',
    icon: <Home />,
    href: '/',
    component: <div>Home</div>,
  },
  {
    name: 'Profile',
    icon: <User />,
    href: '#',
    component: <div>Profile</div>,
  },
  {
    name: 'Settings',
    icon: <Settings />,
    href: '#',
    component: <div>Settings</div>,
    dropdownItems: [
      {
        name: 'Account',
        href: '#',
        component: <div>Account</div>,
      },
      {
        name: 'Notifications',
        href: '#',
        component: <div>Notifications</div>,
      },
      {
        name: 'Security',
        href: '#',
        component: <div>Security</div>,
      },
    ],
  },
  {
    name: 'Shopping',
    icon: <ShoppingCart />,
    href: '#',
    component: <div>Shopping</div>,
    dropdownItems: [
      {
        name: 'Account',
        href: '#',
        component: <div>Account</div>,
      },
    ],
  },
  {
    name: 'Help',
    icon: <HelpCircle />,
    href: '#',
    component: <div>Help</div>,
  },
];

export const menuItemsWithDropdown = [
  {
    name: 'Dashboard',
    icon: <Home />,
    href: '',
    component: <div>Dashboard</div>,
  },
  {
    name: 'Messages',
    icon: <Mail />,
    href: '#',
    component: <div>Messages</div>,
    dropdownItems: [
      {
        name: 'Inbox',
        href: '#',
        component: <div>Inbox</div>,
      },
      {
        name: 'Sent',
        href: '#',
        component: <div>Sent</div>,
      },
      {
        name: 'Drafts',
        href: '#',
        component: <div>Drafts</div>,
      },
    ],
  },
  {
    name: 'Calendar',
    icon: <Calendar />,
    href: '#',
    component: <div>Calendar</div>,
  },
  {
    name: 'Notifications',
    icon: <Bell />,
    href: '#',
    component: <div>Notifications</div>,
    dropdownItems: [
      {
        name: 'All',
        href: '#',
        component: <div>All</div>,
      },
      {
        name: 'Unread',
        href: '#',
        component: <div>Unread</div>,
      },
      {
        name: 'Mentions',
        href: '/',
        component: <div>Mentions</div>,
      },
    ],
  },
  {
    name: 'Bookmarks',
    icon: <Bookmark />,
    href: '#',
    component: <div>Bookmarks</div>,
  },
  {
    name: 'Settings',
    icon: <Settings />,
    href: '#',
    component: <div>Settings</div>,
    dropdownItems: [
      {
        name: 'Account',
        href: '#',
        component: <div>Account</div>,
      },
      {
        name: 'Privacy',
        href: '#',
        component: <div>Privacy</div>,
      },
      {
        name: 'Notifications',
        href: '#',
        component: <div>Notifications</div>,
      },
      {
        name: 'Security',
        href: '#',
        component: <div>Security</div>,
      },
    ],
  },
];
