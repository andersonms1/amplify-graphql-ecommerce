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
      avaliation
      photos {
        bucket
        region
        key
        position
      }
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
      avaliation
      photos {
        bucket
        region
        key
        position
      }
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
      avaliation
      photos {
        bucket
        region
        key
        position
      }
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
        avaliation
        photos {
          bucket
          region
          key
          position
        }
        comments {
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
        avaliation
        photos {
          bucket
          region
          key
          position
        }
        comments {
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
        avaliation
        photos {
          bucket
          region
          key
          position
        }
        comments {
          nextToken
        }
        updatedAt
      }
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
        avaliation
        photos {
          bucket
          region
          key
          position
        }
        comments {
          nextToken
        }
        updatedAt
      }
      status
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
        avaliation
        photos {
          bucket
          region
          key
          position
        }
        comments {
          nextToken
        }
        updatedAt
      }
      status
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
        avaliation
        photos {
          bucket
          region
          key
          position
        }
        comments {
          nextToken
        }
        updatedAt
      }
      status
      paidAt
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
      product {
        items {
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
        nextToken
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
      product {
        items {
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
        nextToken
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
      product {
        items {
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
        nextToken
      }
      updatedAt
    }
  }
`;
