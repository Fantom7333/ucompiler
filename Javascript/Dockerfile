FROM openjdk:8
RUN mkdir -p /usr/src/app/
WORKDIR /user/src/app/
RUN apt-get update
RUN apt -y install python3-pip
COPY scripts_docker.py /user/src/app/
COPY requirements.txt /user/src/app/
RUN pip3 install --no-cache-dir -r requirements.txt
ENV codefile = default

ENV prln = default

CMD python3 scripts_docker.py --code=$codefile --prln=$prln