// Formats route enum for router module list of routes (for route register)
export function preformatRouteEnum(route: string): string {
  return route.slice(1, route.length);
}

export enum APP_ROUTES {
  LOGIN_REGISTER = '/welcome',
  MAIN_BLOGS = '/blogs',
}
