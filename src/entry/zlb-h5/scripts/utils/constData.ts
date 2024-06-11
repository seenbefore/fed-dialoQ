export const MY_BACKLOG_DATA = [
    {
        // 返回数据
        todoDescLeft: '未处理违法', // 待办描述-靠左
        todoLabel: '车辆', // 待办项-靠左
        willOverdue: '0', // 是否即将超期，0否1是
        todoValue: '2 条', // 待办项-靠右
        todoDescRight: '浙A88909', // 待办描述-靠右
        categoryCn: '交通违章', // 项目分类
        lastDateTime: '2019-12-31', // 最近期限
    },
    {
        // 返回数据
        todoDescLeft: '待办描述', // 待办描述-靠左
        todoLabel: '非法侵占他人财产啊啊啊啊', // 待办项-靠左
        willOverdue: '1', // 是否即将超期，0否1是
        todoValue: '', // 待办项-靠右
        todoDescRight: '浙A88909', // 待办描述-靠右
        categoryCn: '其他处罚', // 项目分类
        lastDateTime: '2019-12-31', // 最近期限
    },
    {
        // 返回数据
        todoDescLeft: '未处理违法', // 待办描述-靠左
        todoLabel: '车辆', // 待办项-靠左
        willOverdue: '0', // 是否即将超期，0否1是
        todoValue: '2 条', // 待办项-靠右
        todoDescRight: '浙A88909', // 待办描述-靠右
        categoryCn: '信息上报', // 项目分类
        lastDateTime: '2019-12-31', // 最近期限
    },
    {
        // 返回数据
        todoDescLeft: '未处理违法', // 待办描述-靠左
        todoLabel: '车辆', // 待办项-靠左
        willOverdue: '0', // 是否即将超期，0否1是
        todoValue: '浙A88909', // 待办项-靠右
        todoDescRight: '2 条', // 待办描述-靠右
        categoryCn: '文书签收', // 项目分类
        lastDateTime: '2019-12-31', // 最近期限
    },
]

export const USER_INFO = {
    realName: '张三', // 姓名
    companyList: [
        {
            name: '结构名称', // 机构名称
            fullName: '机构全称', // 机构全称
            orgId: '1233', // 机构id
        },
    ],
    companyName: '浙江汇信科技有限公司', // 公司名称
    uniCode: '111111111111111111', // 社会信用代码
    userType: 'personal', // 用户类型 个人：personal 法人：legal
    userId: '123', // 用户id
    token: 'ab123', // 用户令牌
}

export const COMMONLY_USED_FUNCTION = [
    {
        menuName: '处罚缴款', // 菜单名称
        sort: 0, // 排序号
        menuUid: '1', // 菜单编号
        userId: '1',
        iconName: 'cfjk', // 菜单图标
    },
    {
        menuName: '违法处理', // 菜单名称
        sort: 0, // 排序号
        menuUid: '11', // 菜单编号
        userId: '1',
        iconName: 'wfcl', // 菜单图标
    },
    {
        menuName: '自查信息上报', // 菜单名称
        sort: 0, // 排序号
        menuUid: '111', // 菜单编号
        userId: '1',
        iconName: 'zcxxsb', // 菜单图标
    },
    {
        menuName: '信用修复', // 菜单名称
        sort: 0, // 排序号
        menuUid: '1111', // 菜单编号
        userId: '1',
        iconName: 'xyxf', // 菜单图标
    },
    {
        menuName: '检查整改', // 菜单名称
        sort: 0, // 排序号
        menuUid: '11111', // 菜单编号
        userId: '1',
        iconName: 'jczg', // 菜单图标
    },
]

export const TRAFFIC_VIOLATION = [
    {
        handler: 'data_data_0_handler', // 处理人
        updateTime: '2019-12-31 00:00:00', // 更新时间
        title: '交通违章标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题', // 标题
        uid: 'data_data_0_uid', // 业务主键
        createBy: '0', // 创建人
        deleted: 'data_data_0_deleted',
        createTime: '2019-12-31 00:00:00', // 创建时间
        updateBy: '0', // 更新人
        carNo: 'data_data_0_carNo',
        punish: '需缴费100元，处理3分', // 处罚
        handled: '0', // 是否处理 0否1是
        handleDate: '2019-12-31', // 处理时间
        location: '湖墅南路路口', // 位置
        id: '0', // 主键
        category: '0', // 分类: 0交通违章,1其他处罚,2信息上报,3文书签收
        eventDate: '2019-12-31', // 时间
    },
    {
        handler: 'data_data_0_handler', // 处理人
        updateTime: '2019-12-31 00:00:00', // 更新时间
        title: '违法停车', // 标题
        uid: 'data_data_0_uid', // 业务主键
        createBy: '0', // 创建人
        deleted: 'data_data_0_deleted',
        createTime: '2019-12-31 00:00:00', // 创建时间
        updateBy: '0', // 更新人
        carNo: 'data_data_0_carNo',
        punish: '需缴费100元，处理3分', // 处罚
        handled: '0', // 是否处理 0否1是
        handleDate: '2019-12-31', // 处理时间
        location: '湖墅南路路口', // 位置
        id: '0', // 主键
        category: '0', // 分类: 0交通违章,1其他处罚,2信息上报,3文书签收
        eventDate: '2019-12-31', // 时间
    },
]
