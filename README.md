# DevTalk

Join communities of programmers and start discussions about companies. Search or start new company conversations with a discord-like interface. Built with **React**, **Redux**, **MongoDB**, **Express**, **NodeJS** and **TypeScript**.

### Features

- :white_check_mark: A user can login or register for a new account
- :white_check_mark: A user can received an error in the login/register page if username/password is invalid or already exist
- :white_check_mark: If a user is not logged in, he/she can not view the chat room
- :black_square_button: By default, a user is going to be redirected to Welcome channel
- :black_square_button: A user can create a new company channel with a name and a description
- :black_square_button: A user can select a company channel
- :black_square_button: When a user selects a company channel, he/she can bookmark it
- :black_square_button: A user can see the members list of the company channel
- :black_square_button: A user can send a message
- :black_square_button: A user can see other people's messages
- :black_square_button: A user can search for a company

### Installation

1. git clone https://github.com/hicarlodacuyan/dev-talk.git
2. `npm install` in root directory
3. `npm install` in frontend directory
4. Create a `.env` file in the root directory and follow the sample format
5. `npm run dev` in both backend & frontend folder

#### Sample `.env` file format:

`PORT=3000`
<br>
`MONGODB_URI=mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin`
<br>
`SECRET=secret`
