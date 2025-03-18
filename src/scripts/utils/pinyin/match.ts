import { getPinYinOfString } from '@/scripts/utils/pinyin/pinyin'

/**
 * 使用指定的模式匹配拼音
 * @param input 被匹配的内容
 * @param pattern 要匹配的模式
 * @param pinyin 手动设置内容的拼音
 * @returns 返回包含所有匹配起止位置的数组，如果不匹配则返回空数组
 */
export function matchPinYin(input: string, pattern: string, pinyin = getPinYinOfString(input)) {
    const result = [] as PinYinMatch[]
    if (pattern.length) {
        pattern = pattern.toLowerCase()
        for (let i = 0; i < input.length; i++) {
            const match = getMatch(i, 0)
            if (match) {
                result.push(match)
                i = match.end - 1
            }
        }
    }
    return result

    function getMatch(charIndex: number, patternIndex: number): PinYinMatch | null {
        if (patternIndex === pattern.length) {
            return {
                start: charIndex,
                end: charIndex,
                exactMatchCount: 0,
            }
        }
        if (charIndex < input.length) {
            if (toLower(input.charCodeAt(charIndex)) === pattern.charCodeAt(patternIndex)) {
                const match = getMatch(charIndex + 1, patternIndex + 1)
                if (match) {
                    match.start = charIndex
                    match.exactMatchCount++
                }
                return match
            }
            for (const item of pinyin[charIndex]) {
                let matchCount = 0
                while (matchCount < item.length && patternIndex + matchCount < pattern.length && item.charCodeAt(matchCount) === pattern.charCodeAt(patternIndex + matchCount)) {
                    const match = getMatch(charIndex + 1, patternIndex + matchCount + 1)
                    if (match) {
                        match.start = charIndex
                        return match
                    }
                    matchCount++
                }
            }
        }
        return null
    }

    function toLower(code: number) {
        return code <= 90 && code >= 65 ? code | 32 : code
    }
}

/** 表示一个拼音匹配项 */
export interface PinYinMatch {
    /** 匹配项在源字符串中的开始索引（从 0 开始）*/
    start: number
    /** 匹配项在源字符串中的结束索引（从 0 开始）*/
    end: number
    /** 精确匹配的字符数 */
    exactMatchCount: number
}
