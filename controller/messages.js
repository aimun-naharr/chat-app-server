import Message from "../models/Message.js"

export const sendMsg=async(req, res)=>{
    try {
        const {from , to, message}=req.body
        const data=await Message.create({
            text: message,
            users: [from, to],
            sender: from
        })
        if(data){
            return res.json({msg: 'Message delivered successfully'})
        }return res.json({msg: 'Failed to send message'})
    } catch (error) {
        console.log(error)
    }
}
export const getAllMsg=async(req, res)=>{
try {
    const {from , to}=req.body
    const messages=await Message.find({
        users: {
            $all: [from, to]
        }
    }).sort({updatedAt: 1})
   if(messages){
    const projectMessage=messages.map(msg=>{
        return {
            fromSelf: msg.sender.toString()=== from,
            message: msg.text,
            _id: msg._id,
            time: msg.createdAt
        }
    })
    res.status(200).json(projectMessage)
   }
} catch (error) {
    console.log(error)
}
}