import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "FirstName is required"],
		},
		lastName: {
			type: String,
			required: [true, "LastName is required"],
		},
		avatar: {
			type: String,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			validate: {
				validator: function (email) {
					return String(email)
						.toLowerCase()
						.match(
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						);
				},
			},
		},
		password: {
			type: String,
			min: 6,
			required: true,
		},
		
		
	},
	{ timestamps: true }
);

const User = new mongoose.model("user", userSchema);
export default User;
