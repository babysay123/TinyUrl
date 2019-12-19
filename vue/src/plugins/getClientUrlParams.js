import Utils from './utils'

export default ($route, callback) => {
  try {
    const { query } = $route
    const userAgent = query['User-Agent']
    const sessionid = query['sessionid']
    const app = query['app']
    // const XRequestedWith = query['X-Requested-With']
    const { href } = location
    if (app) {
      Utils.Storage.save('fromApp', app)
      if (Utils.Storage.get('fromApp') === '1') {
        Utils.Storage.save('X-Requested-With', href.split('?')[1].split('&')[3].split('=')[1])
        // Utils.Storage.get('X-Requested-With-Vip-Level')
        // Utils.Storage.save('X-Requested-With-Test', '1')
      }
    }
    if (sessionid) {
      Utils.Storage.save('sessionid', sessionid)
    }
    // if (XRequestedWith) {
    //   Utils.XRequestedWith = XRequestedWith
    // }
    if (userAgent) {
      Utils.userAgent = userAgent
    }
    callback()
  } catch (error) {
    callback()
  }
}
