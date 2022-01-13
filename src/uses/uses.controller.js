const res = require("express/lib/response");
const uses = require("../data/uses-data");

// List the uses
function list(request, response) {
    const { urlId } = req.params;
    const byResult = urlId ? use => use.Id ===Number(urlId) : () => true;
    response.json({ data: uses.filter(byResult) });
}

// Read specific use
function read(request, response, next) {
    response.json({ data: res.locals.use });
}

// Check if matches exits
function useExists(request, response, next) {
    const { useId } = request.params;
    const foundUse = uses.find((use) => use.id === Number(useId));
    if (foundUse) {
        respond.locals.use = foundUse;
        return next();
    }
    next({
        status: 404,
        message: `Use is not found: ${useId}.`
    })
}

module.exports = {
    list,
    read: [useExists, read],
    useExists,
}