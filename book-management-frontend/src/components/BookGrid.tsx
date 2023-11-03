import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';


interface Book {
    id: number;
    name: string;
    description: string;
}

interface FetchBooksResponse {
    count: number;
    results: Book[]
}

const BookGrid = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        apiClient.get<FetchBooksResponse>('/books')
            .then(res => setBooks(res.data.results))
            .catch(err => setError(err.message));
    })
  return (
    <>
    {error && <Text>{error}</Text>}
    <ul>
        {books.map(book => <li key={book.id}>{book.name}</li>)}
    </ul>
    </>
  )
}

export default BookGrid