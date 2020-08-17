#!/usr/bin/env node

const { program } = require('commander')
const sharp = require('sharp')
const fs = require('fs')

const { name, version } = require('./package.json')

program
  .name(name)
  .version(version)
  .option('-o, --overwrite', 'Sobrescreve o arquivo da imagem processada')

program
  .command('resize <file>')
  .option('--width <width>', 'Largura da imagem processada')
  .option('--height <height>', 'Altura da imagem processada')
  .description('Redimensiona uma imagem')
  .action((file, commandObject) => {
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
  })

program.parse(process.argv)
