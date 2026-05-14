import { IMenuItem } from '../menus/menu-item';

export function matchesPath(
  pathname: string,
  targetPath: string,
  includeDescendants = false
) {
  if (pathname === targetPath) {
    return true;
  }

  if (!includeDescendants) {
    return false;
  }

  const normalizedTarget =
    targetPath.length > 1 && targetPath.endsWith('/')
      ? targetPath.slice(0, -1)
      : targetPath;

  if (!normalizedTarget || normalizedTarget === '/') {
    return pathname === normalizedTarget;
  }

  return pathname.startsWith(`${normalizedTarget}/`);
}

export function findCurrentPageTitle(
  items: IMenuItem[],
  pathname: string
): string | null {
  for (const item of items) {
    if (item.hide) continue;

    const visibleChildren =
      item.dropdownItems?.filter((child) => !child.hide) ?? [];
    const activeChild = visibleChildren.find(
      (child) => child.isActive || matchesPath(pathname, child.path, true)
    );

    if (activeChild) {
      return activeChild.name;
    }

    if (item.isActive || item.path === pathname) {
      return item.name;
    }

    if (
      visibleChildren.some(
        (child) => child.isActive || matchesPath(pathname, child.path, true)
      )
    ) {
      return item.name;
    }
  }

  return null;
}
