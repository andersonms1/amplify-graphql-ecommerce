/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      title
      description
      price
      category
      amount
      photos {
        bucket
        region
        key
        position
      }
      avaliation
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      title
      description
      price
      category
      amount
      photos {
        bucket
        region
        key
        position
      }
      avaliation
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      title
      description
      price
      category
      amount
      photos {
        bucket
        region
        key
        position
      }
      avaliation
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCart = /* GraphQL */ `
  subscription OnCreateCart {
    onCreateCart {
      id
      products {
        id
        title
        description
        price
        category
        amount
        photos {
          bucket
          region
          key
          position
        }
        avaliation
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
export const onUpdateCart = /* GraphQL */ `
  subscription OnUpdateCart {
    onUpdateCart {
      id
      products {
        id
        title
        description
        price
        category
        amount
        photos {
          bucket
          region
          key
          position
        }
        avaliation
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
export const onDeleteCart = /* GraphQL */ `
  subscription OnDeleteCart {
    onDeleteCart {
      id
      products {
        id
        title
        description
        price
        category
        amount
        photos {
          bucket
          region
          key
          position
        }
        avaliation
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
export const onCreateHistory = /* GraphQL */ `
  subscription OnCreateHistory {
    onCreateHistory {
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
export const onUpdateHistory = /* GraphQL */ `
  subscription OnUpdateHistory {
    onUpdateHistory {
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
export const onDeleteHistory = /* GraphQL */ `
  subscription OnDeleteHistory {
    onDeleteHistory {
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
