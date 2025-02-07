import JWT from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async(req, res, next) => {

    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        console.log(token, "token");  // Log after token assignment
        if (!token) {
            return res.status(401).json({ message: "Unauthorized " });
        }

        const isBlacklisted =  await redisClient.get(token);

        if(isBlacklisted){
            res.cookie('token', ' ')
            return res.status(401).json({ message: "Unauthorized user" });
        }
        console.log(isBlacklisted, "isBlacklisted")

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error, "eeeee")
        return res.status(401).json({ message: "Unauthorized user" });
    }
}
