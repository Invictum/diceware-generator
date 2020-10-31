# diceware-generator

Web based implementation of [Diceware](https://en.wikipedia.org/wiki/Diceware) passphrases generator.

Passphrases generation happens on browser side, so no sensitive data transmitted over the web. On the first generation
attempt diceware dictionary will be downloaded and stored in a browser storage.

## Deployment
Several deployment options are available

### Prebuild docker image
Image is available at [hub.docker.com](https://hub.docker.com/r/zim182/diceware). Use steps below to start:
 1. Pull image `docker pull zim182/diceware`
 2. Run image `docker run --name diceware -d -p 8080:80 diceware`  

Image exposes port 80, so in example above application will be available in http://localhost:8080 or http://host-ip:8080
in your browser.

### Build from Dockerfile
To build image manually:
 1. Close repository `https://github.com/Invictum/diceware-generator.git`
 2. Open the directory with a code and invoke `docker build -t diceware .`
 3. Now image is available with `diceware:latest` name
 
### Manual deployment to the web server
Application itself is a set of files that can be deployed to any web server. Just copy all the required files to the
server directory.
```
index.html
script.js
style.css
dictionary.txt
```

> **Warning**
>
> It is recommended to secure application with SSL to prevent script modification in transit.
