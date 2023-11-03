import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Center,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "../../services/graphql";


interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId:string|undefined;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose}) => {
  const [createBook] = useMutation(CREATE_BOOK);
  const{user}=useAuth0()
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

   const handleCreateBook = async () => {
    try {
      await createBook({
        variables: { title, description, userId:user?.sub },
      });
      onClose();
  
    } catch (error:any) {
      console.error('Error creating book:', error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
        <Center>
            Add New Book
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
               type="text"
                   placeholder="Title"
                    value={title}
                  onChange={(e) => setTitle(e.target.value)}
            marginBottom="10px"
          />
          <Input
            placeholder="Description"
            type="text"
           value={description}
            onChange={(e) => setDescription(e.target.value)}
            marginBottom="10px"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue"
          onClick={handleCreateBook}
           >
            Add Book
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal;

// //
// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { CREATE_BOOK } from './graphql';

// function CreateBook() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [userId, setUserId] = useState('');

//   const [createBook] = useMutation(CREATE_BOOK);

//   const handleCreateBook = async () => {
//     try {
//       const { data } = await createBook({
//         variables: { title, description, userId },
//       });

//       // Handle success, e.g., show a success message or redirect to the book list.
//       console.log('Created book:', data.createBook);
//     } catch (error) {
//       // Handle errors, e.g., show an error message to the user.
//       console.error('Error creating book:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Create a Book</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="User ID"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//       />
//       <button onClick={handleCreateBook}>Create</button>
//     </div>
//   );
// }

// export default CreateBook;
