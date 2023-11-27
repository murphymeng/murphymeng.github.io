# 使用Node.js镜像作为基础镜像
FROM node:lts-alpine as build-stage

# 在容器内设置工作目录
WORKDIR /app

# 将package.json和yarn.lock文件复制到工作目录
COPY package*.json yarn.lock ./

# 使用yarn安装项目依赖
RUN yarn install

# 将项目源代码复制到工作目录
COPY . .

# 使用yarn构建项目
RUN yarn build

# 运行阶段
FROM nginx:stable-alpine as production-stage

# 将构建得到的文件复制到nginx中
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]