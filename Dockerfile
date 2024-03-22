FROM node:latest as builder

WORKDIR /app

COPY package*.json ./

# COPY . .

RUN npm install

# ENV PORT 4000

# EXPOSE $PORT

# VOLUME [ "/app/src/database" ]

# CMD [ "npm", "run", "start:dev" ]

#-------------------------------------------------

FROM node:latest
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
VOLUME [ "/app/src/database" ]
CMD [ "npm", "run", "start:dev" ]
# CMD [ "npm", "start" ]