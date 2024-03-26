FROM node:20.11.1 as builder

WORKDIR /app

# COPY package*.json ./

COPY . .

RUN npm install -g npm@10.5.0 && npm install && npm cache clean --force
RUN npx prisma generate

# ENV PORT 4000

# EXPOSE $PORT

# VOLUME [ "/app/src/database" ]

# CMD [ "npm", "run", "start:dev" ]

#-------------------------------------------------

FROM node:20.11.1-alpine
WORKDIR /app
COPY --from=builder /app /app
# COPY . .
# VOLUME [ "/app/src/database" ]
CMD [ "npm", "run", "start:migrate-dev" ]
# CMD [ "npm", "start" ]