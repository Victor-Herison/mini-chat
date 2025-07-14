
module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ message: 'No token provided' });

    try{
        const verified = require('jsonwebtoken').verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (error) {res.status(401).json({ message: 'No token provided' });}
 }