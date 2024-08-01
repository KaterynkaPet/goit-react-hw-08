import { useState } from 'react'

import './App.css'
import Product from './Product';

const favouriteBooks = [
  { id: "id-1", name: "JS for beginners" },
  { id: "id-2", name: "React basics" },
  { id: "id-3", name: "React Router overview" }
];

const BookList = ({ books }) => {
  return (
		<ul>
			{books.map((book, index) => {
			  return <li key={index}>{book.name}</li>;
			})}
		</ul>
  );
};

const App = () => {
  return (
    <>
			<h1>Books of the week</h1>
      <BookList books={favouriteBooks} />
    </>
  );
};

export default App
