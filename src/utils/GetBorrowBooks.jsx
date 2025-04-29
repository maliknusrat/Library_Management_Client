
import { useEffect, useState } from "react";
import axios from "axios";
import GetUserInfo from "./GetUserInfo"; // assuming you have this function

const useBorrowBooks = () => {
  const user = GetUserInfo();
  const [books, setBooks] = useState([]);
  const StudentId = user[0]?.StdID;

  useEffect(() => {
    if (StudentId) {
      axios
        .get(`http://localhost:5000/borrowbooks/${StudentId}`)
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [StudentId]);

  return books;
};

export default useBorrowBooks;
