
import {useState, useEffect} from "react";
import BookListings from "../components/BookListings";


const Home = () => {
  const [books, setBooks] = useState(null);
  const [isPending, setIsPending] = useState (true);
  const [error, setError] = useState (null);

  useEffect (() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch ("/api/books");
        if (!res.ok) {throw new Error ("fail to fetched the books");}

        const data = await res.json();

        setBooks (data);
        setIsPending (false);
        setError (null);

      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>{isPending}</div>}
      {books && <BookListings books = {books} /> }
    </div>
  );
};

export default Home;

