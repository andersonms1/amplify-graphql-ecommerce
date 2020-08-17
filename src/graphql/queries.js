/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      title
      description
      price {
        cents
        specie
      }
      avaliation
      category
      amount
      photos {
        bucket
        region
        key
      }
      createdAt
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
        title
        description
        price {
          cents
          specie
        }
        avaliation
        category
        amount
        photos {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCart = /* GraphQL */ `
  query GetCart($id: ID!) {
    getCart(id: $id) {
      id
      products {
        id
        title
        description
        price {
          cents
          specie
        }
        avaliation
        category
        amount
        photos {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      status
      price {
        cents
        specie
      }
      createAt
      paidAt
      createdAt
      updatedAt
    }
  }
`;
export const listCarts = /* GraphQL */ `
  query ListCarts(
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        products {
          id
          title
          description
          avaliation
          category
          amount
          createdAt
          updatedAt
        }
        status
        price {
          cents
          specie
        }
        createAt
        paidAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHistory = /* GraphQL */ `
  query GetHistory($id: ID!) {
    getHistory(id: $id) {
      id
      user
      carts {
        items {
          id
          status
          createAt
          paidAt
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listHistorys = /* GraphQL */ `
  query ListHistorys(
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        carts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
