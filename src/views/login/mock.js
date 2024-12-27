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
                            uri: '/test',
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
                        realName: '马小强',
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
]
