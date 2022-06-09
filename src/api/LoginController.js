import send from '../config/MailConfig.js'
import bcrypt from 'bcrypt'
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
    // 接受客户端的数据
    const { body } = ctx.request
    console.log('body', body)
    // 验证图片验证码的时效性、正确性
    let sid = body.sid
    let code = body.code
    let msg = {}
    console.log('code', code._value)
    let result = await checkCode(sid, code._value)
    let check = true
    if(result) {
      // mongodb查库
      let user1 = await User.findOne({username: body.username._value})
      console.log('user1', user1)
      if(user1 != null && typeof user1.username !== 'undefined') {
        msg.username = ['此邮箱已经注册，可以通过邮箱找回密码']
        check = false
      }
      // let user2 = await User.findOne({name: body.name._value})
      // if(user2 != null && typeof user2.name !== 'undefined') {
      //   msg.username = ['此昵称已经被注册，请修改']
      //   check = false
      // }
      // 写入数据到数据库
      if(check) {
        body.password._value = await bcrypt.hash(body.password._value, 5)
        let user = new User({
          username: body.username._value,
          name: body.name._value,
          password: body.password._value,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        let result = await user.save()
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
        return
      }
    }
  }

  async login (ctx) {
    // 接受用户的数据
    // 验证图片验证码的时效性、正确性
 
    // 返回token
    const { body } = ctx.request
    let sid = body.sid
    let code = body.code
    console.log('code', code._value)
    let result = await checkCode(sid, code._value)
    console.log('result', result)
    if(result) {
      // 验证用户账号密码是否正确
      let checkUserPassword = false
      // mongodb查库
      let user = await User.findOne({username: body.username._value})
      console.log('user', user)
      if(user.password === body.password._value) {
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