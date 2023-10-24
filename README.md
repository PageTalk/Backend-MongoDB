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
3. Change the current directory to the server: `cd server`
4. Run
  
   ```
   npm install
   npm start
   ```
5. Your application is now running.

#### Installing new npm packages
- New packages can be installed through your preferred terminal using the normal `npm i` command.

## Database Diagram

<img src="https://i.ibb.co/wNPdS4S/PageTalk.png">

## How JWT Works

<img src="https://i.stack.imgur.com/b2dzI.png" alt="JWT Working Showcase">

## How JWT is used

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20210925202132/Untitled1-660x404.png">
Credits: GeeksForGeeks

## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Clone the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request


## License
Distributed under the MIT License. See `LICENSE` for more information.