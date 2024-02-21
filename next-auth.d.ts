import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role?: 'ADMIN' | 'USER'
    } & DefaultSession["user"]
  }

  interface User {
    role?: 'ADMIN' | 'USER'
    emailVerified?: Date | null 
    twoFactorEnabled?: boolean
  }

}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
      /** OpenID ID Token */
      role?: 'ADMIN' | 'USER'
    }
  }