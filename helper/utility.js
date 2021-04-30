

module.exports = {
    generateResponse(statusCode, message, isSuccess, data) {

        return _responseFormat = {
            statusCode,
            message,
            isSuccess,
            data
        }
    }

}