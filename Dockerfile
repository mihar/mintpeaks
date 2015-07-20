FROM mhart/alpine-node
MAINTAINER Miha Rebernik <miha@rebernik.info>
WORKDIR /app
ADD . .
RUN apk-install make gcc g++ python
RUN npm install
RUN apk del make gcc g++ python && \
    rm -rf /tmp/* /root/.npm /root/.node-gyp
EXPOSE 3000
EXPOSE 10231
ENV DEBUG=mintpeaks*
CMD ["node", "mintpeaks.js"]
