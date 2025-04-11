import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded token:", decoded);
        next();
    } catch (err) {
        if (err.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Invalid token" });
        } else if (err.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Token expired" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default auth;