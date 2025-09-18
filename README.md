This repository has two folders, one for the backend and one for the frontend. 
Each runs on a separate server, so both servers must be running simultaneously.

Things needs to be in the device environment:
1. PHP
2. composer
3. MySQL server and MySQLWorkbench(optional)
4. node
5. npm

#Database creation & connection
*For marketplace-Laravel folder
1. Create database "marketplace_db"
2. give credentials to Laravel env. file according to device MySQL server
3. run terminal - "php artisan key:generate"
4. run in terminal - "php artisan migrate --seed"
5. run in terminal - "php artisan storage:link"
6. run the server - "php artisan serve"

#Frontend setup
*For marketplace-react folder terminal
1. npm install
2. npm run dev


Admin login fron login page credential:
email: admin@example.com
password: "password123"
