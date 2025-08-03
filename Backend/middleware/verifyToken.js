import JWT from "jsonwebtoken";


export const checkToken = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (!token) return res.status(401).json({ message: "User are not authorized" });
    try {
        const decoded = JWT.verify(token, process.env.JWT_SEC_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
}