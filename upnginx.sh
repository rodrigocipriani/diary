
#!/bin/sh
echo "Rebuilding..."
docker stop nginx-teste &&
docker rm nginx-teste &&
docker build -t nginx-teste -f ./.docker/nginx.dev.dockerfile . && 
docker run --name nginx-teste -p 80:80 nginx-teste
echo "Ok..."