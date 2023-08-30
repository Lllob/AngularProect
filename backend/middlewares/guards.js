const { getDataFromToken } = require('../util/generateToken')
const Post = require('../models/Create.js')

module.exports = {
    isUser: () => (req, res, next) => {
        //const accessToken = req.header('x-authorization')
        const accessToken = req.headers["authorization"];
        if (accessToken) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    },

    isOwner: () => async (req, res, next) => {
       //const accessToken = req.header('x-authorization')
       
        //zashtoto pokazva: Bearer ttgfe44rrr 
        const accessToken = req.headers["authorization"]
        const [bearer, token] = accessToken.split(' '); 
        const userDataToken = await getDataFromToken(token) 
        const postId = req.params.id
        const post = await Post.findById(postId)
        if (userDataToken.id._id == post.owner) {
            next();
         } else {
            res.status(403).json({ message: 'You cannot modify this record' });
        }
    }
};

