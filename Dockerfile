FROM node:8.12
MAINTAINER Michael Samblanet <michael@samblanet.com>

#
# Note: Docker for Windows currently does not support COPY --chown
# so I've had to manually chown the copied files.  When the
# code to fix this eventually makes it down the pike, we can then
# simplify this a little...
#

#
# Setup environment variables
# WARNING: --chown does not support env replacement at this time so ${USER}
#          is hardcoded - if you change USER, make sure to review the entire
#          script!  https://github.com/moby/moby/issues/35018
#
ENV SERVICENAME test-webservice
ENV USER websvc
ENV HOME /home/${USER}
ENV NODE_ENV development

#
# Make user and switch user and workir
#
USER root
RUN useradd -d ${HOME} -ms /bin/bash ${USER}
USER ${USER}
RUN mkdir ${HOME}/${SERVICENAME} ${HOME}/${SERVICENAME}/logs
WORKDIR ${HOME}/${SERVICENAME}

#
# Install Dependencies
#
COPY --chown=websvc:websvc package*.json ./
RUN npm install

#
# Copy Application
#
COPY --chown=websvc:websvc src ./src/
COPY --chown=websvc:websvc test ./test/
COPY --chown=websvc:websvc server.js .

#
# Run the unit tests
#
RUN npm test

#
# Expose ports and suggested volumes
#
EXPOSE 3000
VOLUME ${HOME}/${SERVICENAME}/logs

#
# Run via NPM
#
CMD [ "npm", "start" ]
