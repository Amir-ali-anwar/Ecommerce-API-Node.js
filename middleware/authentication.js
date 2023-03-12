const CustomAPIError = require("../errors/");
const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        throw new CustomAPIError.UnauthenticatedError("Authetication invalid");
    }else{
        console.log('token present');
    }
    next()
}


module.exports={
    authenticateUser
}