import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/db'
import { checkRateLimit } from '@/lib/rate-limit'
import { withTimeout } from '@/lib/with-timeout'
import bcrypt from 'bcryptjs'

const LOGIN_RATE_LIMIT = 5
const LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const DB_TIMEOUT_MS = 8000

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        if (!checkRateLimit(`login:${credentials.email}`, LOGIN_RATE_LIMIT, LOGIN_RATE_LIMIT_WINDOW_MS)) {
          throw new Error('Too many login attempts. Please try again later.')
        }

        const user = await withTimeout(
          prisma.user.findUnique({ where: { email: credentials.email } }),
          DB_TIMEOUT_MS,
          'login user lookup'
        )

        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
