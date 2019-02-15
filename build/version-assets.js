const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid/v4')

// Promise wrapper over fs.rename
function fsRenameAsync(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        return reject(err)
      }
      resolve() // Updates the actual file
    })
  })
}

// Promise wrapper over fs.readFile
function fsReadFileAsync(filePath, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, options, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

/*
@param: string | str -- The string to update.
@param: string | newVersion -- The new version hash.
@param: string | requestPath -- The request path as written in index.html.

@return: string | The same htmlString with an updated version in the requestPath
*/
function replaceString(str, newVersion, requestPath) {
  const { name, ext } = path.parse(requestPath)

  // Construct a regex to accommodate hashes in the asset paths
  const regEx = new RegExp(`${name}(?:\\.\\w+)?\\${ext}`)

  // Replace the old filename with the new hash
  return str.replace(regEx, (match) => {
    // Split out the pieces
    const pieces = match.split('.')

    // We have an existing hash (e.g. 'base.32423.js') and a new version
    // Going from prod mode to prod mode
    if (pieces.length === 3 && newVersion) {
      // Set the hash to the new version
      pieces[1] = newVersion

     // We have an existing hash but NO new version
    // Going from prod mode to dev mode
    } else if (pieces.length === 3) {
    // Remove the hash piece
    pieces.splice(1, 1)

    // We have a newVersion but no existing hash
    // Dev mode to prod mode (prod built first time)
    } else if (newVersion) {
      // Add in the newVersion
      pieces[2] = pieces[1]
      pieces[1] = newVersion
    }

    // Return the new string
    return pieces.join('.')
  })
}

async function renameFile(newVersion, requestPath) {
  // Actual root directory of asset files to be versioned.
  const oldPath = path.join(process.cwd(), 'assets', requestPath)
  const newPath = replaceString(oldPath, newVersion, requestPath)

  // Rename the file
  return fsRenameAsync(oldPath, newPath)
}

/*
Main function

Assumes this script is run from root
@param: string | env -- 'production' or 'development'
*/
module.exports = async function versionAssets({ env }) {
  // Path to index.html relative to this directory
  const htmlFilePath = path.join(process.cwd(), 'views/index.html')

  // Base asset paths as seen in index.html
  const assetRequestPaths = [
    '/js/dist/modules.css',
    '/js/dist/bundle.js'
  ]

  // Create a random string for the new version number in prod
  const newVersion = env === 'production'
    ? uuidv4().split('-').pop()
    : null

  // Get the index.html html string to kick things off
  const htmlString = await fsReadFileAsync(htmlFilePath, 'utf8')

  // Start processing things
  try {
    // Update each request path in the html
    const updatedHtml = assetRequestPaths.reduce((acc, reqPath) => {
      return replaceString(acc, newVersion, reqPath)
    }, htmlString)

    // Update each filename if we are in prod
    if (env === 'production') {
      for (const reqPath of assetRequestPaths) {
        // Add the version to the file reqPath if necessary
        await renameFile(newVersion, reqPath)
      }
    }

    // Update the index.html file with the updated filenames
    fs.writeFile(htmlFilePath, updatedHtml, function(err) {
      if (err) {
        return console.log('Error writing file')
      }

      console.log('Versions successfully updated')
    })

  } catch (err) {
    console.log(err)
    console.log('SCRIPT FAILED')
  }
}
