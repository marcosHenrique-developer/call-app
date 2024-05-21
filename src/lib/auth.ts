import { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import { PrismaAdapter } from './auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },

    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar?error=permissions'
      }

      return true
    },
  },
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code',
          scope: 'email profile https://www.googleapis.com/auth/calendar',
        },
      },
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(profile: GoogleProfile) {
        return {
          avatar_url: profile.picture,
          email: profile.email,
          id: profile.sub,
          name: profile.name,
          username: '',
        }
      },
    }),
  ],
}
