#!/usr/bin/env node

const { program } = require('commander')
const sharp = require('sharp')

const { name, version } = require('./package.json')

program
  .name(name)
  .version(version)
  .option('-o, --overwrite', 'Sobrescreve o arquivo da imagem processada')

program
  .command('resize <file>')
  .description('Redimensiona uma imagem')
  .action(file => {
    sharp(file)
      .resize({ width: 50 })
      .toFile(`imagehub-${file}`)
      .then(() => {
        console.log(`Imagem redimensionada!`)
      })
  })

program.parse(process.argv)

if (program.overwrite) {
  console.log('A imagem de origem será sobrescrita!')
}

