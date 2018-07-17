const resources = require('../../scripts/haul-resources');
const haulConfigOptions = {
    "entryFile": "./src/functions.ts"
}

export default resources.createHaulConfig(haulConfigOptions);