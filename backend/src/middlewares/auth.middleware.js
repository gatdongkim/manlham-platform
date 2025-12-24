import jwt from 'jsonwebtoken';

/**
 * Core Middleware to protect routes and check user roles
 */
export const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            // 1. Get token from header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: "No token, authorization denied" });
            }

            const token = authHeader.split(' ')[1];

            // 2. Verify token
            // Ensure JWT_SECRET is defined in your .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 3. Attach user to request object
            // This ensures req.user.id and req.user.role are available in your controllers
            req.user = decoded;

            // 4. Check Roles (if any are specified)
            // Note: We use uppercase to match your registration roles (MSME, PRO, ADMIN)
            if (roles.length > 0 && !roles.includes(req.user.role)) {
                return res.status(403).json({ 
                    message: `Role ${req.user.role} is not authorized to access this route` 
                });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error.message);
            return res.status(401).json({ message: "Token is not valid or has expired" });
        }
    };
};

/**
 * HELPER EXPORT: 'protect'
 * Use this for routes that just need any logged-in user regardless of role
 */
export const protect = authMiddleware();