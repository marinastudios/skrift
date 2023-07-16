import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { mongoose } from '@lucia-auth/adapter-mongoose';
import { google as oauth } from '@lucia-auth/oauth/providers'
import { Key, Session, User } from './db';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

export const auth = lucia({
	adapter: mongoose({ Key, Session, User }),
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
    experimental: {
        debugMode: true
    }
});

const redirectUriHost = dev ? "http://localhost:5173" : "https://skrift.vercel.app"

export const google = oauth(auth, {
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: `${redirectUriHost}/oauth/continue`
});

export type Auth = typeof auth;