FROM node:14.4-alpine3.11

WORKDIR /srv/app/

COPY . /srv/app/.

RUN npm i --no-audit && npm cache clean --force

RUN npm run build

#CLEANUP
RUN npm prune --production
EXPOSE 3300
CMD ["node", "./dist/src/index"]
