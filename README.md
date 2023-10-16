# PageTalk (Backend)

Welcome to the backend of the PageTalk project. PageTalk allows users to upload PDFs and receive summaries, along with query-based responses.

## 🔧 Tech Stack:
- ExpressJS
- TypeScript
- Docker
- Firebase Cloud Storage

## 👨🏻‍💻 Technologies Used:
- **JWT**: For secure header authentication and verification
- **bcrypt**: For password storage and retrieval
- **body-parser** and **url-encoded**: Middleware for parsing request bodies

## Tables:

1. Users
2. Query
3. PDF
4. Admin
5. Collection
6. Interaction

## Routes:

- User:
   - `/user/login` (POST: Login User)
   - `/user/:username` (POST: Create User, GET: Retrieve User, PATCH: Update User) 

- Query:
   - `/query/:pdfID` (POSGT: Create Query, GET: Retrieve Query by Username and PDF)
   - `/query/:queryID` (GET: Retrieve Query by ID, PATCH: Update Query by ID, DELETE: Delete Query by ID)

- PDF:
   - `/pdf/` (POST: Create PDF)
   - `/pdf/:pdfID` (GET: Retrieve PDF by ID)

## Try it yourself:

To run this backend on your local machine, follow these steps:

1. Clone the repository:
   
   ```shell
   git clone https://github.com/PageTalk/Backend.git
   ```
2. Configure your environment variables as in the `.env.example` file
3. Configure the docker-compose file on your end
4. Open a terminal, CD to this folder, and run
  
  ```
  docker-compose up -d
  ```
5. Start the docker container, then create the tables as mentioned in the `database/init.sql` file.
6. Run
  
  ```
  npm start
  ```
7. Your application is now running.

## Database Diagram

<img src="https://github.com/PageTalk/Backend/blob/5d19a46daa0b7e56e5d29d224f3df6b56cd1eb73/screenshots/PageTalk.png">

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

## Troubleshooting

### Incase of SQL Connection error

Run the following command in the MySQL server

```mysql
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
```

Note: Server is running on port 3306 so add the port to the dbconfig while creating a connection.

### If connection still fails

If the connection still fails, go into the MySQL Container files, look for `etc/my.cnf` config file, and set port to 3306.
```
// my.cnf
---- previous code

port=3306

---- rest of the code
```

## How JWT Works

<img src="https://i.stack.imgur.com/b2dzI.png" alt="JWT Working Showcase">

## How JWT is used

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20210925202132/Untitled1-660x404.png">
Credits: GeeksForGeeks

## How to use JWT

1. User sends a POST request to the server with username and password
2. Server checks if the username and password is correct
3. If correct, server creates a JWT token and sends it back to the user
4. User stores the JWT token in the local storage
5. User sends the JWT token in the header of every request
6. Server checks if the JWT token is valid
7. If valid, server sends the response back to the user
