const { writeFileSync } = require('fs')

const writeJson = (jsonPath, json) => {
    writeFileSync(jsonPath, JSON.stringify(json, null, 4))
}

module.exports = {
    writeJson,
}
