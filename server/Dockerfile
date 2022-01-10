
FROM node:16

# RUN mkdir -p /code
# COPY . /usr/src/server

WORKDIR /code

COPY package.json /code
# RUN rm -rf node_modules package-lock.json
# COPY . /code

RUN npm install

COPY . /code

EXPOSE 8080
# ENTRYPOINT [ "-p 3000:3000" ]

# CMD [ "node", "index.js" ]
CMD [ "node", "http-server/index.js" ]

# RUN node index.js