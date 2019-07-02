# Users APIs
- [GET /api/users](#api-users-get)
- [GET /api/users/:id](#api-users-get-by-id)
- [PATCH /api/users/:id](#api-users-patch-by-id)
- [DELETE /api/users/:id](#api-users-del-by-id)
- [GET /api/users/all](#api-users-get-all)

___
## 1.GET /api/users
<a name="api-users-get" hidden></a>

| Route             | Description                        | Access      |
|:------------------|:-----------------------------------|:------------|
| GET /api/users    | Get current user by payloaded info | Private     |       

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| user                  | object            | JWT decoded information                   |


Status code: <span style="color: lightcoral">401</span> Invalid token

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Token is not provided

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

---
## 2.GET /api/users/:id
<a name="api-users-get-by-id" hidden></a>

| Route              | Description                        | Access      |
|:-------------------|:-----------------------------------|:------------|
| GET /api/users/:id | Get user by user's id              | Public      | 

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| username              | string            | User name                                 |


Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

---
## 3.PATCH /api/users/:id (Protected route)
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
| updatedUser           | object            | Modified information                      |

Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Invalid token

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Token is not provided

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Unauthorized

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

___
## 4.DELETE /api/users/:id (Protected route)
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
| deletedUser           | object            | Deleted information                       |

Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Invalid token

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Token is not provided

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Unauthorized

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

___
## 5.GET /api/users/all
<a name="api-users-get-all" hidden></a>

| Route                 | Description                        | Access      |
|:----------------------|:-----------------------------------|:------------|
| GET /api/users/all    | Get all users                      | Private     | 

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| users                 | [object]          | All users                                 |

Status code: <span style="color: lightcoral">401</span> Invalid token

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Token is not provided

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">404</span> Not found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |
