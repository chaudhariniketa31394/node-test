const jwt = require('jsonwebtoken');
const Utility = require('./utility')




module.exports = (requiredRole) => {
    return (req, res, next) => {
        console.log("res.decoded", res.decoded, "requiredRole", requiredRole)
        if (res.decoded.user.type.name == requiredRole) {
            return next();
        } else {
            return res.status(401).send(Utility.generateResponse(401, 'Action Not Allowed', false, null))
        }
    }
}