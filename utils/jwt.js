const jwt = require('jsonwebtoken'); 


function generateTokens(user) {
    const payload = {
        sub: user._id,          
        username: user.username,
        roles: user.roles       
    };

    const access = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
    });

    const refresh = jwt.sign(
        { sub: user._id }, 
        process.env.JWT_REFRESH_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    return { access, refresh }; 
}


function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET); 
}


function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET); 
}

module.exports = { 
    generateTokens, 
    verifyAccessToken, 
    verifyRefreshToken 
};