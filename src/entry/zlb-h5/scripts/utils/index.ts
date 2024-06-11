const ua = navigator.userAgent
const { __wxjs_environment } = window

/* 环境判断 */
export const EXECUTE_ENV_JUDGE = {
    isZLB: () => ua.toLowerCase().includes('dtdreamweb'),
    isWX: () => ua.toLowerCase().includes('miniprogram/wx') || __wxjs_environment === 'miniprogram' || ua.indexOf('MicroMessenger') !== -1,
    isZFB: () => (ua.toLowerCase().includes('alipay') && ua.toLowerCase().includes('miniprogram')) || ua.indexOf('AlipayClient') !== -1,
}
