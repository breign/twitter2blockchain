# https://pastebin.com/NTHqk35Q
FROM node:9.11.1-slim

RUN npm install --save datapay && npm install twitter

ADD ./twitter.js /

CMD ["/usr/local/bin/nodejs", "twitter.js"]
