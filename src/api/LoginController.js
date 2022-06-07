import send from '../config/MailConfig.js'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/index'
import { checkCode } from '../common/Utils'
import User from '../model/User'
class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request
    try {
      let result = await send({
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Boy'
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (e) {
      console.log(e)
    }
  }

  async reg(ctx) {
    
  }

  async login (ctx) {
    // 接受用户的数据
    // 验证图片验证码的时效性、正确性
 
    // 返回token
    const { body } = ctx.request
    let sid = body.sid
    let code = body.code
    let result = await checkCode(sid, code)
    if(result) {
      // 验证用户账号密码是否正确
      let checkUserPassword = false
      // mongodb查库
      let user = await User.findOne({username: body.username})
      if(user.password === body.password) {
        checkUserPassword = true
      }
      if(checkUserPassword) {
        // 验证通过 返回Token数据
        let token = jsonwebtoken.sign({ _id: 'brian'}, config.JWT_SECRET, {
          expiresIn: '1d'
        })
        ctx.body = {
          code: 200,
          token: token
        }
      } else {
        // 用户名、密码验证失败
        ctx.body = {
          code: 404,
          msg: '用户名或者密码错误'
        }
      }
    } else {
      // 图片验证码校验失败
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确，请重新输入'
      }
    }
   
  }
}

export default new LoginController()