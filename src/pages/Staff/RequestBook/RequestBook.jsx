import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GiConfirmed } from "react-icons/gi";
import { PiTimerDuotone } from "react-icons/pi";
import { RxCrossCircled } from "react-icons/rx";

const RequestBook = () => {
  const [books, setBooks] = useState([]);
  // const email = localStorage.getItem('email');
  const penalty = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/issueBooks?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, [currentPage, itemsPerPage]);

  // Logic to calculate pagination indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatus = (data) => {
    let id = data.BookId;
    let email = data.Email;
    axios
      .put(`http://localhost:5000/updateBook/${data.BookId}`, {
        id,
        email,
        penalty,
      })
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success) {
          Swal.fire({
            title: "Success!",
            text: "Successfully Issue The Book",
            icon: "success",
            confirmButtonText: "Cool!!!",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" h-svh ">
      <h1 className="flex items-center justify-between mt-5 mb-5 text-3xl text-center">
        Requested Books
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-sm table-pin-cols table-pin-rows">
          <thead className="text-center">
            <tr>
              <th>Book ID</th>
              <td>Email</td>
              <td>Book Name</td>
              <td>Barcode</td>
              <td>Student ID</td>
              <td>Registration Number</td>
              <td>Request Time</td>
              <td>Expire Time</td>
              <td>Status</td>
              <th></th>
            </tr>
          </thead>

          <tbody className="text-center">
            {currentBooks.map((data, i) => (
              <tr key={i}>
                <th>{data.BookId}</th>
                <td>{data.Email}</td>
                <td className="text-blue-800">{data.BookName}</td>
                <td>{data.Barcode}</td>
                <td>{data.StdID}</td>
                <td>{data.StdRes}</td>
                <td>{data.CurrentRequestTime}</td>
                <td className="text-red-500">{data.ExpireIssueTime}</td>
                <td>
                  <div
                    onClick={() => handleStatus(data)}
                    className={`btn btn-ghost place-items-center ${
                      data?.statuss === "Approve" || data?.statuss === "Cancel"
                        ? "btn-disabled"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      {data.statuss === "Approve" && (
                        <GiConfirmed className="text-xl text-sky-600"></GiConfirmed>
                      )}
                      {data.statuss === "Pending" && (
                        <PiTimerDuotone className="text-xl"></PiTimerDuotone>
                      )}
                      {data.statuss === "Cancel" && (
                        <RxCrossCircled className="text-2xl text-red-600"></RxCrossCircled>
                      )}
                      {/* {data.statuss} */}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination mt-5">
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

export default RequestBook;
