## kingring

- Users
- Account
- Vault

  - User -> Accounts ->

  user : mukesh

  type : BUSINESS OR PERSONAL

  PERSONAL -> college
  -> office
  ->

  mukesh
  PERSONAL - home - office

  - fb
  - google
  - spotify

  PERSONAL BUSINESSS

  PERSONAL CLICK: -

  - Top : button -> Modal -> new credentials -> category : Home/Office
  - Home, Office

User ...

Vault

User stroy :

#DOcker

# if you want to bypass logging step

newgrp docker

# see all installed images

docker images

# prune unused images

docker system prune

# pull already existsing image from docker hub

docker pull postgres

# create serber/vm out of that pulled data

docker run -dit --name postgresdb -p 5433:5432 -e POSTGRES_PASSWORD=abcde -e POSTGRES_USER=postgres -e POSTGRES_DB=passman postgres

# check which files are running

docker ps -a

# delete certain server/vm of postgres or any docker apps

docker rm -f postgresdb

_You can also create custom image as per our need, like for cra_

- write command in `Dockerfile`
  main commands :
  - fetch base image
  - install and move deps

Inside root(react project) directory,

# Build that image(deps, config, exec in single file) from docker file

docker build . -t aadarsha/passman
here aadarsha/passman is name of the image

# create container from image provided at docker file

docker run -dit --name passman -p 3005:3000 aadarsha/passman

# start or stop docker container

docker start/stop passman

# view all container running + not running

docker ps -a

## create realtime container for live changes in project , useful for create react app type of project

docker run -dit --name passman -p 3005:3000 -v $PWD/:/app aadarsha/passman

# view logs of the prticular container

docker logs -f passman

sudo systemctl start postgresql
