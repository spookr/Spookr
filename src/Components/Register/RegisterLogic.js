module.exports = {
    usernameValidate(username = ''){
        if(!username){
            return false
        }else if(username.length >= 3){
            return true
        }
        return false

    },

    passwordValidate(password = ''){
        if(!password){
            return false
        }else if(password.length >= 3){
            return true
        }else{
            return false
        }
    },

    ghostValidate(){

    }

}