//Mark Levitas
module.exports = {
    displayGhost (ghost){
        if(ghost){
            return true
        }else if(ghost === false){
            return false
        }else{
            return null
        }
    }

}