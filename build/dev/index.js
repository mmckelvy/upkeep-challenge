const del = require('del')
const path = require('path')

const execAsync = require('../utils/exec-async')
const versionAssets = require('../version-assets')

/*
This function only deletes legacy assets and then strips any versions that might be present in file paths.  Should only need to run this after a prod build.
*/
async function buildDev() {
  try {
    const rootDir = process.cwd()

    // Clean out any existing dist files
    const assetDir = path.join(rootDir, 'assets')
    const deletedFiles = del.sync([
      path.join(assetDir, 'js/dist/*')
    ])

    console.log(`Deleted the following dist files: ${deletedFiles.join(', ')}`)

    // Revert asset paths to non-hashed format
    await versionAssets({env: 'development'})

  } catch (err) {
    console.log('BUILD FAILED')
    console.log(err)
  }
}

// Execute
buildDev()
