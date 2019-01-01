FROM python:3.6.1-alpine


RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . .

EXPOSE 4242
CMD python -m http.server 4242