import jwt from 'jsonwebtoken';

/**
 * Core Middleware to protect routes
 */
export const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: "No token, authorization denied" });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = decoded;

            if (roles.length > 0 && !roles.includes(req.user.role)) {
                return res.status(403).json({ 
                    message: `Role ${req.user.role} is not authorized` 
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Token is not valid" });
        }
    };
};

/**
 * ✅ FIX: Added adminMiddleware export
 * This resolves the SyntaxError in user.routes.js
 */
export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
};

export const protect = authMiddleware();