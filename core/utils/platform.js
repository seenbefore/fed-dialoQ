const os = require('os')

module.exports = {
    isMac: os.platform() === 'darwin',
}
