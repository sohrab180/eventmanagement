const ErrorLog = require('../models/errorLog');

const errorLogger = async (err, req, res, next) => {
    try {
        // Create and save the error log entry
        await new ErrorLog({
            endpoint: req.originalUrl || 'N/A',
            method: req.method || 'N/A',
            requestBody: req.body || {},
            queryParams: req.query || {},
            headers: req.headers || {},
            errorMessage: err.message || 'No error message provided',
            stack: err.stack || 'No stack trace available',
        }).save();

        console.error('Error logged successfully:', err.message);

        // Respond with the appropriate error status and message
        const statusCode = err.status || 500;
        res.status(statusCode).json({
            status: 'error',
            message: err.message || 'An internal server error occurred.',
        });
    } catch (logError) {
        console.error('Failed to log error:', logError.message);

        // Respond with a generic error message if logging fails
        res.status(500).json({
            status: 'error',
            message: 'Error logging failed.',
        });
    }
};

module.exports = errorLogger;
