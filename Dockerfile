FROM node:22.2.0-alpine3.19

WORKDIR /srv/app/

COPY . /srv/app/.

RUN npm i --no-audit && npm cache clean --force

RUN npm run build

#CLEANUP
RUN npm prune --production
EXPOSE 3300
CMD ["node", "./dist/src/index"]
