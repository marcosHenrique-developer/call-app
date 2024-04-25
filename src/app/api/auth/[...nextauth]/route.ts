import { PrismaAdapter } from '../../../../lib/auth/prisma-adapter'
import NextAuth from 'next-auth/next'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

const handler = NextAuth({
  secret: process.env.SECRET,
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile: GoogleProfile) {
        return {
          avatar_url: profile.picture,
          email: profile.email,
          id: profile.sub,
          name: profile.name,
          username: '',
        }
      },
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar?error=permissions'
      }

      return true
    },
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
  },
})

export { handler as GET, handler as POST }
