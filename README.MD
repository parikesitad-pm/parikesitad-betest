# backendMicroservices

online on
`https://ms-parikesitad-betest.herokuapp.com/`

microservices
get clone this repo

## install

yarn install

### POST - Login

```
http://localhost:8000/user/login

Content-Type: application/json
{
  "emailAddress": "admin@gmicroservices.co"
}
```

### GET - Get User List

```
http://localhost:8000/user/all
authorization: token
```

### GET - Get User By Account Number

```
http://localhost:8000/user/account/{accountNumber}
authorization: token
```

### GET - Get User By Identity Number

```
http://localhost:8000/user/ID/{identityNumber}
authorization: token
```

### POST - Add New User

```
http://localhost:8000/user
authorization: token
{
  newUser
}
```

### PUT - Update User

```
http://localhost:8000/user
authorization: token
{
  newUser
}
```

### DELETE - Delete User

```
http://localhost:8000/user/{id}
authorization: token
```
