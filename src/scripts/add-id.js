import fs from 'fs/promises'

const filePath = process.argv[2]

if (!filePath) throw new Error('No file path')
addId(filePath).catch((error) => {
  console.error(error)
  process.exit(1)
})
async function addId(path) {
  const contents = JSON.parse(await fs.readFile(path, 'utf-8'))
  if (!isArrayWithLength(contents)) throw new Error('No contents')
  const newContents = contents.map((content, index) => ({
    id: index + 1,
    ...content,
    locations: content.locations.map((location, index) => ({ id: index + 1, ...location }))
  }))
  await fs.writeFile(path, JSON.stringify(newContents, null, 2))
}

function isArrayWithLength(value) {
  return Array.isArray(value) && value.length > 0
}
