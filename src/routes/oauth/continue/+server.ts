import { auth, google } from "$lib/server/auth";
import { OAuthRequestError } from "@lucia-auth/oauth";

export async function GET({ url, cookies, locals }) {
    const setState = cookies.get("oauth_code");
    const receivedState = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    if (!setState || !receivedState || setState !== receivedState || !code) {
		return new Response(null, {
			status: 400
		});
	}
    try {
		const { existingUser, googleUser, createUser } =
			await google.validateCallback(code);

		const getUser = async () => {
			if (existingUser) return existingUser;
			const user = await createUser({
                attributes: {
                    completed: false,
                }
            });
			return user;
		};
		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
        console.log(e);
		if (e instanceof OAuthRequestError) {
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}