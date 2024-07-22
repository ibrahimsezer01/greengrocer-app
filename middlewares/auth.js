const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied' });
    }

    const tokenWithoutBearer = token.substring(7); // 'Bearer ' kısmını kaldır
    
    try {
        const decoded = jwt.verify(tokenWithoutBearer, 'your-secret-key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;
