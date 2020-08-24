const { program } = require('commander')
const sharp = require('sharp')
const fs = require('fs')
const ora = require('ora')

module.exports = (file, commandObject) => {
  const loading = ora('Redimensionando imagem')
  loading.start()

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
          loading.succeed('Imagem redimensionada')
        })
      })
      .catch(() => {
        loading.fail('Imagem não redimensionada')
      })
  } else {
    resized
      .toFile(`imagehub-${file}`)
      .then(() => {
        loading.succeed('Imagem redimensionada')
      })
      .catch(() => {
        loading.fail('Imagem não redimensionada')
      })
  }
}
