const debug = process.env.NODE_ENV !== 'production'
const name = 'team3d'

module.exports = {
  assetPrefix: !debug ? `/${name}/` : '',
}