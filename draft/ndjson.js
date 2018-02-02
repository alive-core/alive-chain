const fs = require('fs')

const read = (path) =>
  fs.readFileSync(path).toString().split('\n')
    .filter((d) => d)
    .map((d) => JSON.parse(d))

const write = (path, arr) => fs.writeFileSync(path, JSON.stringify(arr.join('\n')))

module.exports = { read, write }
