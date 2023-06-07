#DEPS
FROM node:14.4-alpine3.11 AS deps

RUN apt-get update && apt-get install -y libaio1 wget unzip

EXPOSE 3300
WORKDIR /app

COPY --chown=node:node ./package*.json /app/



#TEST
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./tsconfig.json ./
COPY --chown=node:node ./.mocharc.json ./

RUN npm run test:ci

#BUILD
FROM node:14.4-alpine3.11 as production
WORKDIR /app


COPY --chown=node:node --from=deps /app/src ./src
COPY --chown=node:node --from=deps /app/package.json ./
COPY --chown=node:node --from=deps /app/package-lock.json ./
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node --from=deps /app/tsconfig.json ./

RUN npm run build

RUN chown -R node:node /app/dist

#CLEANUP
RUN npm prune --production
EXPOSE 3300
CMD ["node", "./dist/src/index"]
