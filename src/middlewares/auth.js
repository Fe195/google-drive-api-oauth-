import jwt from 'jsonwebtoken'
import {  isValid } from '../helpers/utils.js'


 export const authentication = (req, res, next) => {
    try {
        let tokenBearer = req.headers['Authorization'] || req.headers['authorization'];
        if (!tokenBearer) {
            return res
                .status(400)
                .send({ status: false, message: "token is required" });
        }

        let tokenArray = tokenBearer.split(" ");
        let token = tokenArray[1];

        if (!token) {
            return res.status(404).send({ status: false, message: "Invalid Token" });
        }
        let decodedToken;
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                return res
                    .status(401)
                    .send({ status: false, message: err.message });
            }
            else {
                decodedToken = decode;
                let LoginUserId = decodedToken.userId;
                req["userId"] = LoginUserId.toString();
                next();
            }
        });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

export const authorization = async (req, res, next) => {
    try {
        const tokenId = req.userId;
        const userId = req.params.Id || req.query.Id;

        if (!isValid(userId))
            return res
                .status(400)
                .send({ status: false, message: "please Prvide valid Params" });

        const user = await document.findOne({ _id: userId });

        if (!user) {
            return res.status(404).send({ status: false, message: "Id does not exist" })
        }
    
        const User = user.user.toString();
        if (User == tokenId) {
            next();
        }
        else {
            return res.status(403).send({ status: false, message: `this User ${userId} is unauthrised` })
        }

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

