import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) =>
        token !== null && token.accessToken !== undefined,
    },
  }
);

export const config = {
  matcher: ["/((?!register|api|login).*)"], // ?!で否定です。
};
