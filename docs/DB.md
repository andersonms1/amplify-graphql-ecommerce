# Database Modeling

## Product

- User
    - Get products by category, subcategory
        - and price
        - and avaliations
        - and createAt
        - and brand
        - and most sold
- Admin
    - Get products by createAt
    - Get products by amount
        - sort by greater
        - sort by less
## Order

- User
    - Get orders by status
        - sort by create_at
- Admin
    - Get orders by client
    - Get orders by createdAt
    

# Queries
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