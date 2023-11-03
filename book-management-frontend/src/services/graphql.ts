import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  query GetAllBooks($userId: String) {
    Books(userId: $userId) {
      id
      title
      description
      userId
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: Int!) {
    Book(id: $id) {
      id
      title
      description
      userId
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $description: String, $userId: String) {
    createBook(title: $title, description: $description, userId: $userId) {
      id
      title
      description
      userId
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String, $description: String, $userId: String) {
    updateBook(id: $id, title: $title, description: $description, userId: $userId) {
      id
      title
      description
      userId
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
      description
      userId
    }
  }
`;