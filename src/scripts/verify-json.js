import fs from 'fs/promises'

const filePath = process.argv[2]
// const key = process.argv[3]
if (!filePath) throw new Error('No file path')
// if (!key) throw new Error('No key')
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
  // go over the json and validate the schema, adding placehoder comments if they are missing, here is an example of the schema:
  // {
  //   "name": "Alaskan Ginseng",
  //   "locations": [
  //     {
  //       "id": 1,
  //       "name": "Placeholder Location",
  //       "state": "Placeholder State",
  //       "comments": ["Placeholder comment"]
  //     }
  //   ],
  //   "comments": ["Placeholder comment"]
  // },

  for (let i = 0; i < contents.length; i++) {
    // const currContent = contents[i]
    if (!contents[i].name) {
      contents[i] = { name: contents[i] }
      // contents[i].name = 'Placeholder Name'
    }
    // const newContent = { name: currContent.name }
    if (!isArrayWithLength(contents[i].locations)) {
      contents[i].locations = [
        {
          name: 'Placeholder Location',
          state: 'Placeholder State',
          comments: ['Placeholder comment']
        }
      ]
    }
    if (!isArrayWithLength(contents[i].comments)) contents[i].comments = ['Placeholder comment']
    for (let j = 0; j < contents[i].locations.length; j++) {
      if (!contents[i].locations[j].name) {
        contents[i].locations[j].name = 'Placeholder Location'
      }
      if (!contents[i].locations[j].state) {
        contents[i].locations[j].state = 'Placeholder State'
      }
      if (!isArrayWithLength(contents[i].locations[j].comments)) {
        contents[i].locations[j].comments = ['Placeholder comment']
      }
    }
  }
  //  check if there are any duplicate names in the json, merging the comments and locations if there are, and removing the duplicate
  // for (let i = 0; i < contents.length; i++) {
  //   for (let j = i + 1; j < contents.length; j++) {
  //     if (contents[i].name === contents[j].name) {
  //       contents[i].locations.push(contents[j].locations[0])
  //       contents[i].comments.push(contents[j].comments[0])
  //       contents.splice(j, 1)
  //     }
  //   }
  // }
  //   check if there are any duplicate locations in the json, merging the comments if there are, and removing the duplicate
  // for (let i = 0; i < contents.length; i++) {
  //   for (let j = 0; j < contents[i].locations.length; j++) {
  //     for (let k = j + 1; k < contents[i].locations.length; k++) {
  //       if (contents[i].locations[j].name === contents[i].locations[k].name) {
  //         contents[i].locations[j].comments.push(contents[i].locations[k].comments[0])
  //         contents[i].locations.splice(k, 1)
  //       }
  //     }
  //   }
  // }
  await fs.writeFile(path, JSON.stringify(contents, null, 2))
  console.log('JSON verified')
  console.log(contents.length)
  await fs.writeFile(filePath, JSON.stringify(contents, null, 2))
}

function isArrayWithLength(value) {
  return Array.isArray(value) && value.length > 0
}
