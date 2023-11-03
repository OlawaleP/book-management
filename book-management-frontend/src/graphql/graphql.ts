import {gql} from "@apollo/client"

export const GET_BOOKS= gql`
query{
  Books($userId:String!){
    books(input:{userId:$userId}){
        id,
    title,
    description,
    }
  }
}
`

export const CREATE_BOOK = gql`
  mutation
  createBook(title:String!,description: String!,userId:String!"){
    createBook(title:$title,description:$description,userId:$userId){
        id,
    title,
    description,
    userId        
        }
}
`
export const EDIT_BOOK=gql`
    mutation{
updateBook(id:2,title:$title,description:$description){
  title,
  description
}
}
`
export const DELETE_BOOK=gql`
    mutation
deleteBook(id: id) {
  deleteBook(id){
    id
  }
}

`