//Mark Levitas
module.exports = {

        roomNameTest(user_id, receiver_id){
            if(!user_id || !receiver_id){
                return false
            }else{
                const roomName = `${Math.min(user_id, receiver_id)}_${Math.max(user_id, receiver_id)}`
                return roomName
            }
        }
}