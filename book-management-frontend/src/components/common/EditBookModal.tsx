import React, { useState } from "react";
import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { UPDATE_BOOK } from "../../services/graphql";
import { useMutation } from "@apollo/client";
interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookToEdit:any;
  userId:string|undefined;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
 bookToEdit,
  userId
}) => {
  const [updateBook] = useMutation(UPDATE_BOOK);

  const [form,setForm]= useState({
    title:bookToEdit.title,
    description:bookToEdit.description,
  })


  const handleChange=(e:any)=>{
    e.preventDefault();
    setForm((prev)=>({...prev,[e.target.name]:e.target.value}))
  }


const onUpdate=async()=>{
  await updateBook({
    variables: { id:bookToEdit.id,...form, userId },
  });
  onClose()
}


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            {/* <Input value={String(bookId)} isDisabled/> */}
          
            <Input 
            value={form.title}
              name="title"
              onChange={handleChange}/>
            <Input 
            value={form.description} 
            name="description"
            onChange={handleChange} />
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onUpdate}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBookModal;
