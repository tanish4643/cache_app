function CustomError(message = "") {
    const error = new Error();
    error.status = false;
    error.name = "CustomError";
    error.message = message;

    return error;
}

function errorHandler(err, req, res, next) {
    //Check if Custom error thrown from source code
    if(err.name === "CustomError"){
        return res.status(400).json({ 
            status: err.status,
            message: err.message
        });
    }
    
    /** Error logging for code errors */
    console.log('Error occurred while processing request');
    console.log(err.message);
    console.log(err.stack);

    return res.status(500).json({ 
        status: false,
        message: "Something went wrong while processing request" 
    });
}

module.exports = {
    errorHandler,
    CustomError
};