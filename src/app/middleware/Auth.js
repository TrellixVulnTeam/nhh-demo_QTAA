
const { TRUE } = require("node-sass");
const jwtUtil = require("../util/jwt");
const User = require('../../model/User')



let isAuth = async (req, res, next) => {
  // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
  const accessTokenSecret = process.env.secret
  const accessRefreshSecret = process.env.secretRefresh
  const refreshTokenLife = process.env.tokenRefreshLife
  const tokenLife = process.env.tokenLife


  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.signedCookies['auth-token'];
  const tokenRefreshFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.signedCookies['auth-refresh-token'];

  if (tokenFromClient && tokenRefreshFromClient) {
    // Nếu tồn tại token
    try {
      const refreshDecoded = await jwtUtil.verifyToken(tokenRefreshFromClient, accessRefreshSecret,{ ignoreExpiration: true})
      const expNow = Math.floor(Date.now() /1000)
      if (refreshDecoded.exp < expNow){
        return res.redirect('auth/login')
      }
      const decoded = await jwtUtil.verifyToken(tokenFromClient, accessTokenSecret, { ignoreExpiration: true })
      if (decoded.exp < expNow){
        const accessToken = await jwtUtil.generateToken({ username: decoded.data.username }, accessTokenSecret, tokenLife )
        res.cookie('auth-token', accessToken, { signed: true })
      }
      next()
    }
    catch (error) {
      return res.json({error})
    }

  } else {
    // Không tìm thấy token trong request
    res.clearCookie('auth-token')
    res.clearCookie('auth-refresh-token')
    return res.redirect('auth/login')
  }
}

module.exports = {
  isAuth: isAuth,
};