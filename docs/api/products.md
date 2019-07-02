# Products APIs
- [GET /api/products](#api-products-get)
- [POST /api/products](#api-products-post)
- [GET /api/products/all](#api-products-all)
- [PATCH /api/products/:id](#api-products-modify-by-id)
- [DELETE /api/products/:id](#api-products-delete-by-id)

___
## 1.GET /api/products
<a name="api-products-get" hidden></a>

| Route                 | Description                        | Access      |
|:----------------------|:-----------------------------------|:------------|
| GET /api/products     | UI Create new product              | Public      |       

## Params
1. name
    - type: string
    - required: true
    - regexp: 
        1. length: min: Number - max: Number
        2. startWith: [a-z] || [A-Z]

___
## 2.POST /api/products
<a name="api-products-post" hidden></a>

| Route                 | Description                        | Access      |
|:----------------------|:-----------------------------------|:------------|
| POST /api/products    | Create new product                 | Private     |       

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| newProduct            | object            | New product information                   |

Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |


Status code: <span style="color: lightcoral">401</span> Unauthorized

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">403</span> Forbidden

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

___
## 3.GET /api/products/all
<a name="api-products-all" hidden></a>

| Route                 | Description                        | Access      |
|:----------------------|:-----------------------------------|:------------|
| GET /api/products/all | Get all products                   | Public      |       

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| products              | [object]          | All products                              |

Status code: <span style="color: lightcoral">404</span> Not Found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

___
## 4.PATCH /api/products/:id
<a name="api-products-modify-by-id" hidden></a>

| Route                   | Description                        | Access      |
|:------------------------|:-----------------------------------|:------------|
| PATCH /api/products/:id | Modify product by id               | Private     |       

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| updatedProduct        | object            | Modified information                      |

Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Unauthorized

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">403</span> Forbidden

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">404</span> Not Found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

___
## 5.DELETE /api/products/:id
<a name="api-products-delete-by-id" hidden></a>

| Route                    | Description                        | Access      |
|:-------------------------|:-----------------------------------|:------------|
| DELETE /api/products/:id | Delete product by id               | Private     |       

## Responses
**application/json** *object*

Status code: <span style="color: lightgreen">200</span> Success

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is successful         |
| deletedProduct        | object            | Deleted information                       |

Status code: <span style="color: lightcoral">400</span> Bad request

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">401</span> Unauthorized

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">403</span> Forbidden

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |

Status code: <span style="color: lightcoral">404</span> Not Found

| Params                | Type              | Description                               |
|:----------------------|:------------------|:------------------------------------------|
| success               | boolean           | Specify the request is failed             |
| error                 | object            | Errors container                          |