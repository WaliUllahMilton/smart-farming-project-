// import  Jwt  from "jsonwebtoken";
import JWT from "jsonwebtoken";
//protected route token
export const requireSignIn = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Access: Token missing',
        });
    }
        try {
            const decode = JWT.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({
                success: false,
                message: "Unauthorized Access :Invalid token"
            });
        }
    }



