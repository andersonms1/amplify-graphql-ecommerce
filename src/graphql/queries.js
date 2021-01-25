/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      createdAt
      title
      description
      price
      category
      subCategory
      sold
      amount {
        size
        amount
      }
      brand
      photos {
        bucket
        region
        key
        position
      }
      avaliation
      comments {
        items {
          id
          user
          content
          avaliation
          product {
            id
            createdAt
            title
            description
            price
            category
            subCategory
            sold
            brand
            avaliation
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      user
      content
      avaliation
      product {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        content
        avaliation
        product {
          id
          createdAt
          title
          description
          price
          category
          subCategory
          sold
          amount {
            size
            amount
          }
          brand
          photos {
            bucket
            region
            key
            position
          }
          avaliation
          comments {
            nextToken
          }
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      createdAt
      price
      user
      status
      products {
        product {
          id
          createdAt
          title
          description
          price
          category
          subCategory
          sold
          amount {
            size
            amount
          }
          brand
          photos {
            bucket
            region
            key
            position
          }
          avaliation
          comments {
            nextToken
          }
          updatedAt
        }
        amount {
          size
          amount
        }
      }
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        price
        user
        status
        products {
          product {
            id
            createdAt
            title
            description
            price
            category
            subCategory
            sold
            brand
            avaliation
            updatedAt
          }
          amount {
            size
            amount
          }
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      id
      user
      createdAt
      deliverTo
      zip
      uf
      city
      neighborhood
      street
      complement
      phone
      number
      updatedAt
    }
  }
`;
export const listAddresss = /* GraphQL */ `
  query ListAddresss(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        createdAt
        deliverTo
        zip
        uf
        city
        neighborhood
        street
        complement
        phone
        number
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategory = /* GraphQL */ `
  query ProductsByCategory(
    $category: String
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategory(
      category: $category
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategoryCreatedAt = /* GraphQL */ `
  query ProductsByCategoryCreatedAt(
    $category: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategoryCreatedAt(
      category: $category
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategoryPrice = /* GraphQL */ `
  query ProductsByCategoryPrice(
    $category: String
    $price: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategoryPrice(
      category: $category
      price: $price
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategoryAvaliation = /* GraphQL */ `
  query ProductsByCategoryAvaliation(
    $category: String
    $avaliation: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategoryAvaliation(
      category: $category
      avaliation: $avaliation
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategoryBrand = /* GraphQL */ `
  query ProductsByCategoryBrand(
    $category: String
    $brand: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategoryBrand(
      category: $category
      brand: $brand
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategorySold = /* GraphQL */ `
  query ProductsByCategorySold(
    $category: String
    $sold: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategorySold(
      category: $category
      sold: $sold
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategorySubCategory = /* GraphQL */ `
  query ProductsByCategorySubCategory(
    $category: String
    $subCategory: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategorySubCategory(
      category: $category
      subCategory: $subCategory
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategorySubCategoryCreatedAt = /* GraphQL */ `
  query ProductsByCategorySubCategoryCreatedAt(
    $category: String
    $subCategoryCreatedAt: ModelProductByCatSubCatCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategorySubCategoryCreatedAt(
      category: $category
      subCategoryCreatedAt: $subCategoryCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategorySubCategoryPrice = /* GraphQL */ `
  query ProductsByCategorySubCategoryPrice(
    $category: String
    $subCategoryPrice: ModelProductByCatSubCatPriceCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategorySubCategoryPrice(
      category: $category
      subCategoryPrice: $subCategoryPrice
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategorySubCategorySold = /* GraphQL */ `
  query ProductsByCategorySubCategorySold(
    $category: String
    $subCategorySold: ModelProductByCatSubCatSoldCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategorySubCategorySold(
      category: $category
      subCategorySold: $subCategorySold
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategorySubCategoryBrand = /* GraphQL */ `
  query ProductsByCategorySubCategoryBrand(
    $category: String
    $subCategoryBrand: ModelProductByCatSubCatBrandCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategorySubCategoryBrand(
      category: $category
      subCategoryBrand: $subCategoryBrand
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByCategorySubCategoryBrandCreatedAt = /* GraphQL */ `
  query ProductsByCategorySubCategoryBrandCreatedAt(
    $category: String
    $subCategoryBrandCreatedAt: ModelProductByCatSubCatBrandCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategorySubCategoryBrandCreatedAt(
      category: $category
      subCategoryBrandCreatedAt: $subCategoryBrandCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        title
        description
        price
        category
        subCategory
        sold
        amount {
          size
          amount
        }
        brand
        photos {
          bucket
          region
          key
          position
        }
        avaliation
        comments {
          items {
            id
            user
            content
            avaliation
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const ordersByUserCreatedAt = /* GraphQL */ `
  query OrdersByUserCreatedAt(
    $user: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByUserCreatedAt(
      user: $user
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        price
        user
        status
        products {
          product {
            id
            createdAt
            title
            description
            price
            category
            subCategory
            sold
            brand
            avaliation
            updatedAt
          }
          amount {
            size
            amount
          }
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const ordersByStatusCreatedAt = /* GraphQL */ `
  query OrdersByStatusCreatedAt(
    $status: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByStatusCreatedAt(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        price
        user
        status
        products {
          product {
            id
            createdAt
            title
            description
            price
            category
            subCategory
            sold
            brand
            avaliation
            updatedAt
          }
          amount {
            size
            amount
          }
        }
        updatedAt
      }
      nextToken
    }
  }
`;
