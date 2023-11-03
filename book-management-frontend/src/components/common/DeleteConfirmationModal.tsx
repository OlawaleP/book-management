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
} from "@chakra-ui/react";
 import { useMutation } from "@apollo/client";
import { DELETE_BOOK } from "../../services/graphql";
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string; // Add a default value or make it optional
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookId, // Provide a default value
}) => {
  const [deleteBook] = useMutation(DELETE_BOOK);
  
  const onConfirm=async()=>{
      await deleteBook({
        variables: { id:bookId, },
      });
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {bookId !== "" && (
            <Center>
              <p>Are you sure you want to delete {bookId}?</p>
            </Center>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onConfirm} marginRight="10px">
            Yes
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
