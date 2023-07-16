import { auth } from '$lib/server/auth';

export const handle = async ({ event, resolve }) => {
    event.locals.auth = auth.handleRequest(event);
    return await resolve(event);
};