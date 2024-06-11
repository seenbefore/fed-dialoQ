### 组件说明
* 目前只支持pdf和图片类型文件预览，如有其它类型文件要求可以手动添加容器组件
* 缓存使用网页数据库功能，针对缓存已经做了定时清理功能，但是仍需注意缓存大小
* 如果以iframe形式嵌入可能会产生跨域问题，可以通过父页面window.open嵌入iframe的方式解决
  
### 组件属性
| 参数 | 说明 | 类型 | 默认值 |
| :-: | :-: | :-: | :-: |
| fileGroup | 预览数据 | Arrary | [] |
| fileIndex | 预览文件下标 | Arrary | [0, 0] |
| showClose | 是否可以关闭 | Boolean | false |
| load | 文件资源src加载方法，当文件数据src为空的时候调用 | Function | null |  |
| useDb | 是否使用数据库缓存 | Boolean | false |
| dbConfig | 数据库配置，详情看下方介绍 | Object | {} |

#### dbConfig
| 参数 | 说明 | 类型 | 默认值 |
| :-: | :-: | :-: | :-: |
| cacheDaysData | 缓存天数-预览文件列表 | Number | 1天 |
| cacheDaysImgConfig | 缓存天数-图片预览配置 | Number | 10天 |
| cacheDaysDataDev | （开发测试用）缓存天数-预览文件列表 | Number | 1天 |
| cacheDaysImgConfigDev | （开发测试用）缓存天数-图片预览配置 | Number | 5分钟（1 / 24 / 12 |

### FilePreviewDB 对象构造参数
| 参数 | 说明 | 类型 |
| :-: | :-: | :-: |
| storeKey | 数据库缓存索引，根据storeKey获取缓存的数据 | String |
| success | 成功打开数据库回调函数 | Function |
| onLoadFile | 获取数据库缓存文件列表回调函数 | Function |
| onUpgrad | 数据库版本变动回调函数，数据库版本变动清空所有文件配置数据 | Function |
| onCacheFileGroupData | 成功缓存需要预览的文件列表数据回调函数 | Function |