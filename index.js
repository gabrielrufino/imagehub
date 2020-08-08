const { program } = require('commander')

const { name, version } = require('./package.json')

program
  .name(name)
  .version(version)

program.parse(process.argv)

