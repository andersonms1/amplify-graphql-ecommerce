/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      createdAt
      price
      user
      status
      address {
        id
        uid
        createdAt
        default
        deliverTo
        ZIP
        state
        city
        neighborhood
        street
        number
        complementation
        updatedAt
      }
      updatedAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      createdAt
      price
      user
      status
      address {
        id
        uid
        createdAt
        default
        deliverTo
        ZIP
        state
        city
        neighborhood
        street
        number
        complementation
        updatedAt
      }
      updatedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      createdAt
      price
      user
      status
      address {
        id
        uid
        createdAt
        default
        deliverTo
        ZIP
        state
        city
        neighborhood
        street
        number
        complementation
        updatedAt
      }
      updatedAt
    }
  }
`;
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
      id
      uid
      createdAt
      default
      deliverTo
      ZIP
      state
      city
      neighborhood
      street
      number
      complementation
      updatedAt
    }
  }
`;
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
      id
      uid
      createdAt
      default
      deliverTo
      ZIP
      state
      city
      neighborhood
      street
      number
      complementation
      updatedAt
    }
  }
`;
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
      id
      uid
      createdAt
      default
      deliverTo
      ZIP
      state
      city
      neighborhood
      street
      number
      complementation
      updatedAt
    }
  }
`;
