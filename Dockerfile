FROM node:19 as build-app

ARG BUILD_TIME
ARG BUILD_VERSION
ARG BUILD_REVISION
WORKDIR /app
COPY . .
RUN npm install 
ARG FAL_KEY=${FAL_KEY}
ARG POCKET_URL=${POCKET_URL}
ARG POCKET_USER=${POCKET_USER}
ARG POCKET_PASS=${POCKET_PASS}
ARG DATO_KEY=${DATO_KEY}
RUN npm run build

FROM node:19-alpine as build-runtime

WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000

CMD ["node", "./build/index.js"]

