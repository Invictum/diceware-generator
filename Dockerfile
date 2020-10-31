FROM nginx:alpine

COPY dictionary.txt /usr/share/nginx/html
COPY index.html /usr/share/nginx/html
COPY script.js /usr/share/nginx/html
COPY style.css /usr/share/nginx/html