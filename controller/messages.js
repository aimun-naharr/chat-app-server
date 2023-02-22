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
export const getMsg=async(req, res)=>{

}