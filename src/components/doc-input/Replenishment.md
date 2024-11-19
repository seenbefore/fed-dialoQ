- PC端doc-input文书解析组件@/entry/supervisionlaw/components/global/doc-input/index.vue

  - `assembleInitDocSendData`方法

    - 参数类型*type*:

      - base:获取文书模板展示的html
      - form获取文书上的数据

    - 获取文书时判断使用哪个方法，一般的配置文书走的是默认接口getDocBaseInfo和getDocFormData，可通过props传递自定义的方法

    - **props**

      | 字段名称             | 类型       | 描述                                                         |
      | -------------------- | ---------- | ------------------------------------------------------------ |
      | customGetDocBaseInfo | *Function* | 自定义获取文书模板的方法（使用该方法时务必要求后端和getDocBaseInfo返回数据结构一致） |
      | customGetDocForm     | Function   | 自定义获取文书模板数据的方法（使用该方法时务必要求后端和getDocFormData返回数据结构一致） |

  - generateDocParseComp方法

    - 生成vue组件的方法（具体见方法内部实现逻辑）

  - httpApiForm方法

    - 获取文书上回显的数据

      ```js
      this.formData = data.dataMap
      ```

  - parseDefaultValue方法【该方法只会在新建文书时调用】

    - 解析默认值  对不同情况的文书进行forceParams参数的属性添加

  - getApiFieldValue方法

    - 对需要通过配置中api接口, 拿到数据进行赋值

  - parseApiOptions方法

    - 基于getApiFieldValue方法进行调用 【该方法在axios调用前对入参进行重新整理】
    - replaceObjectValue方法, 当请求方法为post时, 对入参字段进行赋值

- 移动端doc-form文书解析组件@/entry/moblie-app/components/global/doc-form/index.vue【基于app-form封装】
  - initFormInfo方法
    - 分别调用getFormOptionInfoApi和getFormDataInfoApi获取文书模板和文书数据
    - 在调用getFormDataInfoApi接口后, 调用fieldsFormat方法对数据进行component匹配
- 移动端app-form文书
  - fieldsFormat方法
    - 进行默认值的赋值和表单对象的值的设置
  - groupFields方法
    - 格式化传进来的fields字段, 整理成需要的格式
  - initWatcher方法
    - 实现文书配置里的自定义监听事件
  - getFieldComponent方法
    - 渲染对应的组件【对应componentMap】
  - getFieldRules，getFieldProps，getRefField，getFieldAttrs，setFieldAttrs，resetVlidateFormItem
    - 这些方法都是辅助函数，具体使用见函数内部实现逻辑
  - validate方法
    - 表单检验
  - submit方法
    - 表单提交

**注意**: 在更改文书配置代码时应采用策略模式, 在合适的位置传入回调函数来处理复杂的逻辑或增加`if`判断, 不要影响原有的功能
