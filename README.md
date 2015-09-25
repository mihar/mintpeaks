# mintpeaks proxy

This repository hosts the proxy server that receives climate data from a tessel device and proxies it through socket.io to any listeners.

## Running

Running this proxy on a Linux or Mac OS X machine is trivial using Docker. All you need to do is install [Docker](http://docker.com) and [docker-compose](http://docs.docker.com/compose/install/) and run:

```
docker-compose up -d mintpeaks
```

That's it. If you'd like, you can customize the ports/host on which the server is listening by changing the `docker-compose.yml` file.

## Other parts

- **Tessel app** [mintpeaks-tessel](https://github.com/mihar/mintpeaks-tessel) - Node.js app for Tessel
- **Websote** [mintpeaks-com](https://github.com/mihar/mintpeaks-com) - Simple client side app that connects to this proxy throught socket.io
