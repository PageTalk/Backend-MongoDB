# Backend

## Starting

Start the docker container, then run

```shell
docker exec -it pagetalk-mysql-container bash
```

To start a MySQL server, run

```mysql
mysql -u root -p
```

Enter password: 1234

## Incase of SQL Connection error

Run the following command in the MySQL server

```mysql
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
```

Note: Server is running on port 3306 so add the port to the dbconfig while creating a connection.

If the connection still fails, go into the MySQL Container files, look for etc/my.cnf config file, and set port to 3306 (port=3306).

## How JWT Works

<img src="https://i.stack.imgur.com/b2dzI.png" alt="JWT Working Showcase">

## How to use JWT

1. User sends a POST request to the server with username and password
2. Server checks if the username and password is correct
3. If correct, server creates a JWT token and sends it back to the user
4. User stores the JWT token in the local storage
5. User sends the JWT token in the header of every request
6. Server checks if the JWT token is valid
7. If valid, server sends the response back to the user

## Checklist

### Overall

- [x] Create Docker Container
- [x] Create MySQL Server
- [x] Create MySQL Database
- [x] Create MySQL Tables
- [ ] Clean up all routes.
- [ ] Make v2 of API (e.g. /api/v2/{user}/operations <- all operations)
### Tables

 User

- [x] Create User
- [x] Login User
- [x] Get User by username
- [x] Get All users
- [x] Update User
- [ ] Delete User

PDF

- [x] Upload PDF (Edge cases pending)
- [ ] Add PDF data to table
- [ ] Get All PDFs
- [ ] Retrieve PDF
- [ ] Update PDF (Replace)


