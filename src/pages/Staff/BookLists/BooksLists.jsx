

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { FaDownload } from "react-icons/fa6";
import img from "../../../assets/JUST_logo_transparent.png"; // Import your logo image
import axios from "axios";

const BookLists = () => {
 const [books, setBooks] = useState([])

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/booklists");
        setBooks(response.data);
        console.log("Data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const printRef = useRef();

  const handlePrint = () => {
    const originalContent = document.body.innerHTML;
    const printArea = printRef.current.innerHTML;

    document.body.innerHTML = printArea;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentDate = new Date().toLocaleString(); // Get current date and time

  return (
    <div className="font-oswald">
      <Box sx={{ display: "flex" }}>
        <div className="h-svh w-full">

          {/* Normal Table for Display */}
          <h1 className="flex items-start justify-start mt-2 mb-5 text-4xl text-center">
            Book Lists
          </h1>
          <div className="overflow-x-auto max-w-6xl mx-auto">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>Book ID</th>
                  <th>Student ID</th>
                  <th>Approve Date</th>
                  <th>Expire Date</th>
                  <th>Return Date</th>
                  <th>Penalty</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((data, i) => (
                  <tr key={i} className="text-center">
                    <td>{data.bookId}</td>
                    <td>{data.studentId}</td>
                    <td>{data.issueDate}</td>
                    <td>{data.expireDate}</td>
                    <td className="text-red-600">{data.returnDate || "Not Returned"}</td>
                    <td>{data.Penalty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Printable Beautiful Report */}
          <div style={{ display: "none" }}>
            <div ref={printRef}>
              <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
                
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "12px", color: "#555" }}>{currentDate}</div>
                  <div style={{ fontSize: "12px", color: "#555" }}>Library Management System</div>
                </div>
                <div className="flex flex-col items-center justify-center mt-5">
                  <img className="w-24" src={img} alt="Logo of JUST" />
                  <p style={{ textAlign: "center", marginTop: "5px", fontSize: "24px", fontWeight: "bold" }}>Jashore University of Science and Technology</p>
                </div>

                <h1 style={{ textAlign: "center", marginTop: "5px", fontSize: "20px", fontWeight: "normal" }}>
                  Borrowed Books Report
                </h1>

                {/* Table */}
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "30px" }}>
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>Book ID</th>
                      <th style={tableHeaderStyle}>Student ID</th>
                      <th style={tableHeaderStyle}>Approve Date</th>
                      <th style={tableHeaderStyle}>Expire Date</th>
                      <th style={tableHeaderStyle}>Return Date</th>
                      <th style={tableHeaderStyle}>Penalty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((data, i) => (
                      <tr key={i}>
                        <td style={tableCellStyle}>{data.bookId}</td>
                        <td style={tableCellStyle}>{data.studentId}</td>
                        <td style={tableCellStyle}>{data.issueDate}</td>
                        <td style={tableCellStyle}>{data.expireDate}</td>
                        <td style={tableCellStyle}>{data.returnDate || "Not Returned"}</td>
                        <td style={tableCellStyle}>{data.Penalty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer */}
                <div style={{ marginTop: "40px", textAlign: "center", fontSize: "14px", color: "#777" }}>
                  Thank you for using our library services!
                </div>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-center items-center mt-5">
            <button
              className="w-32 btn btn-outline btn-sm flex items-center justify-center gap-2"
              onClick={handlePrint}
            >
              Print Report <FaDownload />
            </button>
          </div>

          {/* Pagination */}
          <div className="pagination mt-5 flex justify-center">
            {[...Array(Math.ceil(books.length / itemsPerPage)).keys()].map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number + 1)}
                  className="btn btn-sm btn-outline btn-circle mx-1"
                >
                  {number + 1}
                </button>
              )
            )}
          </div>

        </div>
      </Box>
    </div>
  );
};

export default BookLists;

// Common Styles
const tableHeaderStyle = {
  border: "1px solid #000",
  padding: "10px",
  backgroundColor: "#f2f2f2",
  fontWeight: "bold",
};

const tableCellStyle = {
  border: "1px solid #000",
  padding: "10px",
  textAlign: "center",
};
