// SETH STANLEY-GRAY
module.exports = {

    usernameValidated(username = '') {
        if (!username) {
            return false
        } else if (username.length >= 3) {
            return true;
        } else {
            return false;
        }
    },

    passwordValidated(password = '') {
        if (!password) {
            return false
        } else if (password.length >= 3) {
            return true;
        } else {
            return false;
        }
    },

    ghostValidated() {

    }



}