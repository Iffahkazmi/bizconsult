import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
import { authConfig } from './auth.config';
import bcrypt from 'bcryptjs';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  //adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
        name: 'credentials',
        credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
                return null;
            }

            const user = await prisma.user.findUnique({
                where: { email: credentials.email },
            });

            if (!user || !user.password) {
                return null;
            }

            const passwordMatch = await bcrypt.compare(
                credentials.password,
                user.password
            );

            if (!passwordMatch) {
                return null;
            }

            return {
                id: user.id,
                email: user.email,
                name: user.name,
            };
        },
    }),
  ],
  callbacks: {
      async signIn({ user, account, profile }) {
        // For OAuth providers, set authProvider
        if (account?.provider === 'google') {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            // Create new user with authProvider set
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                avatarUrl: user.image,
                authProvider: 'google',
              },
            });
          }
        }
        return true;
      },
      async session({ session, token }) {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.sub = user.id;
        }
        return token;
      },
  },
});   