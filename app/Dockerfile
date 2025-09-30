FROM node:22-alpine
WORKDIR /usr/src/app

# Alpine のビルドツール追加（ネイティブモジュール対応）
RUN apk add --no-cache python3 g++ make

# corepack 有効化
RUN corepack enable

# package.json と lock ファイルだけコピー
COPY package.json yarn.lock ./

# Yarn で依存関係インストール
RUN yarn install

# 残りのソースコードをコピー
COPY . .

# ビルド
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
