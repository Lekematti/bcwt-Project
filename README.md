# Instruction
Project is designed for students who enjoy seeking and posting pictures
of their overalls and patches. So basically the user of this website is either
student or someone who is interested this stuff. Below this is the instructions
how to get started with our application. You will find more help to 
this project from stackoverflow.com
### First step: create a .env file to root and put this in there:
DB_HOST="localhost"
DB_NAME=""
DB_USER=""
DB_PASSWORD=""
JWT_SECRET=""

### Second: run npm install and the following after. (Note: run npm in terminal):
1. npm i -g nodemon
2. npm i express
3. npm i express-validator
4. npm i cors
5. npm i multer
6. npm i mysql2
7. npm i bcryptjs
8. npm i jsonwebtoken
9. npm i passport
10. npm i passport-local
11. npm i passport-jwt
12. npm i npm i dotenv

### Third: make a file to root named .gitignore and in the file it should have these:
1. node_modules/
2. jspm_packages/
3. .env
4. uploads/*
5. !uploads/.gitkeep

### Fourth: create an uploads folder to root and make a file there named .gitkeep

##### End of instructions :)
