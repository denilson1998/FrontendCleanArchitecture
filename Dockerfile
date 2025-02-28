FROM nginxinc/nginx-unprivileged:latest
ARG DIR="dist" 
ARG NGINX_DIR=""
COPY "${DIR}" /usr/share/nginx/html
COPY "${NGINX_DIR}"/nginx.conf /etc/nginx/conf.d/default.conf