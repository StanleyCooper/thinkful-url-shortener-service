const uses = require("../data/uses-data");

// List the uses
function list(request, response) {
    const { urlId } = request.params;
    const byResult = urlId ? use => use.urlId === Number(urlId) : () => true;
    response.json({ data: uses.filter(byResult) });
}

// Read specific use
function read(request, response, next) {
    response.json({ data: response.locals.use });
}

// Check if matches exits
function useExists(request, response, next) {
    const { useId } = request.params;
    const foundUse = uses.find((use) => use.id === Number(useId));
    if (foundUse) {
        response.locals.use = foundUse;
        return next();
    }
    next({
        status: 404,
        message: `Use is not found: ${useId}.`
    })
}

function destroy(request, response, next) {
    const { useId } = request.params;
    const indexToDelete = uses.findIndex((use) => use.id === Number(useId));
    uses.splice(indexToDelete, 1);
    response.sendStatus(204);
}

module.exports = {
    list,
    read: [useExists, read],
    delete: [useExists, destroy],
    useExists,
}