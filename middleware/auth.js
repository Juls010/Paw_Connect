const { verifyAccessToken } = require('../utils/jwt'); 

function authenticate(req, res, next) {
    const header = req.headers.authorization;
    

    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ detail: 'Token no proporcionado o formato incorrecto' }); 
    }

    const token = header.split(' ')[1];

    try {
        req.user = verifyAccessToken(token);
        next(); 
    } catch (error) {
        
        return res.status(401).json({ detail: 'Token inválido o expirado' }); 
    }
}

function hasRole(...requiredRoles) {
    return (req, res, next) => {
        const userRoles = req.user?.roles ?? [];

        const hasPermission = requiredRoles.some(role => userRoles.includes(role));

        if (!hasPermission) {
            return res.status(403).json({ detail: 'No tienes permisos suficientes' });
        }

        next(); 
    };
}

module.exports = { authenticate, hasRole };