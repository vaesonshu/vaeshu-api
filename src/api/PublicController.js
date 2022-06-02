import svgCaptcha from 'svg-captcha'
class PublicController {
  constructor() { }
  async getCaptcha(ctx) {
    const body = ctx.request.query
    console.log(body.sid)
    const newCaptca = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      width: 150,
      height: 38,
      noise: Math.floor(Math.random() * 5)
    })
    console.log(newCaptca)
    ctx.body = {
      code: 200,
      data: newCaptca.data
    }
  }
}

export default new PublicController()