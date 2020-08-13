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
  .description('Redimensiona uma imagem')
  .action(file => {
    const resized = sharp(file).resize({ width: 50 })

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
