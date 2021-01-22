# Database Modeling

NoSQL Workbench-linux-x86_64-2.1.0



## Data Modeling


- Legend
- pk: **bold**
- sk: *italic*



## Product

- User
  - Queries
    - Get product by **category**
      - and *price*
      - and *createdAt*
      - and *avaliations*
      - and *brand*
      - and *sold*

    - Get products by **category**, [*subcategory*](##productsByCategorySubCategory)
        - and [*price*](#product)
        - and *createAt*
        - and *avaliations*
        - and *brand*
        - and *sold*

- Admin
  - Mutation
    - Create/Update [*product*](##Mutation1)
    - Delete? Really delete or only change status? Better delete at all, bc the queries get another level of complexity 

## Order

- User
  - Queries
    - Get orders by **user** *createdAt*  
    - Get orders by **status** *create_at*
  - Mutations
    - Create order

- Admin
    - Get orders by **status** *createdAt*
    - Get orders by **status** *clientId* *createdAt*

## Address
  - User
    - Get address by **user** *createdAt*


```gql


type Product @model 
@key(name: "byCat", fields: ["category"], queryField: "productsByCategory")
@key(name: "byCatCreatedAt", fields: ["category", "createdAt"], queryField: "productsByCategoryCreatedAt")
@key(name: "byCatPrice", fields: ["category", "price"], queryField: "productsByCategoryPrice")
@key(name: "byCatAvaliations", fields: ["category", "avaliation"], queryField: "productsByCategoryAvaliation")
@key(name: "byCatBrand", fields: ["category", "brand"], queryField: "productsByCategoryBrand")
@key(name: "byCatSold", fields: ["category", "sold"], queryField: "productsByCategorySold")
@key(name: "byCatSubCat", fields: ["category", "subCategory"], queryField: "productsByCategorySubCategory")
@key(name: "byCatSubCatCreatedAt", fields: ["category", "subCategory", "createdAt"], queryField: "productsByCategorySubCategoryCreatedAt")
@key(name: "byCatSubCatPrice", fields: ["category", "subCategory", "price"], queryField: "productsByCategorySubCategoryPrice")
@key(name: "byCatSubCatSold", fields: ["category", "subCategory", "sold"], queryField: "productsByCategorySubCategorySold")
@key(name: "byCatSubCatBrand", fields: ["category", "subCategory", "brand"], queryField: "productsByCategorySubCategoryBrand")
@key(name: "byCatSubCatBrandCreatedAt", fields: ["category", "subCategory", "brand", "createdAt"], queryField: "productsByCategorySubCategoryBrandCreatedAt")
{
  id: ID!
  createdAt: String!
  title: String!
  description: String!
  price: Float!
  category: String!
  subCategory: String!
  sold: Int!
  amount: [Amount]
  brand: String
  photos: [S3Object]
  avaliation: Float
  comments: [Comment] @connection(name: "ProductComments")
}

type Comment @model {
  id: ID!
  user: String!
  content: String!
  avaliation: Float!
  product: Product @connection(name: "ProductComments")
}

type S3Object {
    bucket: String!
    region: String!
    key: String!
    position: String!
}

type Amount {
  size: String
  amount: Int
}



type Order @model
@key(name: "byUserCreatedAt", fields: ["user", "createdAt"], queryField: "ordersByUserCreatedAt")
@key(name: "byStatusCreatedAt", fields: ["status", "createdAt"], queryField: "ordersByStatusCreatedAt")

{
  id: ID!
  createdAt: String!
  price: Float!
  user: String!
  status: String!
  products: [Products]

}

type Products {
  product: Product
  amount: Amount
}

type Address @model

{
  id: ID!
  user: String!
  createdAt: String!
  deliverTo: String
  zip: String!
  uf: String!
  city: String!
  neighborhood: String!
  street: String!
  complement: String
  phone: String!
  number: String!

}

```

# Queries/Mutations

## Mutation1
```gql
mutation createProducts {
  createProduct(input: {title: "Camisa social preta", description: "Description1", price: 1.5, category: "category1", subCategory: "subCategory1", sold: 10, brand: "brand"}) {
    id
  }
}
```

## productsByCategorySubCategory

``` gql
query getProductByCategorySubCategory {
  productsByCategorySubCategory(category: "category1", subCategory: {eq: "subCategory1"}) {
    nextToken
    items {
      id
      title
    }
  }
}

```

## productsByCategorySubCategoryPrice

- Maior ou igual
``` gql
query productsByCategorySubCategoryPrice {
  productsByCategorySubCategoryPrice(category: "category1", subCategoryPrice: {ge: {price: 1.5, subCategory: "subCategory1"}}) {
    nextToken
    items {
      id
      price
    }
  }
}
```
- Menor ou igual
``` gql


```



    

# Queries Examples
```javascript

query MyQuery2 {
  productsByCategorySubCategory(category: "MAN", subCategory: {eq: "SHIRT"}) {
    nextToken
    items {
      id
      description
      createdAt
      price
      sold
    }
  }
}

query MyQuery2($category: String = "MAN", $eq: String = "SHIRT") {
  productsByCategorySubCategory(category: $category, subCategory: {eq: $eq}) {
    nextToken
    items {
      id
      description
      createdAt
      price
      sold
    }
  }
}

query MyQuery {
  productsByCategorySubCategorySold(category: "MAN", subCategorySold: {ge: {sold: 10, subCategory: "SHIRT"}}) {
    items {
      id
      category
      subCategory
      sold
    }
  }
}
query MyQuery($subCategory: String = "SHIRT", $sold: Int = 10, $category: String = "MAN") {
  productsByCategorySubCategorySold(category: $category, subCategorySold: {ge: {sold: $sold, subCategory: $subCategory}}) {
    items {
      id
      category
      subCategory
      sold
    }
  }
}
```    
[Custom foo description](#product)