## 目录

-   [标准色](#Color)
-   [标准字](#Font)
-   [图标](#Icon)
-   [按钮](#Button)
-   [页面框架](#Framing)
-   [表单](#Form)
-   [表格](#Table)
-   [弹窗](#Bullet)
-   [缺省页面](#DefaultPages)
-   [规范标注](#Specifiction)

### 标准色 - Color <span id="Color"></span>

<table>
    <tbody>
        <tr>
            <th>方法说明</th><th>颜色名称</th><th>颜色</th>
        </tr>
        <tr>
            <td><font color="#1890FF">主色</font></td>
            <td><font color="#1890FF">Primary</font></td>
            <td bgcolor="#1890FF">
            <font color="#FFF">#1890FF</font></td>
        </tr>
        <tr>
            <td><font color="#70C067 ">成功-辅助色</font></td>
            <td><font color="#70C067 ">Success</font></td>
            <td bgcolor="#70C067 ">
            <font color="#FFF">#70C067 </font></td>
        </tr>
        <tr>
            <td><font color="#E15A5A ">危险-辅助色</font></td>
            <td><font color="#E15A5A ">Danger</font></td>
            <td bgcolor="#E15A5A ">
            <font color="#FFF">#E15A5A </font></td>
        </tr>
        <tr>
            <td><font color="#E9B230 ">警告-辅助色</font></td>
            <td><font color="#E9B230 ">Warning</font></td>
            <td bgcolor="#E9B230 ">
            <font color="#FFF">#E9B230 </font></td>
        </tr>
        <tr>
            <td><font color="#999999 ">提醒-辅助色</font></td>
            <td><font color="#999999 ">Info</font></td>
            <td bgcolor="#999999 ">
            <font color="#FFF">#999999 </font></td>
        </tr>
        <tr>
            <td><font color="#222222 ">一级标题</font></td>
            <td><font color="#222222 ">Primary Text</font></td>
            <td bgcolor="#222222 ">
            <font color="#FFF">#222222 </font></td>
        </tr>
        <tr>
            <td><font color="#333333 ">二级标题</font></td>
            <td><font color="#333333 ">Primary Text</font></td>
            <td bgcolor="#333333 ">
            <font color="#FFF">#333333 </font></td>
        </tr>
        <tr>
            <td><font color="#606266 ">正文文字</font></td>
            <td><font color="#606266 ">Regular Text</font></td>
            <td bgcolor="#606266 ">
            <font color="#FFF">#606266 </font></td>
        </tr>
        <tr>
            <td><font color="#909399 ">辅助文字</font></td>
            <td><font color="#909399 ">Secondary Text</font></td>
            <td bgcolor="#909399 ">
            <font color="#FFF">#909399 </font></td>
        </tr>
        <tr>
            <td><font color="#C0C4CC ">失效文字</font></td>
            <td><font color="#C0C4CC ">Placeholder</font></td>
            <td bgcolor="#C0C4CC ">
            <font color="#FFF">#C0C4CC </font></td>
        </tr>
    </tbody>
</table>

### 标准字 - Font <span id="Font"></span>

Web 安全字： 中文（`mac`|`PingFangSC-Regular`,`window`|`微软雅黑`）
字间距:：0
行间距：1.5~2

<table>
    <tbody>
        <tr>
            <th>使用场景</th><th>字号型号</th><th>字号</th>
        </tr>
        <tr>
            <td>
                <font  style="font-size:18px;font-weight:bold">系统名称</font>
            </td>
            <td><font >Bold</font></td>
            <td >
            <font >18px</font></td>
        </tr>
        <tr>
            <td>
                <font  style="font-size:16px;color:#222222">一级标题</font>
            </td>
            <td><font >Regular</font></td>
            <td >
            <font >16px</font></td>
        </tr>
        <tr>
            <td>
                <font  style="font-size:14px;color:#333">二级标题</font>
            </td>
            <td><font >Regular</font></td>
            <td >
            <font >14px</font></td>
        </tr>
        <tr>
            <td>
                <font  style="font-size:14px;color:#606266">正文文字</font>
            </td>
            <td><font >Regular</font></td>
            <td >
            <font >14px</font></td>
        </tr>
        <tr>
            <td>
                <font  style="font-size:12px;color:#909399">辅助文字</font>
            </td>
            <td><font >Regular</font></td>
            <td >
            <font >12px</font></td>
        </tr>
        <tr>
            <td>
                <font  style="font-size:14px;color:#C0C4CC">失效文字</font>
            </td>
            <td><font >Regular</font></td>
            <td >
            <font >14px</font></td>
        </tr>
    </tbody>
</table>

### 图标 - Icon <span id="Icon"></span>

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmru7pb44uj31h00nmwqh.jpg)

### 按钮 - Button <span id="Button"></span>

(1) 按钮种类: 优先操作按钮，次要按钮，不可用按钮。
(2) 按钮状态: 默认显示状态，鼠标经过状态，点击状态。
(3) 按钮位置: 按 windows 交互习惯先优先后次要(左取消，右保存/确认)。
(4) 按钮样式: 可直接写文字，或文字+图标(具体方案参照 Ul 设计效果图)，原则上按钮上文字为 2- 4 个汉字。

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmruc12eclj3111040gmp.jpg)

### 页面框架 <span id="Framing"></span>

-   页面框架基于主流分辨率 1920\*1080px 设计
-   包括顶栏、页签、各应用左侧菜单、主体内容四大区域，其中顶栏、左侧菜单为页面固定结构
-   左侧菜单可上下点击收缩展开，当内容超出一屏时出现滚动条，滑动查看
-   固定显示区域一屏高度，超过内容出现滚动条
-   页面中各个组件需根据屏幕宽度采用自适应设计

展开
![](https://tva1.sinaimg.cn/large/008eGmZEly1gmrui6c2g0j30ua0j6mzv.jpg)
收起
![](https://tva1.sinaimg.cn/large/008eGmZEly1gmruild9omj30uj0ja0tp.jpg)

### 表单 - Form <span id="Form"></span>

-   输入框高度为 36px，宽度视情况自适应，圆角 4px
-   控件之间的竖向间距 20px (当有错误提示文字时，竖向增加 4px)
-   标题文字右对齐，距控件 10px;
-   控件内部文字左对齐，距边框 15px
-   预置文案: 输入框内均需有预置文案，且光标进入输入框获得焦点时文案自动消失，若输入框失去焦点且未输入任何文字时恢复预置文案。
-   下拉选择框中内容有多级时，只显示一级， 其他级呈灰色不可用状态，选择一级后才会激活第二级，以此类推。如:部门作为查询条件时，点击下拉框，默认只有一级部门可用，点击一级部门再激活开显示二级部门。
-   界面的必填项以红色`*`号标识出来，且标识在“表单字段名称”前面。存在必填项未填写时，输入框失去焦点即时提示，输入框红色描边，且输入框下方左有相应红色提示文案。输入框未曾获得过焦点直接提交时，同样输入框红色描边+红色提示文案提醒。
-   多行输入框: 需要有“当前已输入字数/最多可输入字数”(如: 50/100) 。
-   与限制条件不符的非法输入应即时提醒。
-   只允许输入日期、时间的输入框需要通过格式化方式约束输入，而不是输入非法值后给出提示;
-   新增、修改、登录表单`提交`按钮默认不可点击，当输入完整信息后才可点击
-   当表单最后一个为输入框时应该允许用户`enter`提交表单

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmruo5rf5qj30xi0nzjv5.jpg)

### 表格 - Table <span id="Table"></span>

-   表头: 字体加粗，大小用 14px;(建议：点击列头按钮可以排序(倒序,顺序切换)) ;
-   单无格: 文字图片内容左对齐，数字右对齐。字体不加粗，大小用 12px;
-   操作按钮: 固定在左侧。
-   鼠标划过表格单行时，行背景颜色需要有变化，样式参照 Ul 效果图。
-   原则上每页显示 20 条数据，实际显示条数可按实际情状/需求排列而定。
-   表格中不定长的字段，固定显示宽度，超出内容用"..."显示， 光标停留后,在浮动层显示详细内容。对于定长字段(如，编码、日期、时间、操作)，必须设置刚好显示其内容的列宽度，不允许出现超过 10px 宽度的空白。
-   建议：表格要固定高度，不允许随着行数的多少而改变，当行数总高度超过表格高度时，出现垂直滚动条。
-   建议：点击某行时，当前行背景颜色需要有变化，当选择另外的行，上次操作行的背景颜色需要还原。行背景样式参照 U|效果图。

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmruz90fqbj30pi0ftabn.jpg)

### 提示弹窗 - Bullet <span id="Bullet"></span>

-   弹窗的透明遮罩背景色为#000000，透明度 50%
-   toast 若提示建议停留时间 3s，可根据文字多少适当调整停留时间，文字建议不超过 30 字
-   具体尺寸间距见规范标注

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmrv2vzmrjj30mh0ey41h.jpg)

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmrv3i93jzj30ls055wfe.jpg)

### 缺省页面 - Default Pages <span id="DefaultPages"></span>

当页面没有数据、加载失败或出错时，要有统一的提示文案图标告诉用户“页面加载失败/暂无数据/页面出错”，具体图文可参见设计效果。

#### 404

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmrv6iukn3j30em0a6mya.jpg)

#### 403

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmrv79reowj30fc0ajjsa.jpg)

#### 500

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmrv8328dpj30er09r756.jpg)

#### netowork

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmrv8u7oivj30fg0am3zd.jpg)

### 设计规范 - Specifiction <span id="Specifiction"></span>

#### 导航菜单

-   刷新页面后根据 url 聚焦在激活的菜单
-   原则上每个页面都有面包屑导航，除了最后一级，其他前面的层级均可链接到相应页面

#### 加载

-   当获取数据较慢或者网络不佳时，提示用户`数据正在加载中...`

#### 操作信息提示

**删除数据**

-   必须弹出确认框待用户确认才可进行删除
-   删除成功后从当前组件中移除当前记录，并更新当前页的页码以及总数

**添加编辑数据**

-   数据保存成功后自动关闭弹窗,并同时更新数据展示组件(跟数据无关的组件不要改变其状态) :如果是表格，分两种情况，

    1. 新增操作则重新加载表格数据(如果表格有查询条件,按原条件加载)，
    2. 编辑操作则仅更新当前行内容; 如果是树则只更新当前节点或子节点。

-   数据保存失败，编辑窗口不关闭并弹出失败原因;如果是某个输入项验证不通过，还需要将光标自动定位该输入项。

**信息提示**

-   必填项需要有特殊标识，并在代码中做判断。
-   内容提交类: 每个输入项、条件选项(包括时间选择)均需给出提示信息。该提示信息可放置在输入框内或者控件尾部(如:密码多少位;搜索框则提示用户输入什么内容等。)
-   谨慎类操作: 针对不可修改、重要操作选择等操作属于谨慎类操作，均需给出提示信息。如审核是否通过操作、退回申请操作、数据输入等。
-   错误提示: 当用户的操作不符合规则、输入数据不符合规则需要给出操作提示。比如输入数值不符系统规定，则进行提示。
-   错误提示分为: 即时提示、提交后提示。本系统这里统一用即时提示。
-   读取提示: 涉及到大量信息读取缓慢的时候应该进行提示。比如进入后台查看数据列表时，由于网络、数据量大等原导致载入缓慢，应该显示读取提示信息，已避免用户过度重复点击操作。

**消息提示**

-   当进行添/加编辑/删除此类操作，不管成功与否都需要给出提示，成功内容统一`操作成功`;
-   顶部出现，3 秒后自动消失