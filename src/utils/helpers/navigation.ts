type NavigationItem = {
  href: string;
  label: string;
  icon: React.ComponentType;
  matchPatterns?: string[];
};

/**
 * Check if a navigation item should be marked as active based on the current path
 *
 * @param item - The navigation item to check
 * @param currentPath - The current pathname from Next.js router
 * @returns boolean indicating if the item is active
 *
 * @example
 * // Exact match
 * isNavItemActive({ href: "/cash" }, "/cash") // true
 *
 * // Nested route match
 * isNavItemActive({ href: "/members" }, "/members/detail/123") // true
 *
 * // Custom pattern match
 * isNavItemActive({
 *   href: "/members",
 *   matchPatterns: ["/members/detail"]
 * }, "/members/detail/456") // true
 */
export const isNavItemActive = (
  item: NavigationItem,
  currentPath: string,
): boolean => {
  // Exact match
  if (currentPath === item.href) {
    return true;
  }

  // Check if current path starts with the nav item href (for nested routes)
  if (currentPath.startsWith(item.href + "/")) {
    return true;
  }

  // Check additional match patterns
  if (item.matchPatterns) {
    return item.matchPatterns.some((pattern) => {
      if (currentPath.startsWith(pattern)) {
        return true;
      }
      // Handle dynamic segments like /members/detail/:id
      const patternSegments = pattern.split("/");
      const pathSegments = currentPath.split("/");

      if (patternSegments.length <= pathSegments.length) {
        return patternSegments.every((segment, index) => {
          return segment === pathSegments[index];
        });
      }
      return false;
    });
  }

  return false;
};
