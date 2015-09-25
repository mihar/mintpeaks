# mintpeaks proxy

This repository hosts the proxy server that receives climate data from a tessel device and proxies it through socket.io to any listeners.

## Deploying

Deploying this proxy to any UNIX machine is trivial using Docker. All you need is install Docker and `docker-compose`.

Then run:

```
docker-compose up -d mintpeaks
```

That's it. If you want, you can customize the ports/host on which the server is listening by changing the `docker-compose.yml` file.