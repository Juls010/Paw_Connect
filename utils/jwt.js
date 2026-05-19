const jwt = require('jsonwebtoken'); 


function generateTokens(user) {
    const payload = {
        sub: user._id,          
        username: user.username,
        roles: user.roles       
    };

    const access = jwt.sign(payload, process.env.JWT_SECRET || 'test_secret', {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
    });

    const refresh = jwt.sign(
        { sub: user._id }, 
        process.env.JWT_REFRESH_SECRET || 'test_refresh_secret', 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
    );

    return { access, refresh }; 
}


function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET || 'test_secret'); 
}


function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'test_refresh_secret'); 
}

module.exports = { 
    generateTokens, 
    verifyAccessToken, 
    verifyRefreshToken 
};