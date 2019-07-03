# Auth APIs
- [POST /auth/login](#auth-post-login)
- [POST /auth/register](#auth-post-register)
___
## 1.POST /auth/register
<a name="auth-post-register" hidden></a>

| Route                | Description                        | Access      |
|:---------------------|:-----------------------------------|:------------|
| POST /auth/register  | Create new user account            | Public      | 
      
## Request 
| Params                | Type              | Validations                               |
|:----------------------|:------------------|:------------------------------------------|
| username              | string            | much be required                          |
| accountname           | string            | much be required & doesn't exist before   |
| password              | string            | much be required & have 8 to 12 words     |
| password2             | string            | much match with password                  |

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| newUser               | object            | Registered information                    |
             
Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |             

Status code: <span style="color: lightcoral">409</span> Conflict

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |            

___
## 2.POST /auth/login

| Params                | Type              | Validations                               |
|:----------------------|:------------------|:------------------------------------------|
| accountname           | string            | much alreally in database                 |
| password              | string            | much match with accountname's password    |            

<a name="auth-post-login" hidden></a>

| Route             | Description                        | Access      |
|:------------------|:-----------------------------------|:------------|
| POST /auth/login  | Login user / Sign JWT              | Public      | 

##Request 

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| userId                | string            | New userId created by DB                  |
| accountname           | string            | User account                              |
| username              | string            | User name                                 |
| token                 | string            | JWT authenticated token sent to client    |                         

Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |  

Status code: <span style="color: lightcoral">404</span> Not Found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |            
