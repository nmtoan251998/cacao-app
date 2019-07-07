## 1.GET /api/products/all
<a name="api-products-get" hidden></a>

| Route                 | Description                        | Access      |
|:----------------------|:-----------------------------------|:------------|
| GET /api/products/all | UI Get All Products                | Public      |       

## Params
1. _id
    - type: string
    - required: true
    - regexp: mongoose_id
2. name
    - type: string
    - required: true
    - regexp: 
        1. length: min: 1 - max: 100
        2. startWith: [a-z] || [A-Z]
3. type
    - type: string
    - required: true
    - regexp: 
        1. length: min: 1 - max: 10
        2. startWith: [a-zA-Z]
        3. oneOf: ['food','drinks']
4. image
    - type: string
    - required: optional
    - regexp: length: min: 1 - max: 1000
5. price
    - type: number
    - required: true
    - regexp: length: min: 3
6. description 
    - type: string
    - required: optional
    - regexp: length: min: 10 - max: 150
7. featured
    - type: boolean
    - required: true
## 1.GET /api/products/:id
<a name="api-products-get" hidden></a>

| Route                 | Description                        | Access      |
|:----------------------|:-----------------------------------|:------------|
| GET /api/products/:id | UI Get Product By Id               | Public      |       

## Params
1. _id
    - type: string
    - required: true
    - regexp: mongoose_id
2. name
    - type: string
    - required: true
    - regexp: 
        1. length: min: 1 - max: 100
        2. startWith: [a-z] || [A-Z]
3. type
    - type: string
    - required: true
    - regexp: 
        1. length: min: 1 - max: 10
        2. startWith: [a-zA-Z]
        3. oneOf: ['food','drinks']
4. image
    - type: string
    - required: optional
    - regexp: length: min: 1 - max: 1000
5. price
    - type: number
    - required: true
    - regexp: length: min: 3
6. description 
    - type: string
    - required: optional
    - regexp: length: min: 10 - max: 150
7. featured
    - type: boolean
    - required: true
