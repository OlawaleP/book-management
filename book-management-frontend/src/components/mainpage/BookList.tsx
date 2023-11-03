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
  Input,
  Text,
  Center,
} from "@chakra-ui/react";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import EditBookModal from "../common/EditBookModal";
import AddBookModal from "../common/AddBookModal";
import {useAuth0} from "@auth0/auth0-react"

interface Book {
  id: number;
  name: string;
  description: string;
}

function BookList() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, name: "Book 1", description: "Description 1" },
    { id: 2, name: "Book 2", description: "Description 2" },
    // Add more books here.
  ]);

  const [newBook, setNewBook] = useState<Book>({ id: 0, name: "", description: "" });
  const [deleteBookId, setDeleteBookId] = useState<number | null>(null);
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [editBookName, setEditBookName] = useState<string>("");
  const [editBookDescription, setEditBookDescription] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);

  const [user1, setUser1] = useState<{ user1name: string } | null>(null);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filteredBooks = books.filter(
      (book) => book.name.toLowerCase().includes(searchTermLower) || book.description.toLowerCase().includes(searchTermLower)
    );
    setBooks(filteredBooks);
  };

  const addNewBook = () => {
    setIsAddingBook(true);
  };

  const markForDeletion = (id: number) => {
    setDeleteBookId(id);
  };

  const cancelDeletion = () => {
    setDeleteBookId(null);
  };

  const confirmDeletion = () => {
    if (deleteBookId !== null) {
      setBooks(books.filter((book) => book.id !== deleteBookId));
      setDeleteBookId(null);
    }
  };

  const openEditModal = (id: number, name: string, description: string) => {
    setEditBookId(id);
    setEditBookName(name);
    setEditBookDescription(description);
  };

  const closeEditModal = () => {
    setEditBookId(null);
  };

  const updateBookDetails = () => {
    if (editBookId !== null) {
      const updatedBooks = books.map((book) =>
        book.id === editBookId
          ? { ...book, name: editBookName, description: editBookDescription }
          : book
      );
      setBooks(updatedBooks);
      setEditBookId(null);
    }
  };
  const{user}=useAuth0()
  return (
    <div>
      <Center>
        <Text fontSize="2xl">{JSON.stringify(user?.email,null,2)}Library</Text>
      </Center>
      <Center>
        <Box borderWidth="1px" borderColor="blue.500" backgroundColor="white" padding="10px" margin="10px" display="flex" width="50%">
        {user1 ? (
          <Text fontSize="lg">Welcome, {user1.user1name}</Text>
        ) : null}
        {user1 ? (
          <Button colorScheme="red" onClick={() => setUser1(null)}>Logout</Button>
        ) : null}
          <Input placeholder="Search for a book" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button colorScheme="blue" onClick={handleSearch} marginLeft="10px">
            Search
          </Button>
          <Button colorScheme="blue" onClick={addNewBook} marginLeft="10px" width="180px">
        Add new book
      </Button>

      <AddBookModal
        isOpen={isAddingBook}
        onClose={() => setIsAddingBook(false)}
        onAddBook={(newBook) => {
          setBooks([...books, { id: books.length + 1, ...newBook }]);
          setNewBook({ id: 0, name: "", description: "" });
        }}
      />
        </Box>
      </Center>
      <Table variant="striped" size="md" margin="10px">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.map((book) => (
            <Tr key={book.id}>
              <Td>{book.id}</Td>
              <Td>{book.name}</Td>
              <Td>{book.description}</Td>
              <Td>
                <Button colorScheme="blue" marginRight="5px" width="25px" height="30px" onClick={() => openEditModal(book.id, book.name, book.description)}>
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
        isOpen={deleteBookId !== null}
        onClose={cancelDeletion}
        bookName={deleteBookId !== null ? books.find((book) => book.id === deleteBookId)?.name : ""}
        onConfirm={confirmDeletion}
      />
      <EditBookModal
        isOpen={editBookId !== null}
        onClose={closeEditModal}
        bookId={editBookId}
        bookName={editBookName}
        bookDescription={editBookDescription}
        onBookNameChange={setEditBookName}
        onBookDescriptionChange={setEditBookDescription}
        onUpdate={updateBookDetails}
      />
    </div>
  );
}

export default BookList;
