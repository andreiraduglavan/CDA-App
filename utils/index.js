export const joinIDs = (id1, id2) => {
  var arr = [id1, id2].sort()
  return arr.join('')
}

export const getPath = (adrress) => {

  return "images/"+adrress.split('%2F')[1].split('?')[0]
}

export const getTimeDiff = (date) => {
  var timeDiff = Math.round(Date.now()/1000)-date
  if(timeDiff>=604800) {
    return Math.round(timeDiff/604800)+'w'
  }
  else if(timeDiff>=86400) {
    return Math.round(timeDiff/86400)+'d'
  }
  else if(timeDiff>=3600) {
    return Math.round(timeDiff/3600)+'h'
  }
  else if(timeDiff>=60) {
    return Math.round(timeDiff/60)+'m'
  }
  else {
    return timeDiff+'s'
  }
}

export const getCategory = (category) => {
  switch(category) {
    case 'health':
      return 'Sănătate'
    case 'education':
      return 'Educație'
    case 'culture':
      return 'Artă și cultură'
    case 'environment':
      return 'Mediu și protecția animalelor'
    case 'human rights':
      return 'Drepturile omului'
    case 'social':
      return 'Social'
  }
}