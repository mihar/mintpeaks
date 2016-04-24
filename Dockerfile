FROM mhart/alpine-node:4.3.0
MAINTAINER Miha Rebernik <miha@rebernik.info>
WORKDIR /app
ADD . .
RUN apk add --update make gcc g++ python
RUN npm install
RUN apk del make gcc g++ python && \
    rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp
