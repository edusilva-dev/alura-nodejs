function extractLinks(links) {
  return links.map(linkObj => Object.values(linkObj).join())
}

async function checkStatuses(urls) {
  const arrStatus = await Promise.all(
    urls.map(async url => {
      try {
        const response = await fetch(url)
        return `${response.status} - ${response.statusText}`
      } catch (error) {
        return manageErrors(error)
      }
    })
  )
  return arrStatus
}

function manageErrors(error) {
  if (error.cause.code === 'ENOTFOUND') {
    return 'Link não encontrado'
  }

  return 'Ocorreu algum erro'
}

export default async function listaValidada(arrLinks) {
  const links = extractLinks(arrLinks)
  const status = await checkStatuses(links)

  return arrLinks.map((linkObj, index) => ({
    ...linkObj,
    status: status[index]
  }))
}
