/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress {
    onCreateAddress {
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
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress {
    onUpdateAddress {
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
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress {
    onDeleteAddress {
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
