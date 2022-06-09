import { getValue } from '../config/RedisConfig'
const checkCode = async (key, value) => {
  const redisData = await getValue(key)
  console.log('redis', redisData, value)
  if (redisData != null) {
    if (redisData === value) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export {
  checkCode
}