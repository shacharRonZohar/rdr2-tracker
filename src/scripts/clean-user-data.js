import fs from 'fs/promises'

const filePath = process.argv[2]

if (!filePath) throw new Error('No file path')

clean(filePath)
async function clean(path) {
  const fileContents = JSON.parse(await fs.readFile(path, 'utf-8'))
  if (!fileContents) throw new Error('No contents')
  for (const key in fileContents) {
    fileContents[key] = fileContents[key].map(({ id, trackerValues }) => {
      return {
        id,
        trackerValues
      }
    })
  }
  await fs.writeFile(path, JSON.stringify(fileContents, null, 2))
}

function isArrayWithLength(value) {
  return Array.isArray(value) && value.length > 0
}
