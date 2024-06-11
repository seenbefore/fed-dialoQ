#!/bin/bash

func() {
     echo "
  Usage:\n
    sh build/dev.sh [options]\n

  Options:\n
    -p  入口项目名 比如：vue-template-admin
    -m  构建方式  默认：dev，可选：dev(开发模式)、build(打包)
    -e  环境配置文件  默认：development(.env.development)、fat、uat、production
    -h  帮助
      "
}

# vue-template-admin
entry=""
# development fat uat production
env="development"
# dev or build
method="dev"
# 不知道为什么最后要加个参数:s
while getopts 'h:p:m:e:s' OPT; do
    case $OPT in
        p) entry=$OPTARG;;
        m) method=$OPTARG;;
        e) env=$OPTARG;;
        u) upload="true";;
        h) func;;
        ?) func;;
    esac
done

echo "entry:${entry}"
echo "env:${env}"
echo "method:${method}"



reg="vue-template"
dir="entry"

if [[ ${entry} == *"${reg}"* ]]; then
    dir="template-entry" 
    
fi

OUTPUT_DIR="./src/${dir}/${entry}/.env.${env}"
LOCAL_OUTPUT_DIR="./src/${dir}/${entry}/.env.development.local"
if [ ! -e $OUTPUT_DIR ]; then
  echo "${entry}下无配置文件 .env.${env}"

else {
    $(cp "${OUTPUT_DIR}" .)
}
fi

if [ -e $LOCAL_OUTPUT_DIR ]; then
  $(cp "${LOCAL_OUTPUT_DIR}" .)
fi

if [ ${method} = 'dev' ]; then
    npx cross-env VUE_APP_ENTRY="${entry}" vue-cli-service serve --open

else 
    npx cross-env VUE_APP_ENTRY="${entry}" vue-cli-service build --mode="${env}"
fi

