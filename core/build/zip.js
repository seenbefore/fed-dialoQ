#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const { formatDate } = require('icinfo-util')
const { baseRootPath } = require('../utils/path.js')

const DEST_DIR = path.join(baseRootPath, 'dist')
const DEST_ZIP_DIR = path.join(baseRootPath, 'dist-zip')

const extractExtensionData = () => {
    const extPackageJson = require(path.resolve(baseRootPath, 'package.json'))

    return {
        name: extPackageJson.name,
        version: extPackageJson.version,
    }
}

const makeDestZipDirIfNotExists = () => {
    if (!fs.existsSync(DEST_ZIP_DIR)) {
        fs.mkdirSync(DEST_ZIP_DIR)
    }
}

const buildZip = (src, dist, zipFilename) => {
    console.info(`Building ${zipFilename}...`)

    const archive = archiver('zip', { zlib: { level: 9 } })
    const stream = fs.createWriteStream(path.join(dist, zipFilename))

    return new Promise((resolve, reject) => {
        archive
            .directory(src, false)
            .on('error', err => reject(err))
            .pipe(stream)

        stream.on('close', () => resolve())
        archive.finalize()
    })
}

const main = () => {
    const { name, version } = extractExtensionData()
    const zipFilename = `${name}-v${version}_${formatDate(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.zip`

    makeDestZipDirIfNotExists()

    buildZip(DEST_DIR, DEST_ZIP_DIR, zipFilename)
        .then(() => console.info('OK'))
        .catch(console.err)
}

main()
