import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: [true, "LastName is required"],
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
		avatar: {
			type: String,
		},
		isAvatarImageSet: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const User = new mongoose.model("user", userSchema);
export default User;
