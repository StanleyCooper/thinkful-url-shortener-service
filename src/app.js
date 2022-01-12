const express = require("express");
const app = express();

// Not found handler
app.use((request, response, next) => {
    next({ status: 404, message: `Not found: ${request.originalUrl}` });
});
  
// Error handler
app.use((error, request, response, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    response.status(status).json({ error: message });
});

module.exports = app;