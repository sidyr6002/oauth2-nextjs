/**
 * List of public routes.
 * Public routes are accessible without authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
]

/**
 * List of routes used for authentication
 * If use is logged in, they will be redirected to the /settings
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/forgotPassword'
]

/**
 * The prefix for API routes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect after authentication
 * @type {string}
 */
export const DEFAULT_REDIRECT = '/settings'

