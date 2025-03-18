
# 汉字转拼音
查询汉字对应的拼音

```html demo doc hide
<input type="text" id="input" placeholder="输入中文" value="中文" />
<button onclick="input.value = getPinYin(input.value).map(x=>x.join('|')).join(' ')">转为拼音</button>
```

> ##### (!)仅支持简体中文
> - 如果需要支持繁体参考[[util/pinyin/pinyin-gbk]]
> - 如果需要支持音调和多音字自动识别请参考 [Node: Pinyin](https://www.npmjs.com/package/pinyin) 或 [Node: fast-pinyin](https://www.npmjs.com/package/fast-pinyin)

> ##### (i)实现原理
> 在源码中有一个拼音检索表，函数会检索此表查询拼音

# 拼音模糊搜索
模糊搜索匹配项，支持全拼和简拼搜索

```html demo hide doc
<textarea id="input_match" placholder="输入所有项，一行一个。">你好
你好啊
很好
</textarea>
<input type="search" id="search_match" placeholder="输入搜索的内容" value="nih" oninput="output.innerHTML = searchPinYin(input_match.value.split('\n'), search_match.value).map(item => item.result).join('<br>')" />
<button type="button" onclick="search_match.oninput()">搜索</button>
<div id="output"></div>
```
```js demo
import { matchPinYin } from "./match"
import { searchPinYin } from "./search"
window.matchPinYin = matchPinYin
window.searchPinYin = searchPinYin
```