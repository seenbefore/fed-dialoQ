# 项目配置项

## 环境变量配置
项目的环境变量配置位于项目根目录下的 `.env`、`.env.development`、`.env.production`

```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

```