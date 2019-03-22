module.exports = {
    filteredSwipes: async (req, res) => {
        const { session } = req;
        console.log(session.user.id)
        
    }
}