import { dev } from "$app/environment";
import { google } from "$lib/server/auth";

export async function GET({ cookies }) {
    const [ url, code ] = await google.getAuthorizationUrl();
    cookies.set("oauth_code", code, {
		httpOnly: true,
		secure: !dev,
		path: "/",
		maxAge: 60 * 60
	});
	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}