const jwt = require('jsonwebtoken');
const Utility = require('../helper/utility')


module.exports = () => {

    return (req, res, next) => {
        console.log("inside middleware")
        let privateKey = "037a32ebe4604d6a992661efc84a8544";
        if (req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[1];
            console.log("inside", privateKey, token)
            jwt.verify(token, privateKey, function (err, decoded) {
                if (decoded) {
                    // console.log("decoded",decoded)

                    res.decoded = decoded;

                    // console.log("decoded", res.decoded)
                    next();
                } else {

                    res.status(401).send(Utility.generateResponse(401, 'Invalid Token', false, null))
                }
            });
        } else {

            res.status(401).send(Utility.generateResponse(401, 'Token Require', false, null))

        }

    }
}