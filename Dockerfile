FROM node

WORKDIR .
COPY package.json .
RUN npm install

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
RUN apt-get update && apt-get install -y postgresql-client

COPY . .
CMD npm start