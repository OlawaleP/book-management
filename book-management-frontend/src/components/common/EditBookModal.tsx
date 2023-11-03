import React from "react";
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

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number | null;
  bookName: string;
  bookDescription: string;
  onBookNameChange: (value: string) => void;
  onBookDescriptionChange: (value: string) => void;
  onUpdate: () => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
  bookId,
  bookName,
  bookDescription,
  onBookNameChange,
  onBookDescriptionChange,
  onUpdate,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Input value={String(bookId)} isDisabled/>
            <Input value={bookName} onChange={(e) => onBookNameChange(e.target.value)}/>
            <Input value={bookDescription} onChange={(e) => onBookDescriptionChange(e.target.value)} />
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
