const DataUriParser = require("datauri/parser");
const path = require("path");

const parser = new DataUriParser();

const getDatauri = (file) => {
  if (!file) return null;

  const extName = path.extname(file.originalname).toString().split(".")[1];

  return parser.format(extName, file.buffer);
};

module.exports = getDatauri;