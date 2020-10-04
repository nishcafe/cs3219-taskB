# cs3219-taskB [![Build Status](https://travis-ci.org/nishcafe/cs3219-taskB.svg?branch=master)](https://travis-ci.org/nishcafe/cs3219-taskB)

A simple Javascript backend and REST API with NodeJs, ExpressJs, MongoDB.

### To start
1. `npm install` to install node modules
2. `mongod` to start local mongodb database
2. `nodemon index` to start food diary app

### Food Diary Operations
A food diary is used to illustrate API calls. Each food entry is has a required field `name` and optional fields `calories` & `price`. Each entry is also tagged with a unique `id`:
```
"data": {
        "_id": "5f72ec89eaa38000178a498a",
        "name": "hot chocolate",
        "calories": 500,
        "price": 4.5,
        "__v": 0
        }
```

* `GET`, `http://localhost:8080/api/food` : To get all entries in the food diary.
* `PUT`, `http://localhost:8080/api/food`,  : To create a new entry in the food diary, with fields specified in Body key-value table of Postman.
* `PATCH`, `http://localhost:8080/api/food/:id` : To edit an entry, specified by `id` in Path Variables & fields to edit specified in Body key-value table of Postman.
* `DELETE`, `http://localhost:8080/api/food/:id` : To delete an entry, specified by `id` in Path Variables of Postman.




Deployed endpoints can be accessed at: [https://nishcafe-fooddiary.herokuapp.com/](https://nishcafe-fooddiary.herokuapp.com/)

### To run tests locally (Task B2)
1. `mongod` to start local mongodb (test) database
2. `npm test` to run all tests
