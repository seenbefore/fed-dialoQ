## 数据库管理
### 功能：数据库管理
菜单路径：系统管理/数据库管理
功能描述：管理系统中的数据库连接、表结构和数据操作。

查询条件：
1. "数据库名称"：输入框，placeholder为"请输入数据库名称"
2. "连接状态"：下拉单选，选项：全部、已连接、未连接，默认全部
3. "创建时间"：日期范围选择器，placeholder为"请选择创建时间范围"
4. "数据库类型"：下拉单选，选项：全部、MySQL、PostgreSQL、Oracle、SQLServer，默认全部

功能点：
1. "新增"：点击后显示"新增数据库连接"弹窗
2. "编辑"：点击后显示"编辑数据库连接"弹窗
3. "删除"：点击后显示删除确认弹窗
4. "测试连接"：点击后测试数据库连接是否正常
5. "查看表结构"：点击后进入表结构管理页面
6. "导出结构"：点击后导出数据库表结构文档

列表展示数据项：
1. "序号"：序号
2. "数据库名称"：数据库连接名称
3. "数据库类型"：数据库类型（MySQL/PostgreSQL/Oracle/SQLServer）
4. "主机地址"：数据库服务器地址
5. "端口"：数据库端口号
6. "用户名"：数据库连接用户名
7. "连接状态"：连接状态（已连接/未连接）
8. "创建时间"：创建时间，精确到年月日时分
9. "最后连接时间"：最后一次成功连接时间
10. "操作"：包含"编辑"、"删除"、"测试连接"、"查看表结构"、"导出结构"按钮

### 功能：新增/编辑数据库连接
页面类型：弹窗
功能描述：新增或编辑数据库连接信息

表单字段：
1. "数据库名称"：输入框，必填，最大长度50字符
2. "数据库类型"：下拉单选，必填，选项：MySQL、PostgreSQL、Oracle、SQLServer
3. "主机地址"：输入框，必填，placeholder为"请输入主机地址"
4. "端口号"：数字输入框，必填，placeholder为"请输入端口号"
5. "数据库名"：输入框，必填，placeholder为"请输入数据库名"
6. "用户名"：输入框，必填，placeholder为"请输入用户名"
7. "密码"：密码输入框，必填，placeholder为"请输入密码"
8. "备注"：多行文本框，选填，最大长度200字符

操作：
1. "测试连接"：测试数据库连接是否正常
2. "确定"：保存数据库连接信息
3. "取消"：关闭弹窗

### 功能：表结构管理
菜单路径：系统管理/数据库管理/表结构管理
功能描述：查看和管理数据库中的表结构信息

查询条件：
1. "表名"：输入框，placeholder为"请输入表名"
2. "创建时间"：日期范围选择器

功能点：
1. "刷新"：刷新表结构信息
2. "导出文档"：导出表结构文档

列表展示数据项：
1. "序号"：序号
2. "表名"：数据库表名
3. "表注释"：表的中文说明
4. "字段数"：表中的字段数量
5. "创建时间"：表的创建时间
6. "更新时间"：表的最后更新时间
7. "操作"：包含"查看字段"、"导出文档"按钮

### 功能：字段管理
页面类型：弹窗
功能描述：查看表的字段详细信息

列表展示数据项：
1. "序号"：序号
2. "字段名"：字段英文名称
3. "字段类型"：字段数据类型
4. "长度/精度"：字段长度或精度
5. "允许空值"：是否允许为空
6. "默认值"：字段默认值
7. "是否主键"：是否是主键字段
8. "是否索引"：是否建立索引
9. "字段说明"：字段的中文说明

操作：
1. "导出"：导出字段信息
2. "关闭"：关闭弹窗

### 功能：导出结构
功能描述：导出数据库表结构文档

导出选项：
1. "导出格式"：下拉单选，选项：Word、Excel、PDF，默认Word
2. "导出内容"：多选框
   - "表结构信息"：默认勾选
   - "字段详细信息"：默认勾选
   - "索引信息"：默认勾选
   - "表关系图"：默认不勾选

操作：
1. "确定"：开始导出文档
2. "取消"：关闭导出选项

异常处理：
1. 数据库连接失败时提示具体的错误信息
2. 导出文档失败时提示失败原因
3. 必填字段未填写时进行提示
4. 字段格式错误时进行提示

权限控制：
1. 查看权限：允许查看数据库连接信息和表结构
2. 管理权限：允许新增、编辑、删除数据库连接
3. 导出权限：允许导出表结构文档

### 数据库表结构设计

#### 1. 数据库连接表 (db_connection)
| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | varchar | 32 | 否 | - | 是 | 主键ID |
| db_name | varchar | 50 | 否 | - | 否 | 数据库连接名称 |
| db_type | varchar | 20 | 否 | - | 否 | 数据库类型(MySQL/PostgreSQL/Oracle/SQLServer) |
| host | varchar | 100 | 否 | - | 否 | 主机地址 |
| port | int | 11 | 否 | - | 否 | 端口号 |
| database | varchar | 50 | 否 | - | 否 | 数据库名 |
| username | varchar | 50 | 否 | - | 否 | 用户名 |
| password | varchar | 100 | 否 | - | 否 | 密码(加密存储) |
| status | tinyint | 4 | 否 | 0 | 否 | 连接状态(0:未连接,1:已连接) |
| remark | varchar | 200 | 是 | null | 否 | 备注说明 |
| last_connect_time | datetime | - | 是 | null | 否 | 最后连接时间 |
| create_time | datetime | - | 否 | CURRENT_TIMESTAMP | 否 | 创建时间 |
| update_time | datetime | - | 否 | CURRENT_TIMESTAMP | 否 | 更新时间 |
| create_by | varchar | 32 | 否 | - | 否 | 创建人ID |
| update_by | varchar | 32 | 否 | - | 否 | 更新人ID |

#### 2. 数据库表信息表 (db_table_info)
| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | varchar | 32 | 否 | - | 是 | 主键ID |
| connection_id | varchar | 32 | 否 | - | 否 | 关联的数据库连接ID |
| table_name | varchar | 100 | 否 | - | 否 | 表名 |
| table_comment | varchar | 200 | 是 | null | 否 | 表注释 |
| fields_count | int | 11 | 否 | 0 | 否 | 字段数量 |
| create_time | datetime | - | 否 | CURRENT_TIMESTAMP | 否 | 创建时间 |
| update_time | datetime | - | 否 | CURRENT_TIMESTAMP | 否 | 更新时间 |

#### 3. 表字段信息表 (db_field_info)
| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | varchar | 32 | 否 | - | 是 | 主键ID |
| table_id | varchar | 32 | 否 | - | 否 | 关联的表ID |
| field_name | varchar | 100 | 否 | - | 否 | 字段名 |
| field_type | varchar | 50 | 否 | - | 否 | 字段类型 |
| field_length | int | 11 | 是 | null | 否 | 字段长度 |
| field_decimal | int | 11 | 是 | null | 否 | 小数位数 |
| is_nullable | tinyint | 4 | 否 | 0 | 否 | 是否允许为空(0:否,1:是) |
| default_value | varchar | 100 | 是 | null | 否 | 默认值 |
| is_primary | tinyint | 4 | 否 | 0 | 否 | 是否主键(0:否,1:是) |
| is_index | tinyint | 4 | 否 | 0 | 否 | 是否索引(0:否,1:是) |
| field_comment | varchar | 200 | 是 | null | 否 | 字段说明 |
| create_time | datetime | - | 否 | CURRENT_TIMESTAMP | 否 | 创建时间 |
| update_time | datetime | - | 否 | CURRENT_TIMESTAMP | 否 | 更新时间 |

#### 4. 导出记录表 (db_export_log)
| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | varchar | 32 | 否 | - | 是 | 主键ID |
| connection_id | varchar | 32 | 否 | - | 否 | 关联的数据库连接ID |
| export_type | varchar | 20 | 否 | - | 否 | 导出类型(Word/Excel/PDF) |
| export_content | varchar | 500 | 否 | - | 否 | 导出内容(JSON格式存储选项) |
| file_path | varchar | 200 | 否 | - | 否 | 导出文件路径 |
| file_size | bigint | 20 | 否 | 0 | 否 | 文件大小(字节) |
| status | tinyint | 4 | 否 | 0 | 否 | 导出状态(0:失败,1:成功) |
| error_msg | varchar | 500 | 是 | null | 否 | 错误信息 |
| create_time | datetime | - | 否 | CURRENT_TIMESTAMP | 否 | 创建时间 |
| create_by | varchar | 32 | 否 | - | 否 | 创建人ID |

#### 表关系说明：
1. `db_connection` 与 `db_table_info` 是一对多关系，一个数据库连接可以包含多个表
2. `db_table_info` 与 `db_field_info` 是一对多关系，一个表可以包含多个字段
3. `db_connection` 与 `db_export_log` 是一对多关系，一个数据库连接可以有多个导出记录

#### 索引设计：
1. db_connection表：
   - 主键索引：id
   - 普通索引：db_name, create_time

2. db_table_info表：
   - 主键索引：id
   - 外键索引：connection_id
   - 普通索引：table_name, create_time

3. db_field_info表：
   - 主键索引：id
   - 外键索引：table_id
   - 普通索引：field_name

4. db_export_log表：
   - 主键索引：id
   - 外键索引：connection_id
   - 普通索引：create_time

#### 字段约束：
1. 所有表的主键id使用UUID格式
2. 创建时间和更新时间自动维护
3. 密码字段需要加密存储
4. 状态字段使用tinyint类型，并设定固定的状态值
5. 字符串类型字段都设置了最大长度限制
6. 必填字段都设置了非空约束

#### 数据安全：
1. 密码等敏感信息需要加密存储
2. 重要操作需要记录操作日志
3. 数据库连接信息需要定期备份
4. 导出的文件需要进行访问权限控制

### 接口说明

#### 1. 数据库连接管理接口

##### 1.1 获取数据库连接列表
- 接口路径：`/api/db/connection/list`
- 请求方式：POST
- 请求参数：
```json
{
    "dbName": "string", // 数据库名称，可选
    "dbType": "string", // 数据库类型，可选
    "status": "number", // 连接状态，可选
    "createTimeStart": "string", // 创建开始时间，可选
    "createTimeEnd": "string", // 创建结束时间，可选
    "pageNum": "number", // 当前页码，必填
    "length": "number" // 每页条数，必填
}
```
- 响应参数：
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "total": "number", // 总条数
        "data": [{
            "id": "string", // 连接ID
            "dbName": "string", // 数据库名称
            "dbType": "string", // 数据库类型
            "host": "string", // 主机地址
            "port": "number", // 端口号
            "username": "string", // 用户名
            "status": "number", // 连接状态
            "lastConnectTime": "string", // 最后连接时间
            "createTime": "string" // 创建时间
        }]
    }
}
```

##### 1.2 新增数据库连接
- 接口路径：`/api/db/connection/save`
- 请求方式：POST
- 请求参数：
```json
{
    "dbName": "string", // 数据库名称，必填
    "dbType": "string", // 数据库类型，必填
    "host": "string", // 主机地址，必填
    "port": "number", // 端口号，必填
    "database": "string", // 数据库名，必填
    "username": "string", // 用户名，必填
    "password": "string", // 密码，必填
    "remark": "string" // 备注，可选
}
```
- 响应参数：
```json
{
    "code": 200,
    "message": "success",
    "data": "string" // 新增的连接ID
}
```

##### 1.3 编辑数据库连接
- 接口路径：`/api/db/connection/update`
- 请求方式：POST
- 请求参数：
```json
{
    "id": "string", // 连接ID，必填
    "dbName": "string", // 数据库名称，必填
    "dbType": "string", // 数据库类型，必填
    "host": "string", // 主机地址，必填
    "port": "number", // 端口号，必填
    "database": "string", // 数据库名，必填
    "username": "string", // 用户名，必填
    "password": "string", // 密码，可选
    "remark": "string" // 备注，可选
}
```
- 响应参数：
```json
{
    "code": 200,
    "message": "success",
    "data": null
}
```

##### 1.4 删除数据库连接
- 接口路径：`/api/db/connection/delete`
- 请求方式：POST
- 请求参数：
```json
{
    "id": "string" // 连接ID，必填
}
```
- 响应参数：
```json
{
    "code": 200,
    "message": "success",
    "data": null
}
```

##### 1.5 测试数据库连接
- 接口路径：`/api/db/connection/test`
- 请求方式：POST
- 请求参数：
```json
{
    "id": "string" // 连接ID，必填
}
```
- 响应参数：
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "status": "number", // 连接状态：1成功，0失败
        "message": "string" // 连接失败时的错误信息
    }
}
```

#### 2. 表结构管理接口

##### 2.1 获取表结构列表
- 接口路径：`/api/db/table/list`
- 请求方式：POST
- 请求参数：
```json
{
    "connectionId": "string", // 连接ID，必填
    "tableName": "string", // 表名，可选
    "createTimeStart": "string", // 创建开始时间，可选
    "createTimeEnd": "string", // 创建结束时间，可选
    "pageNum": "number", // 当前页码，必填
    "length": "number" // 每页条数，必填
}
```
- 响应参数：
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "total": "number", // 总条数
        "data": [{
            "id": "string", // 表ID
            "tableName": "string", // 表名
            "tableComment": "string", // 表注释
            "fieldsCount": "number", // 字段数量
            "createTime": "string", // 创建时间
            "updateTime": "string" // 更新时间
        }]
    }
}
```

##### 2.2 获取表字段列表
- 接口路径：`/api/db/field/list`
- 请求方式：POST
- 请求参数：
```json
{
    "tableId": "string" // 表ID，必填
}
```
- 响应参数：
```json
{
    "code": 200,
    "message": "success",
    "data": [{
        "id": "string", // 字段ID
        "fieldName": "string", // 字段名
        "fieldType": "string", // 字段类型
        "fieldLength": "number", // 字段长度
        "fieldDecimal": "number", // 小数位数
        "isNullable": "number", // 是否允许为空
        "defaultValue": "string", // 默认值
        "isPrimary": "number", // 是否主键
        "isIndex": "number", // 是否索引
        "fieldComment": "string" // 字段说明
    }]
}
```

#### 3. 导出管理接口

##### 3.1 导出表结构
- 接口路径：`/api/db/export/structure`
- 请求方式：POST
- 请求参数：
```json
{
    "connectionId": "string", // 连接ID，必填
    "exportType": "string", // 导出类型(Word/Excel/PDF)，必填
    "exportContent": { // 导出内容，必填
        "tableStructure": "boolean", // 表结构信息
        "fieldDetail": "boolean", // 字段详细信息
        "indexInfo": "boolean", // 索引信息
        "relationDiagram": "boolean" // 表关系图
    }
}
```
- 响应参数：
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "fileUrl": "string", // 文件下载地址
        "fileName": "string" // 文件名称
    }
}
```

##### 3.2 获取导出记录
- 接口路径：`/api/db/export/log/list`
- 请求方式：POST
- 请求参数：
```json
{
    "connectionId": "string", // 连接ID，可选
    "pageNum": "number", // 当前页码，必填
    "length": "number" // 每页条数，必填
}
```
- 响应参数：
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "total": "number", // 总条数
        "data": [{
            "id": "string", // 记录ID
            "connectionId": "string", // 连接ID
            "exportType": "string", // 导出类型
            "filePath": "string", // 文件路径
            "fileSize": "number", // 文件大小
            "status": "number", // 导出状态
            "createTime": "string", // 创建时间
            "createBy": "string" // 创建人
        }]
    }
}
```

#### 4. 错误码说明
| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 无权限访问 |
| 500 | 服务器内部错误 |
| 1001 | 数据库连接失败 |
| 1002 | 数据库连接已存在 |
| 1003 | 数据库连接不存在 |
| 1004 | 导出失败 |
| 1005 | 文件不存在 |
