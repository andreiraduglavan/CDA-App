import health from './health.jpg'
import education from './education.jpg'
import culture from './culture.jpg'
import environment from './environment.jpg'
import humanRights from './human rights.jpg'
import social from './social.jpg'

export const getImage = (keyword) => {
  switch(keyword) {
    case 'health':
      return health
    case 'education':
      return education
    case 'culture':
      return culture
    case 'environment':
      return environment
    case 'human rights':
      return humanRights
    case 'social':
      return social
  }
}