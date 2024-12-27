import { KEYUTIL, KJUR, hextob64 } from 'jsrsasign'
import { http } from '@/scripts/http'

export const getPublicKey = async () => {
    const { data } = await http.get('/usercenter/user/readRsa')
    return KEYUTIL.getKey(data)
}
/**
 * 加密数据
 */
export const encrypt = async (data: string) => {
    const publicKey = await getPublicKey()
    const enc = KJUR.crypto.Cipher.encrypt('0000' + data, publicKey)
    const encrypted = hextob64(enc)
    // console.log('encrypted :>> ', encrypted)
    return encrypted
}
