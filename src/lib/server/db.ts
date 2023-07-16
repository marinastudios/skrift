import { DATABASE_URL } from "$env/static/private";
import mongodb from "mongoose";

function model(name: string, schema: mongodb.Schema) {
    return mongodb.models[name] || mongodb.model(name, schema);
}

const User = model(
	"User",
	new mongodb.Schema(
		{
			_id: {
				type: String,
				required: true
			},
            username: {
                type: String,
                required: false
            },
            completed: {
                type: Boolean,
                required: true
            }
		} as const,
		{ _id: false }
	)
);

const Key = model(
	"Key",
	new mongodb.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			user_id: {
				type: String,
				required: true
			},
			hashed_password: String
		} as const,
		{ _id: false }
	)
)


const Session = model(
	"Session",
	new mongodb.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			user_id: {
				type: String,
				required: true
			},
			active_expires: {
				type: Number,
				required: true
			},
			idle_expires: {
				type: Number,
				required: true
			}
		} as const,
		{ _id: false }
	)
)

mongodb.connect(DATABASE_URL, {
    dbName: "db1"
})
mongodb.pluralize(null);

export default mongodb;
export {
    User,
    Key,
    Session,
};