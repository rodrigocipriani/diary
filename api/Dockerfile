# todo's
# - use npm-shrinkwrap.json
# - Clear / and /client unused node_modules after build

FROM node:9

# Set Args
ARG HOME=/home/app
ARG NODE_ENV=production
ARG PORT=80

# Set Enviroment vars
ENV NODE_ENV $NODE_ENV
ENV PORT $PORT

# Add user for securet reasons
RUN useradd --user-group --create-home --shell /bin/false app

# Go to home owrkdir, like cd ...
WORKDIR ${HOME}

# mk dir and configure to new user
RUN mkdir -p ${HOME}
COPY . ${HOME}
RUN chown -R app:app ${HOME}/*

# change to app user
USER app

# default to port 80 for node, and 5858 or 9229 for debug
EXPOSE $PORT 5858 9229

# install dependencies and clean caches
RUN npm install && npm cache clean --force

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK CMD curl -fs http://localhost:$PORT/healthz || exit 1

# run container
CMD [ "npm", "start" ]