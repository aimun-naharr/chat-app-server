import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true});

const Message = new mongoose.model("message", messageSchema);
export default Message;