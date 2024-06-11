## 项目负责人配置webhook
进入左侧菜单`Settings->Webhooks`,填写`url`的值`http://192.168.1.147:3000/api/webhook/codereview`

![2E8DC1CA03FC4FD3A26C95D8C8FFA124.png](http://cdn.qiniu.barebear.cn/67213634-f6d5-465a-9bf5-e6209e0e993d/3a41c687002a65f234b096109.png)


## 开发人员提交合并请求

- 尽量两三天提交一次merge
- 提交的时候指定审核人

![86D32AE2EB6141EABC569D571802768A.png](http://cdn.qiniu.barebear.cn/1061a27e-1507-43b5-9f9b-8369acf786ca/3a41c687002a65f234b09610a.png)


## 审核人进行代码codereview
- 每个评论扣1分，总分30,小于24分不合格
![7DAD373D5E1E42D68C027C9148F70164.png](http://cdn.qiniu.barebear.cn/3cfe162b-a65c-4804-b233-ea4fae3afdd2/3a41c687002a65f234b09610b.png)



## 查看分数

地址：`http://192.168.1.147:3001/admin/admin/codereview`

![A40302A1E61D431496890FFF1B73472B.png](http://cdn.qiniu.barebear.cn/c101d16a-6488-488c-96d9-078a58df2554/3a41c687002a65f234b09610c.png)