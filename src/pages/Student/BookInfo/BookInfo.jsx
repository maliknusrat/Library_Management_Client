import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "antd";
import Swal from "sweetalert2";
import { AuthContext } from "./../../../Provider/AuthProvider";
import GetUserInfo from "../../../utils/GetUserInfo";
import IsPayment from "../../../utils/IsPayment";

const BookInfo = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const user = GetUserInfo();
  const payment = IsPayment();
  console.log("USer mail",user);
  const email = user[0]?.Email;
  const studentId = user[0]?.StdID;

  const status = "Pending";
  console.log(email);
  const [books, setBooks] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    axios
      .get(`http://localhost:5000/?page=${currentPage}&limit=${itemsPerPage}`)
      .then((res) => {
        setBooks(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentPage, itemsPerPage]);

  //Search
  const handleSearch = (e) => {
    let searchText = e.target.value.toLowerCase();
    // console.log(searchText)
    setRecords(
      books.filter(
        (bookItem) =>
          bookItem.BookName.toLowerCase().includes(searchText) ||
          bookItem.AuthorName.toLowerCase().includes(searchText) ||
          bookItem.CallNumber.toLowerCase().includes(searchText) ||
          bookItem.Barcode.toLowerCase().includes(searchText) ||
          bookItem.AccessionNumber.toLowerCase().includes(searchText)
      )
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        const bookDetails = res.data;
        console.log(bookDetails);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Logic to calculate pagination indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = records.slice(indexOfFirstItem, indexOfLastItem);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Post Request BookInfo
  const handleSubmit = (id) => {
    console.log(id,email,status);
    axios
      .post("http://localhost:5000/requestBook", {
        id,
        email,
        status,
        studentId

      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Success!",
          text: "Successfully Request Your Book",
          icon: "success",
          confirmButtonText: "Cool!!!",
        });
        navigate("/student/dashBoard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" font-oswald h-svh ">
      <div className="flex justify-end">
        <div></div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={handleSearch}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <h1 className="flex items-center justify-between py-4 text-4xl text-center">
        Books
      </h1>
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Image</th>
              <th>Book Name</th>
              <th>Book Copies</th>
              <th>Author Name</th>
              <th>Department</th>
              <th>Call Number</th>
              <th>Accession Number</th>
              <th>Barcode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks?.map((data, i) => (
              <tr key={i} className="text-center">
                <td>{data.ID}</td>
                <td>
                  <Image
                    className="flex items-start justify-start "
                    width={50}
                    src={data.Image}
                  />
                </td>
                <td>{data.BookName}</td>
                <td>{data.BookCopies}</td>
                <td>{data.AuthorName}</td>
                <td>{data.dept}</td>
                <td>{data.CallNumber}</td>
                <td>{data.AccessionNumber}</td>
                <td>{data.Barcode}</td>
                <td className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => handleSubmit(data.ID)}
                    disabled={payment?.length <= 0}
                    className="btn  btn-outline rounded-none btn-warning"
                  >
                    Request Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pagination py-3">
        {[...Array(Math.ceil(books.length / itemsPerPage)).keys()].map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className="btn btn-sm btn-outline btn-circle space-x-3 mx-3"
            >
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BookInfo;
