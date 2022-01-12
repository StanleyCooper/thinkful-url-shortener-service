const res = require("express/lib/response");
const urls = require("../data/urls-data");

// Grab the last urlId
let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);

// List all urls
function list(request, response) {
    response.json({ data: urls });
}

// Check for a matching url, or give a 404
function urlExists(request, response, next) {
    const { urlId } = request.params;
    const foundUrl = urls.find((url) => url.id === Number(urlId));
    if (foundUrl) {
        respond.locals.url = foundUrl;
        return next();
    }
    next({
        status: 404,
        message: `Url is not found: ${urlId}.`
    })
}

// Check for a valid url in request body
function bodyHasReferenceProperty(request, response, next) {
    const { data: { href } = {} } = req.body;
    if (href) {
        return next();
    }
    next({
        status: 400,
        message: "A 'href' property is required.",
    });
}

// Create a new url and push into the urls data
function create(request, response) {
    const { data: { href } ={} } = request.body;
    const newUrl = {
        id: ++lastUrlId, // increment the last id, then assign as new id
        href,
    };
    urls.push(newUrl);
    response.status(201).json({ data: newUrl });
}

module.exports = {
    list,
    urlExists,
    create: [bodyHasReferenceProperty, create],
}