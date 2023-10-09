import fs from 'fs'
import chalk from 'chalk'

function extractLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
  const matches = [...text.matchAll(regex)]
  const results = matches.map(match => ({ [match[1]]: match[2] }))
  return results.length > 0 ? results : 'Não há links nesse arquivo!'
}

function manageError(error) {
  throw new Error(chalk.red(error.code, 'Não há arquivos no diretório!'))
}

export default async function getFile(filePath) {
  const encoding = 'utf-8'
  try {
    const texts = await fs.promises.readFile(filePath, encoding)
    return extractLinks(texts)
  } catch (error) {
    manageError(error)
  }
}
