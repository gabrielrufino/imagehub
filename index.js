#!/usr/bin/env node

const { program } = require('commander')

const { name, version } = require('./package.json')

program
  .name(name)
  .version(version)
  .option('-o, --overwrite', 'Sobrescreve o arquivo da imagem processada')

program.parse(process.argv)

if (program.overwrite) {
  console.log('A imagem de origem será sobrescrita!')
}

