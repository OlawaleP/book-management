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

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookName?: string; // Add a default value or make it optional
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookName = "", // Provide a default value
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {bookName !== "" && (
            <Center>
              <p>Are you sure you want to delete {bookName}?</p>
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
