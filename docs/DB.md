# Database Modeling

NoSQL Workbench-linux-x86_64-2.1.0



## Data Modeling
```gql
type Product @model 
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
  amount: [Amount]!
  brand: String
  photos: [S3Object]
  avaliation: Float
  comments: [Comment] @connection(name: "ProductComments")
}

type Amount {
  size: String
  amount: Int
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

type Order @model
@key(name: "byUserCreatedAt", fields: ["user", "createdAt"], queryField: "ordersByUserCreatedAt")
@key(name: "byUserStatus", fields: ["user", "status"], queryField: "ordersByUserStatus")
@key(name: "byStatusCreatedAt", fields: ["status", "createdAt"], queryField: "ordersByStatusCreatedAt")

{
  id: ID!
  createdAt: String!
  price: Float!
  user: String!
  status: String!
  selection: [Selection]!
  address: Address 

}

type Selection {
  pid: String!
  amount: Amount!
}

type Address @model
@key(name: "byUserDefault", fields: ["uid", "default"], queryField: "addressesByUserDefault")
@key(name: "byUserCreatedAt", fields: ["uid", "createdAt"], queryField: "addressesByUserCreatedAt")
{  
  id: ID!
  uid: String!
  createdAt: String!
  default: String!
  deliverTo: String!
  ZIP: String!
  state: String!
  city: String!
  neighborhood: String!
  street: String!
  number: Int  
  complementation: String
}

```    



## Product

- User
  - Queries
    - Get products by **category**, [*subcategory*](##productsByCategorySubCategory)
        - and [*price*](#product)
        - and *createAt*
        - and *avaliations*
        - and *brand*
        - and *sold*

- Admin
  - Mutation
    - Create a [*product*](##Mutation1)
  - Queries
    - List **products** by id *createAt*
    - Get **products** by *amount*
        - sort by greater
        - sort by less
## Order

- System
  - Get address from **user** *createdAt*
- User
  - Queries
    - Get orders by **id** *createdAt*  
    - Get orders by **status** *create_at*
  - Mutations
    - Create order

- Admin
    - Get orders by client
    - Get orders by createdAt
    - Get orders by **status** *createdAt*

  
# Real Queries/Mutations

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
```gql

type Product @model 
@key(name: "byCat", fields: ["category"], queryField: "productsByCategory")
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
@key(name: "byUserStatus", fields: ["user", "status"], queryField: "ordersByUserStatus")
@key(name: "byStatusCreatedAt", fields: ["status", "createdAt"], queryField: "ordersByStatusCreatedAt")

{
  id: ID!
  createdAt: String!
  price: Float!
  user: String!
  status: String!
  product: [Product] @connection

}

```

[Custom foo description](#product)