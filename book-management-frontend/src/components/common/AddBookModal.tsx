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

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (newBook: { name: string; description: string }) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAddBook }) => {
  const [newBook, setNewBook] = useState({ name: "", description: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewBook({
      ...newBook,
      [field]: e.target.value,
    });
  };

  const handleAddBook = () => {
    onAddBook(newBook);
    onClose();
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
            placeholder="Name"
            value={newBook.name}
            onChange={(e) => handleInputChange(e, "name")}
            marginBottom="10px"
          />
          <Input
            placeholder="Description"
            value={newBook.description}
            onChange={(e) => handleInputChange(e, "description")}
            marginBottom="10px"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleAddBook}>
            Add Book
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal;
