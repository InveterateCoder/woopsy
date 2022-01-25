## Task

_API - https://reqres.in/_
_Разработать сервис, считывающий список пользователей (/api/users) и загружающий их в собственную БД (при работе с БД желательно не использовать ORM (Object-Relational Mapping)). Разработать интерфейс поиска пользователей по имени и/или фамилии. БД пользователей должна обновляться раз в минуту. Т. е. при появлении новых пользователей они должны попадать в БД и быть доступными для поиска. Выбор БД — любой. Сервис должен быть разработан на Node.js, интерфейс (самый аскетичный) — также на ваш выбор: React, Angular и подобные._
_Код желательно опубликовать на Github или Gitlab._

## How to start

1. install all the dependencies ```npm i```;
2. in the **.env** file replace **POSTGRES_CONNECTION_URL** with the url to your postgres DB;
3. run the application with ```npm start```;
4. go to **localhost:5002** or other port if you have redifined;

_Application runs in the development mode and for the test purpose only._