import svgCaptcha from 'svg-captcha'
import { getValue, setValue } from '../config/RedisConfig'
class PublicController {
  constructor() { }
  async getCaptcha(ctx) {
    const body = ctx.request.query
    console.log('body.sid' ,body.sid)
    
    const newCaptca = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      width: 150,
      height: 38,
      noise: Math.floor(Math.random() * 5)
    })
    console.log('newCaptca' ,newCaptca)
    // 设置图片验证码超时时间10分钟 单位s
    setValue(body.sid, newCaptca.text, 10 * 60)
    ctx.body = {
      code: 200,
      data: newCaptca.data
    }
  }
}

export default new PublicController()