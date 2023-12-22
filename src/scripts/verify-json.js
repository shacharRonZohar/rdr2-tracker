import fs from 'fs/promises'

const filePath = process.argv[2]

if (!filePath) throw new Error('No file path')
verify(filePath).catch((error) => {
  console.error(error)
  process.exit(1)
})

// {
//     "name": "Oleander Sage",
//     "locations": [
//       {
//         "name": "Bluewater Marsh",
//         "state": "Lemoyne",
//         "comments": ["Usually found on the outskirts of the swamp area"]
//       }
//     ],
//     "comments": ["Used to create poison weapons"]
//   },
async function verify(path) {
  const contents = JSON.parse(await fs.readFile(path, 'utf-8'))
  if (!isArrayWithLength(contents)) throw new Error('No contents')
  //  check if there are any duplicate names in the json, merging the comments and locations if there are, and removing the duplicate
  for (let i = 0; i < contents.length; i++) {
    for (let j = i + 1; j < contents.length; j++) {
      if (contents[i].name === contents[j].name) {
        contents[i].locations.push(contents[j].locations[0])
        contents[i].comments.push(contents[j].comments[0])
        contents.splice(j, 1)
      }
    }
  }
  //   check if there are any duplicate locations in the json, merging the comments if there are, and removing the duplicate
  for (let i = 0; i < contents.length; i++) {
    for (let j = 0; j < contents[i].locations.length; j++) {
      for (let k = j + 1; k < contents[i].locations.length; k++) {
        if (contents[i].locations[j].name === contents[i].locations[k].name) {
          contents[i].locations[j].comments.push(contents[i].locations[k].comments[0])
          contents[i].locations.splice(k, 1)
        }
      }
    }
  }
  await fs.writeFile(path, JSON.stringify(contents, null, 2))
  console.log('JSON verified')
  console.log(contents.length)
  await fs.writeFile(
    './src/assets/data/names.json',
    JSON.stringify(
      contents.map((content) => content.name),
      null,
      2
    )
  )
}

function isArrayWithLength(value) {
  return Array.isArray(value) && value.length > 0
}
