const { program } = require('commander')
const sharp = require('sharp')
const fs = require('fs')

module.exports = (file, commandObject) => {
  const width = Number(commandObject.width) || undefined
  const height = Number(commandObject.height) || undefined

  const options = { width, height }

  Object
    .keys(options)
    .forEach(key => options[key] === undefined && delete options[key])

  const resized = sharp(file).resize(options)

  if (program.overwrite) {
    resized
      .toBuffer()
      .then(buffer => {
        fs.writeFile(file, buffer, () => {
          console.log('Imagem redimensionada')
        })
      })
  } else {
    resized
      .toFile(`imagehub-${file}`)
      .then(() => {
        console.log(`Imagem redimensionada!`)
      })
  }
}
