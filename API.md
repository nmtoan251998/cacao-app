# APIs
- [POST /auth/login](#auth-post-login)
- [POST /auth/register](#auth-post-register)
- [GET /api/users](#api-users-get)
- [GET /api/users/:id](#api-users-get-by-id)
- [PATCH /api/users/:id](#api-users-patch-by-id)
- [DELETE /api/users/:id](#api-users-del-by-id)
- [GET /api/users/all](#api-users-get-all)


## 1.POST /auth/login

<a name="auth-post-login" hidden></a>

| Route             | Description                        | Access      |
|:------------------|:-----------------------------------|:------------|
| POST /auth/login  | Login user / Sign JWT              | Public      | 

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| userId                | string            | New userId created by DB                  |
| accountname           | string            | User account                              |
| username              | string            | User name                                 |
| token                 | string            | JWT authenticated token sent to client    |                         

Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| error                 | object            | Error validating user's input             |

Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| error                 | object            | User not found                            |


___
## 2.POST /auth/register
<a name="auth-post-register" hidden></a>

| Route                | Description                        | Access      |
|:---------------------|:-----------------------------------|:------------|
| POST /auth/register  | Create new user account            | Public      | 
      

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| msg                   | string            | Success message                           |
             
Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| error                 | object            | Error validating user's input             |
             
Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| error                 | object            | User not found                            |

Status code: <span style="color: lightcoral">409</span> Conflict resource

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| error                 | object            | Account already axists                    |

---
## 3.GET /api/users
<a name="api-users-get" hidden></a>

| Route             | Description                        | Access      |
|:------------------|:-----------------------------------|:------------|
| GET /api/users    | Get current user by payloaded info | Private     |       

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| user                  | object            | User payloaded infor                      |


Status code: <span style="color: lightcoral">401</span> Invalid token

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |


Status code: <span style="color: lightcoral">401</span> Token is not provided

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

---
## 4.GET /api/users/:id
<a name="api-users-get-by-id" hidden></a>

| Route              | Description                        | Access      |
|:-------------------|:-----------------------------------|:------------|
| GET /api/users/:id | Get user by user's id              | Public      | 

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| username              | string            | User name                                 |


Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

---
## 5.PATCH /api/users/:id (Protected route)
<a name="api-users-patch-by-id" hidden></a>

| Route                 | Description                        | Access      |
|:----------------------|:-----------------------------------|:------------|
| PATCH /api/users/:id  | Modify user by user's id           | Private     |     

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| msg                   | string            | Success message                           |

Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">401</span> Invalid token

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">401</span> Token is not provided

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">401</span> Unauthorized

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

---
## 6.DELETE /api/users/:id (Protected route)
<a name="api-users-del-by-id" hidden></a>

| Route                 | Description                        | Access      |
|:----------------------|:-----------------------------------|:------------|
| DELETE /api/users/:id | Delete user by user's id           | Private     | 

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| msg                   | string            | Success message                           |

Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">401</span> Invalid token

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">401</span> Token is not provided

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">401</span> Unauthorized

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

---
## 7.GET /api/users/all
<a name="api-users-get-all" hidden></a>

| Route                 | Description                        | Access      |
|:----------------------|:-----------------------------------|:------------|
| GET /api/users/all    | Get all users                      | Private     | 

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| users                 | [object]          | All users                                 |

Status code: <span style="color: lightcoral">401</span> Invalid token

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">401</span> Token is not provided

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |

Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| msg                   | string            | Error message                             |
