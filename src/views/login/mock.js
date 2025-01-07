import { mock } from 'mockjs'
import { LocalMenu } from '@/menus'
export default [
    {
        name: '/usercenter/user/readRsa',
        method: 'get',
        description: '获取公钥',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '获取成功',
                data:
                    '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmweroebYTrMKehZgk0WP15wANffH5rwnz+J31xho2tsITrYzTDPjtG7uVU1tzeMyGSPUy36IAkvwcGo12i4ODogOtPeKgDiKRHOfSuuTSTXl5d/hKTLbhzmxQaT6VCdWsEHw1Zr73MlJ4L961M9tQPIZbdO/gw02Bsftq+RkEO2Fh2A4DDqmTiG7Vc4MlgFWg0m/2ogiPNaa1MLLeAkIfRWxgrlEDiYqlqb0Rwp1+QvhSI+4c2Z6lMaW5M1Cf5pb6GnUstGbT1jnz2XQHrdQCpXdfGYHAWry5Dyimw1jUu3RyFtL59+ZLfIKoEnDh/2CIGU82tc+r0IZ1P7aZo1zhwIDAQAB-----END PUBLIC KEY-----',
            })
        },
    },
    {
        name: '/usercenter/user/login-with-token',
        method: 'get',
        description: '',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '成功',
                data: {
                    user: {
                        realName: '楚光',
                    },
                    token:
                        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwNjUzMjYyNSIsInp6ZEN1cnJlbnREZXB0Q29kZSI6IkdPX2NlOWVmN2JmNjliNjQ1NjhiMjc0OGY4MGZlNDFlM2ZhIiwic3lzVHlwZSI6IjAiLCJpc3MiOiJpY2luZm8uY24iLCJ1c2VyWnpkSWQiOiI2NDYwMDczNyIsInVzZXJJZCI6NjU0LCJTb3VyY2UiOiJ3ei1jb21tYW5kIiwiZW1wbG95ZWVDb2RlIjoiR0VfNjA5ZTczZTkwYzdjNDY4ZThiMTdjMmI5N2IzYmNhMGIiLCJhdWQiOiJ3ZWIiLCJjdXJyZW50RGVwdENvZGUiOiIzMzAzODEwMTQwMDBKMDAxQjAwMDAwMiIsInJvbGVMZXZlbCI6IjAiLCJ4enpmQ3VycmVudERlcHRDb2RlIjoiMzMwMzgxMDE0MDAwSjAwMUIwMDAwMDIiLCJleHAiOjE3MzU2MTE1MjF9.4NNzO86WMPS4U7p84l1bwc2cnI7TsTebZIpuUJqRs-0_SICxpcFCzsQtiJFC1ee6AdjI3OzIAWAn2_tl3DCJSw',
                    applicationTypeList: [],
                    xzzfToken: null,
                    applicationMenuList: [...LocalMenu],
                },
            })
        },
    },
    {
        name: '/usercenter/user/getAccountId',
        method: 'get',
        description: '',
        onMock(opt, query, body) {
            return mock({ code: 200, message: '成功', data: 'ta3hYcF7u/Zr8vs7HxoxVA==' })
        },
    },
    {
        name: '/usercenter/user/login',
        method: 'post',
        description: '登录',
        onMock(opt, query, body) {
            const { username, password } = body
            let applicationMenuList = [
                {
                    label: '我的工作台',
                    icon: 'el-icon-document',
                    uri: '/我的工作台',
                    children: [
                        {
                            label: '测试页面',
                            icon: 'el-icon-document',
                            uri: '/system/user',
                        },
                    ],
                },
            ]
            // 不同用户返回不同的菜单
            if (username === 'admin') {
                applicationMenuList = [...LocalMenu]
            }
            return mock({
                code: 200,
                message: '登录成功!',
                data: {
                    user: {
                        realName: '楚光',
                        zfHeadPath: '',
                        organizationCode: 'GO_e3765af04ff94125a61dc1182073987c',
                        organizationName: null,
                        organizationShortName: null,
                        organizationDeptCode: 'GO_e3765af04ff94125a61dc1182073987c',
                        organizationDeptName: null,
                        firstLoginFlag: '1',
                        pcLoginFlag: '1',
                        hasPassword: '1',
                        userId: '654',
                        loginName: '06532625',
                        phone: '',
                        deptCode: '330381014000J001B000002',
                        xzzfDeptCode: '330381014000J001B000002',
                        sex: '1',
                        isAdmin: ' ',
                        deptName: '综合治理办公室',
                        orgCode: '330381014000J001',
                        xzzfOrgCode: '330381014000_11330381002543965W',
                        orgName: '瑞安市高楼镇人民政府',
                        deptType: '1',
                        manageCode: '330381014000J001',
                        lineCodeList: ['A09410000001'],
                        permissionOrgList: ['330381014000J001'],
                        permissionAreaList: ['330381014000'],
                        permissionTerritoryList: [
                            {
                                territoryId: '164',
                                name: '乡镇街道',
                                code: 'A094',
                                sort: null,
                                docNumber: null,
                                remark: null,
                                createTime: null,
                                updateTime: null,
                                createBy: null,
                                deleted: null,
                                updateBy: null,
                                tcTerritory: null,
                                isPub: null,
                                isLawEnforcement: null,
                                lineId: null,
                                key: 'A094',
                            },
                        ],
                        dataPermissionType: null,
                        areaCode: '330381014000',
                        orgId: 501,
                        level: '4',
                        orgType: '0',
                        sysType: '0',
                        zzdAccountId: '64600737',
                        zwdAccountId: '64600737',
                        employeeCode: 'GE_609e73e90c7c468e8b17c2b97b3bca0b',
                        mainDeptCode: null,
                        mainDeptName: null,
                        mainOrgCode: null,
                        mainOrgName: null,
                        mainJob: false,
                        roleIds: [3, 5, 4],
                        adminIdList: null,
                        showSwitch: '0',
                        applicationCode: '100011',
                        currentOrgCode: '330381014000J001',
                        currentOrgName: '瑞安市高楼镇人民政府',
                        currentOrgShortName: '高楼镇人民政府',
                        currentDeptCode: '330381014000J001B000002',
                        currentDeptName: '综合治理办公室',
                        zzdUserInfo: null,
                        key: null,
                        title: null,
                        type: null,
                        personId: '654',
                        zzdDeptCode: 'GO_ce9ef7bf69b64568b2748f80fe41e3fa',
                        orgSubType: '0',
                    },
                    token:
                        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwNjUzMjYyNSIsInp6ZEN1cnJlbnREZXB0Q29kZSI6IkdPX2NlOWVmN2JmNjliNjQ1NjhiMjc0OGY4MGZlNDFlM2ZhIiwic3lzVHlwZSI6IjAiLCJpc3MiOiJpY2luZm8uY24iLCJ1c2VyWnpkSWQiOiI2NDYwMDczNyIsInVzZXJJZCI6NjU0LCJTb3VyY2UiOiJ3ei1jb21tYW5kIiwiZW1wbG95ZWVDb2RlIjoiR0VfNjA5ZTczZTkwYzdjNDY4ZThiMTdjMmI5N2IzYmNhMGIiLCJhdWQiOiJ3ZWIiLCJjdXJyZW50RGVwdENvZGUiOiIzMzAzODEwMTQwMDBKMDAxQjAwMDAwMiIsInJvbGVMZXZlbCI6IjAiLCJ4enpmQ3VycmVudERlcHRDb2RlIjoiMzMwMzgxMDE0MDAwSjAwMUIwMDAwMDIiLCJleHAiOjE3MzU2MTE1MjF9.4NNzO86WMPS4U7p84l1bwc2cnI7TsTebZIpuUJqRs-0_SICxpcFCzsQtiJFC1ee6AdjI3OzIAWAn2_tl3DCJSw',
                    applicationTypeList: [],
                    xzzfToken: null,
                    applicationMenuList,
                },
            })
        },
    },
    {
        name: '/usercenter/captcha/image',
        method: 'get',
        description: '',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '成功',
                data: {
                    uuid: 'd6216cb8-045d-4134-b51f-f78d7a0a1c27',
                    img:
                        'data:image/png;base64,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',
                    expireTime: 1735796288519,
                    isEnabled: true,
                },
            })
        },
    },
]
