const NodeCache = require("node-cache");
const appCache = new NodeCache({stdTTL:3600});
module.exports = appCache;