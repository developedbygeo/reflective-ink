import { authMiddleware } from '@clerk/nextjs';

// middleware checks cookies and redirects to login if not logged in
export default authMiddleware({
  publicRoutes: ['/'],
});
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
