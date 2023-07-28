FROM node:16.20.0

# Container dependencies
RUN apt-get update && apt-get install -y --no-install-recommends build-essential
RUN npm -g install npm@latest && npm --version

# User setup
RUN useradd -U kangaroo
WORKDIR /home/kangaroo
COPY --chown=kangaroo:kangaroo . .
RUN chmod +x docker/*.sh

# Install project dependencies
RUN npm install

RUN chown -R kangaroo:kangaroo .
USER kangaroo:kangaroo

# ENTRYPOINT ["docker/entrypoint.sh"]
CMD ["docker/start.sh"]
