# hngx-task2-crud_app
## setup

this API is solely written in nodejs and the database is a mongodb docker image runing on a remote aws ec2 instance.
to setup the API on your local machine you need nodejs install and curl for testing endpint and stable internet connection for connection to the database. clone the repo and run the commands below.

## Running the API
- run   `npm install` to download the dependencies
- run `npm start ` to start the server. and a seccess message will be logged on the console

## API REFERENCE
creating user
`POST /api`

```bash
$ curl -H "Content-Type: application/json" -d "{\"name\": \"john doe\"}" http://localhost:8080/api
```
#### Response 
```json
{
    "message":"Person created successfully",
    "newPerson":{
        "name":"david",
        "_id":"64ff4375a4c23d8fcb95a4f5",
        "__v":0
        }
}
```


`GET /api/:user_id`

 #### Returns detail of Person

 #### Sample Request
 ```bash
$ curl -X GET http://localhost:8080/api/6500e0474b2d1b2cc4f144b9
 ```

#### Response

```json
 {
  "person": [**
    {**
        "_id":"6500e0474b2d1b2cc4f144b9",
        "name":"john",
        "__v":0
    }
  ]
 }
```

`PATCH /api/:user_id`

#### Modify person detail

#### Sample Request

```bash
$ curl -X PATCH -H "Content-Type: application/json" -d '{\"name\": \"henry\"}' http://localhost:8080/api/6500e0474b2d1b2cc4f144b9
```

#### Response

```json
 {
    "message":"Successfully Updated",
    "updatedPerson": {
        "_id":"6500e0474b2d1b2cc4f144b9",
        "name":"tomson",
        "__v":0
    }
}
```

`DELETE /api/:user_id`

##### Delete a person

#### Sample Request

```bash
$ curl -X DELETE http://localhost:8080/api/6500e0474b2d1b2cc4f144b9
```

#### Response
```json
{
    "message":"Person successfully deleted",
    "deletedPerson":{
        "_id":"6500e0474b2d1b2cc4f144b9",
        "name":"tomson",
        "__v":0
    }
}

```


