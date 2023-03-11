const jwt = require('jsonwebtoken')
const { StatusCodes } = require("http-status-codes");

const CreateJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
    return token
}

const isValidToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
    const token = CreateJWT({ payload: user });
    const oneday = 1000 * 60 * 60 * 24
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneday)
    })
}
module.exports = {
    CreateJWT,
    isValidToken,
    attachCookiesToResponse
};