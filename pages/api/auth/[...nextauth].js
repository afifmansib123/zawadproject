import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/utils/db';
import GoogleProvider from "next-auth/providers/google";
import UserModel from '@/pages/models/User';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            if (user?.role) token.role = user.role;
            return token;
        },
        async session({ session, token , myuser}) {
            if (token?._id) session.user._id = token._id;
            if (token?._role) session.user._role = token._role;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await UserModel.findOne({
                    email: credentials.email,
                });
                await db.disconnect();
                if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                    let myuser = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role : user.role,
                        gender : user.gender,
                        photo : user.photo,
                        image: 'f',
                        role: user.role,
                    };
                    return myuser
                }
                alert('wrong username or password')
            },
        }),
        ////////////////
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
});
