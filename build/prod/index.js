const del = require('del')
const path = require('path')

const execAsync = require('../utils/exec-async')
const versionAssets = require('../version-assets')

async function buildProd() {
  try {
    // Assumes buildProd will be run from the project root
    const rootDir = process.cwd()

    // Clean out any existing dist files
    const assetDir = path.join(rootDir, 'assets')
    const deletedFiles = del.sync([
      path.join(assetDir, 'js/dist/*')
    ])

    console.log(`Deleted the following dist files: ${deletedFiles.join(', ')}`)
    console.log(`Building assets`)

    // Build the js bundle
    const config = path.join(rootDir, 'webpack.prod.js')
    // Keep webpack from using too much memory
    const mem = `--max_old_space_size=500`
    const w = `node ${mem} node_modules/.bin/webpack --config ${config}`
    const { stdout, stderr } = await execAsync(w)

    console.log(stdout)
    console.log(stderr)

    // Version the assets
    await versionAssets({env: 'production'})

    // Compress the js output
    const c = `gzip -r -9 assets/js/dist`
    await execAsync(c)

  } catch (err) {
    console.log('BUILD FAILED')
    console.log(err)
  }
}

// Execute
buildProd()
