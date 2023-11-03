import { useState } from "react";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Center,
} from "@chakra-ui/react";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import EditBookModal from "../common/EditBookModal";
import AddBookModal from "../common/AddBookModal";
import{useQuery} from "@apollo/client"
import { GET_ALL_BOOKS, } from "../../services/graphql";
import {useAuth0} from "@auth0/auth0-react"

// interface Book {
//   id: number;
//   name: string;
//   description: string;
// }

function BookList() {
const {user}=useAuth0();

const { loading, error, data } = useQuery(GET_ALL_BOOKS,{
  variables:{userId:user?.sub}
});


  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);
  const[isEditingBook,setIsEditingBook]=useState<boolean>(false);

  const addNewBook = () => {
    setIsAddingBook(true);
  };

  const [bookToEdit,setBookToEdit]=useState({
    id:"",
    title:"",
    description:""
  })

  const [bookId,setBookId]=useState<string>(
    ""
  );
  const [deleteModal,setDeleteModal]=useState(false)
  
  // const editBook=()=>{
  //   setIsEditingBook(true)
  // }
  const markForDeletion = (id: string) => {
      setBookId(id)
      setDeleteModal(true);
  };

  const cancelDeletion = () => {
    setDeleteModal(false);
  };

  const confirmDeletion = () => {
    // if (deleteBookId !== null) {
    //   setBooks(books.filter((book) => book.id !== deleteBookId));
    //   setDeleteBookId(null);
    // }
  };

  const openEditModal = ( id:string,title: string, description: string) => {
    setBookToEdit({id,title,description});
    setIsEditingBook(true)

  };
 

  const closeEditModal = () => {
    setIsEditingBook(false)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <Center>
        <Text fontSize="2xl">{JSON.stringify(user?.email,null,2)}Library</Text>
      </Center>
      <Center>
        <Box borderWidth="1px" borderColor="blue.500" backgroundColor="white" padding="10px" margin="10px" display="flex" width="50%">  
         <Button colorScheme="blue" onClick={addNewBook} marginLeft="10px" width="180px">
        Add new book
      </Button> 
      <AddBookModal
        isOpen={isAddingBook}
        onClose={() => setIsAddingBook(false)}
        userId={user?.sub}
      />
        </Box>
      </Center>
      <Table variant="striped" size="md" margin="10px">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.Books.map((book:{id:string,title:string,description:string}) => (
            <Tr key={book.id}>
              <Td>{book.id}</Td>
              <Td>{book.title}</Td>
              <Td>{book.description}</Td>
              <Td>
                <Button colorScheme="blue" marginRight="5px" width="25px" height="30px" onClick={() => openEditModal(book.id,book.title,book.description)}>
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => markForDeletion(book.id)} height="30px">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <DeleteConfirmationModal
        isOpen={deleteModal}
        bookId={bookId}
        onClose={cancelDeletion}
        onConfirm={confirmDeletion}
      />
      <EditBookModal
        isOpen={isEditingBook}
        onClose={closeEditModal}
        bookToEdit={bookToEdit}
        userId={user?.sub}
      />
    </div>
  );
}

export default BookList;
