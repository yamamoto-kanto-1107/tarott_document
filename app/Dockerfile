FROM node:20

WORKDIR /app

# Corepackを無効化
RUN corepack disable

# Yarn 1.x を直接インストール
RUN npm install -g yarn@1.22.22

# package.json と yarn.lock をコピー
COPY package.json yarn.lock ./

# 環境変数でSSL設定を緩和（テスト用）
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Yarnインストール実行
RUN yarn install --frozen-lockfile --network-timeout 600000

# ソースコードをコピー
COPY . .

CMD ["yarn", "dev"]