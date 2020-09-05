const { program } = require('commander')
const sharp = require('sharp')
const fs = require('fs')
const ora = require('ora')

module.exports = (file, { width, height }) => {
  const loading = ora('Redimensionando imagem')
  loading.start()

  const options = JSON.parse(JSON.stringify({ width, height }))

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
