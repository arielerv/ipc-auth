FROM node:14.4-alpine3.11

WORKDIR /srv/app/

COPY /ipc-auth/ /srv/app/.

RUN npm i --no-audit && npm cache clean --force

RUN npm run build

RUN chown -R node:node /srv/app/dist

#CLEANUP
RUN npm prune --production
EXPOSE 3300
CMD ["node", "./dist/src/index"]
