#!/usr/bin/env node

const { program } = require('commander')

const resize = require('./commands/resize')
const { name, version } = require('../package.json')

program
  .name(name)
  .version(version)
  .option('-o, --overwrite', 'Sobrescreve o arquivo da imagem processada')

program
  .command('resize <file>')
  .option('--width <width>', 'Largura da imagem processada')
  .option('--height <height>', 'Altura da imagem processada')
  .description('Redimensiona uma imagem')
  .action(resize)

program.parse(process.argv)
