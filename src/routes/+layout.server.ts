import { User } from '$lib/server/db';

export async function load({ locals }) {
    const validationData = (await locals.auth.validate());
    if(!validationData) return { user: null };
    const userId = validationData.user.userId;
    const user = JSON.parse(JSON.stringify(await User.findById(userId).exec()));
    return {
        user
    }
}