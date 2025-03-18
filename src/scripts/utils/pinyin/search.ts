import { encodeHTML } from '@/scripts/utils/html/html'
import { matchPinYin, PinYinMatch } from '@/scripts/utils/pinyin/match'
import { getPinYinOfString } from '@/scripts/utils/pinyin/pinyin'

/**
 * 模糊搜索一个列表（支持拼音）
 * @param inputs 被搜索的所有列表项
 * @param search 要搜索的内容
 * @param markStart 用于标记匹配开始的标记
 * @param markEnd 用于标记匹配结束的标记
 * @param encoder 用于编码源内容的回调函数。源内容被编码后可以避免将内容和匹配标记混淆
 * @param cache 如果提供了缓存对象则可以加速第二次搜索的速度
 * @return 返回所有的匹配项组成的数组，每个匹配项是一个包含所有匹配起止位置的数组
 * @example searchPinYin(["ab", "b"], "a") // [ {r: "<mark>a</mark>b", index: 0, length: 1, 0: {start: 0, end: 1, level: 1}} ]
 */
export function searchPinYin(inputs: string[], search: string, markStart = '<mark>', markEnd = '</mark>', encoder = encodeHTML, cache?: { [key: string]: any }) {
    search = search.trim().toLowerCase()
    const result: (PinYinMatch[] & {
        /** 当前匹配项在源列表的索引 */
        index: number
        /** 当前匹配项最终拼接后的文本内容 */
        result: string
    })[] = []
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        // const match = matchPinYin(input, search, cache ? cache[input] ??= getPinYinOfString(input) : undefined) as typeof result[0]
        const match = matchPinYin(input, search, cache ? (cache[input] ? cache[input] : getPinYinOfString(input)) : undefined) as typeof result[0]
        if (match.length) {
            match.index = i
            match.result = formatMatch(input, match, markStart, markEnd, encoder)
            result.push(match)
        }
    }
    result.sort((x, y) => x[0].start - y[0].start || y[0].end - x[0].end || y[0].exactMatchCount - x[0].exactMatchCount || y.length - x.length)
    return result
}

/**
 * 格式化匹配结果为一个字符串
 * @param input 被匹配的内容
 * @param matchResult 包含所有匹配起止位置的数组
 * @param markStart 用于标记匹配开始的标记
 * @param markEnd 用于标记匹配结束的标记
 * @param encoder 用于编码源内容的回调函数。源内容被编码后可以避免将内容和匹配标记混淆
 * @return 返回拼接后的文本内容
 * @example formatMatch("ab", [{start: 0, end: 1, level: 1}]) // "<mark>a</mark>b"
 */
export function formatMatch(input: string, matchResult: PinYinMatch[], markStart = '<mark>', markEnd = '</mark>', encoder = encodeHTML) {
    for (let i = matchResult.length; i-- > 0; ) {
        const match = matchResult[i]
        input =
            encoder(input.substring(0, match.start)) +
            markStart +
            encoder(input.substring(match.start, match.end)) +
            markEnd +
            (i === matchResult.length - 1 ? encoder(input.substring(match.end)) : input.substring(match.end))
    }
    return input
}
