const express = require("express");

const urls = require("./data/urls-data");
const uses = require("./data/uses-data");

const app = express();

const urlsRouter = require("./urls/urls.router");

app.use(express.json());

app.use("/urls", urlsRouter);

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