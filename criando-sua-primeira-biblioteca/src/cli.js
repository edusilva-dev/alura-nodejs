#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'
import getFile from './index.js'
import listaValidada from './http-validation.js'
import { getFlags } from './utils/get-flags.js'

const flags = getFlags(process.argv)

async function printList(validateFlag, result, fileName = '') {
  if (validateFlag) {
    console.log(
      chalk.yellow('Lista validada:'),
      chalk.black.bgGreen.bold.italic(fileName),
      await listaValidada(result)
    )
    return
  }

  console.log(chalk.yellow('Lista de links:'), chalk.black.bgGreen.bold.italic(fileName), result)
}

async function processFiles() {
  const path = flags.find(flag => flag.flag === '-p' || flag.flag === '--path')
  const validateLinks = flags.find(flag => flag.flag === '-vl' || flag.flag === '--validate-links')

  try {
    fs.lstatSync(path?.value)
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(chalk.red('Arquivo ou diretório não existe'))
      return
    }
  }

  if (fs.lstatSync(path?.value).isFile()) {
    const result = await getFile(path?.value)
    printList(validateLinks, result)
    return
  }

  if (fs.lstatSync(path?.value).isDirectory()) {
    const arquivos = await fs.promises.readdir(path?.value)
    arquivos.forEach(async nomeDoArquivo => {
      const result = await getFile(`${path?.value}/${nomeDoArquivo}`)
      printList(validateLinks, result, nomeDoArquivo)
    })
  }
}

processFiles()
