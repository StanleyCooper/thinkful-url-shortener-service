const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

// Grab the last urlId
let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);

// List all urls
function list(request, response) {
    response.json({ data: urls });
}

// Get the specfic matched url from data
function read(req, response) {
    let newUseId = uses.length + 1;
    const urlId = Number(request.params.urlId);
    const newUse = {
        id: newUseId,
        urlId,
        time: Date.now(),
    }
    uses.push(newUse)
    response.json({ data: response.locals.url })
}

// Check for a matching url, or give a 404
function urlExists(request, response, next) {
    const { urlId } = request.params;
    const foundUrl = urls.find((url) => url.id === Number(urlId));
    if (foundUrl) {
        response.locals.url = foundUrl;
        return next();
    }
    next({
        status: 404,
        message: `Url is not found: ${urlId}.`
    })
}

// Check for a valid url in request body
function bodyHasReferenceProperty(request, response, next) {
    const { data: { href } = {} } = request.body;
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
    const { data: { href } = {} } = request.body;
    const newUrl = {
        href,
        id: ++lastUrlId, // increment the last id, then assign as new id
    };
    urls.push(newUrl);
    response.status(201).json({ data: newUrl });
}

function update(request, response, next) {
    const url = response.locals.url;
    const originalUrl = url.href;
    const { data: { href } = {} } =request.body;
    if (originalUrl !== href) {
        url.href = href;
    }
    response.json({ data: url });
}

module.exports = {
    list,
    urlExists,
    create: [bodyHasReferenceProperty, create],
    read: [urlExists, read],
    update: [urlExists, bodyHasReferenceProperty, update],
}