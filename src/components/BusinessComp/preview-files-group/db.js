import { isNoData, formatDate, formatDateTime } from './utils'

/** 数据库版本 */
const dbVersion = 1
/** 数据库名称 */
const dbName = 'MyDatabaseFilesPreview'

const CACHE_DATEKEY = 'db_cache_date_filepreview'
/** 间隔1天检查缓存 */
const ONE_DAY = 1000 * 60 * 60 * 24
/** 日期索引名 */
const IDX_NAME = 'indexDate'
/** 文件预览表 */
export const tableNameFilePreview = 'CacheDataFilePreview'
/** 图片配置表 */
export const tableNameImgConfig = 'ImgViewConfig'

const ENV_RUN = ['prod', 'production'].includes(process.env.VUE_APP_ENV) ? 'prod' : 'dev'

/** 默认缓存天数-预览文件列表 */
const CACHE_DAYS_FILEGDATA = 1
/** 默认缓存天数-图片预览配置 */
const CACHE_DAYS_IMGCONFIG = 10
/** （开发测试）默认缓存天数-预览文件列表 */
const CACHE_DAYS_FILEGDATA_DEV = 1
/** （开发测试）默认缓存天数-图片预览配置 */
const CACHE_DAYS_IMGCONFIG_DEV = 1 / 24 / 12

const getCacheDays = (day, devDay) => {
    return isNoData(day) ? devDay : day
}
/** 获取运行环境配置 */
const getEnvConfig = (params = {}) => {
    const { cacheDaysData, cacheDaysImgConfig, cacheDaysDataDev, cacheDaysImgConfigDev } = params
    /**
     * today 当前日期
     * diffFile 文件数据清理间隔天数
     * diffImg 图片配置数据清理间隔天数
     * */
    const envConfig = {
        /** 生产环境配置，每天检查缓存 */
        prod: {
            today: formatDate(),
            diffFile: ONE_DAY * getCacheDays(cacheDaysData, CACHE_DAYS_FILEGDATA),
            diffImg: ONE_DAY * getCacheDays(cacheDaysImgConfig, CACHE_DAYS_IMGCONFIG),
        },
        /** 开发测试配置，每分钟检查缓存 */
        dev: {
            today: formatDateTime(),
            diffFile: ONE_DAY * getCacheDays(cacheDaysDataDev, CACHE_DAYS_FILEGDATA_DEV),
            diffImg: ONE_DAY * getCacheDays(cacheDaysImgConfigDev, CACHE_DAYS_IMGCONFIG_DEV),
        },
    }
    return envConfig[ENV_RUN]
}

/** 数据库对象 */
export class FilePreviewDB {
    request = null
    cacheConfig = {}
    constructor(params = {}) {
        this.request = indexedDB.open(dbName, dbVersion)
        this.initDb(params)
    }
    initDb(params = {}) {
        const { success, onLoadFile, storeKey, onUpgrad = () => {}, onCacheFileGroupData } = params
        this.cacheConfig = getEnvConfig(params)
        this.request.onsuccess = () => {
            // console.log('----------------数据库onsuccess------------------')
            const db = this.request.result
            const { today } = this.cacheConfig
            if (localStorage.getItem(CACHE_DATEKEY) !== today) {
                localStorage.setItem(CACHE_DATEKEY, today)
                this.clearExpiredData(db, tableNameFilePreview)
                this.clearExpiredData(db, tableNameImgConfig)
            }
            const cbParams = { db }
            success?.(cbParams)
            if (onCacheFileGroupData) {
                const store = db.transaction(tableNameFilePreview, 'readwrite').objectStore(tableNameFilePreview)
                onCacheFileGroupData({
                    store,
                    keyPath: 'storeKey',
                    today: today,
                })
            }
            if (onLoadFile) {
                const store = db.transaction(tableNameFilePreview, 'readwrite').objectStore(tableNameFilePreview)
                store.get(storeKey).onsuccess = data => {
                    onLoadFile(data.target.result?.fileGroup)
                }
            }
        }
        this.request.onupgradeneeded = () => {
            console.log('数据库版本变更！！！！！！！')
            onUpgrad()
            const db = this.request.result
            // 删除所有的对象存储空间
            db.objectStoreNames.forEach(function(objectStoreName) {
                db.deleteObjectStore(objectStoreName)
            })
            /** 创建存储空间-文件 */
            db.createObjectStore(tableNameFilePreview, {
                keyPath: 'storeKey',
            }).createIndex(IDX_NAME, 'date', { unique: false })
            /** 创建存储空间-图片设置 */
            db.createObjectStore(tableNameImgConfig, {
                keyPath: 'storeKey',
            }).createIndex(IDX_NAME, 'date', { unique: false })
            console.log('创建存储空间成功')
        }
    }
    /** 缓存图片配置 */
    addImgConfig({ storeKey, config }) {
        const db = this.request.result
        const store = db.transaction(tableNameImgConfig, 'readwrite').objectStore(tableNameImgConfig)
        store.put({
            storeKey,
            config,
            date: this.cacheConfig.today,
        }).onsuccess = () => {
            // console.log('图片配置数据写入成功!!!!!!!!!')
        }
    }
    getImgConfig(storeKey) {
        return new Promise((resolve, reject) => {
            const store = this.request.result.transaction(tableNameImgConfig, 'readwrite').objectStore(tableNameImgConfig)
            store.get(storeKey).onsuccess = data => {
                resolve(data.target.result?.config)
            }
        })
    }
    /** 删除过时信息 */
    clearExpiredData(db, tableName) {
        console.log('检查缓存不同', tableName)
        // 创建一个事务并获取对象存储空间
        const store = db.transaction(tableName, 'readwrite').objectStore(tableName)
        // 获取索引
        const index = store.index(IDX_NAME)
        // 使用openCursor()方法创建游标
        const cursorRequest = index.openCursor()
        const { today, diffFile, diffImg } = this.cacheConfig
        const diff = tableName === tableNameFilePreview ? diffFile : diffImg
        cursorRequest.onsuccess = function(event) {
            const cursor = event.target.result
            if (!cursor) return
            // 对当前游标所指向的数据项执行操作
            const { storeKey, date } = cursor.value
            // 超过指定间隔时间后删除数据库对象
            if (Math.abs(new Date(today) - new Date(date)) >= diff) {
                store.delete(storeKey)
            }
            // 继续遍历下一个数据项
            cursor.continue()
        }
    }
}

/** 清空数据库表 */
export const clearDb = () => {
    // 打开数据库
    const request = indexedDB.open(dbName)
    request.onerror = function(event) {
        console.error('数据库打开失败:', event)
    }
    request.onsuccess = function(event) {
        const db = event.target.result
        const clearStore = storeName => {
            // 开启一个读写事务
            const transaction = db.transaction(storeName, 'readwrite')
            // 获取对象存储
            const objectStore = transaction.objectStore(storeName)
            // 清空对象存储
            const clearRequest = objectStore.clear()
            clearRequest.onsuccess = function(event) {
                console.log('对象存储清空成功', storeName)
            }
            clearRequest.onerror = function(event) {
                console.error('对象存储清空失败:', storeName)
            }
        }
        clearStore(tableNameFilePreview)
        clearStore(tableNameImgConfig)
    }
}

/** 删除数据库 */
export const removeDb = () => {
    const request = indexedDB.deleteDatabase(dbName)
}
