function apiResponse(res, error, msg, data, status = 200) {

    
    if (data == null){
        data = [];
    }
    return res.status(status).json({

        "error": error,
        "message": msg,
        "results": data
    }

    );
}

module.exports = apiResponse;
