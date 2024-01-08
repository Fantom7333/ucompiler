FROM ubuntu:20.04

RUN mkdir -p /usr/src/app/

WORKDIR /user/src/app/
RUN apt-get upgrade
RUN apt-get update
RUN apt -y install python3-pip
COPY scripts_docker.py /user/src/app/

COPY requirements.txt /user/src/app/

ENV codefile = default

ENV prln = default

RUN pip3 install --no-cache-dir -r requirements.txt

CMD python3 scripts_docker.py --code=$codefile --prln=$prln