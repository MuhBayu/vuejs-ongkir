import axios from 'axios'
const qs = require('qs')

let apiurl = 'http://localhost/project-folder/PHP/RajaOngkir.php'

export default {
  getCity () {
    return axios.get(apiurl + '?q=city')
  },
  getCost (params) {
    return axios.post(apiurl + '?q=cost', qs.stringify(params))
  }
}
