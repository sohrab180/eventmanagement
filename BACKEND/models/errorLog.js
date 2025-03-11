const mongoose = require('mongoose');

const errorLogSchema = new mongoose.Schema({
    endpoint: { type: String, required: true },
    method: { type: String, required: true },
    requestBody: { type: Object },
    queryParams: { type: Object },
    headers: { type: Object },
    errorMessage: { type: String, required: true },
    stack: { type: String },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ErrorLog', errorLogSchema);
