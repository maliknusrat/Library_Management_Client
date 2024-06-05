import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiPencil } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
import { Image } from 'antd';
import Swal from 'sweetalert2';

const BookShow = () => {
    const [books, setBooks] = useState([]);
    const [records,setRecords] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Number of items per page

    useEffect(() => {
        axios.get(`http://localhost:5000/?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => {setBooks(res.data)
                setRecords(res.data)
            })
            .catch(err => console.log(err));
    }, [currentPage, itemsPerPage]);



//Search
  const handleSearch = (e) => {
    let searchText = e.target.value.toLowerCase();
    // console.log(searchText)
    setRecords(
      books.filter((bookItem) => bookItem.BookName.toLowerCase().includes(searchText)||bookItem.AuthorName.toLowerCase().includes(searchText)||bookItem.CallNumber.toLowerCase().includes(searchText)||bookItem.Barcode.toLowerCase().includes(searchText)||bookItem.AccessionNumber.toLowerCase().includes(searchText))
    );
  };


    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/deleteBook/${id}`)
            .then(res => {
                console.log(res);
                if(res.statusText == 'OK'){
                    Swal.fire({
                        title: "Remove Item Successfully",
                        showClass: {
                          popup: "animate__animated animate__fadeInDown",
                        },
                        hideClass: {
                          popup: "animate__animated animate__fadeOutUp",
                        },
                      });
                      window.location.reload();
                }
                

            })
            .catch((err) => {
                console.log(err);
            });
    };

   

    // Logic to calculate pagination indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = records.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className=' h-svh '>
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
            <h1 className="flex items-center justify-between mt-5 mb-5 text-4xl text-center">Books</h1>
            <div className="overflow-x-auto max-w-6xl mx-auto">
                <table className="table">
                    <thead>
                        <tr className='text-center'>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Book Name</th>
                            <th>Book Copies</th>
                            <th>Author Name</th>
                            <th>Entery Date</th>
                            <th>Call Number</th>
                            <th>Accession Number</th>
                            <th>Barcode</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.map((data, i) => (
                            <tr key={i} className='text-center'>
                                <td>{data.ID}</td>
                                <td><Image className='flex items-start justify-start '
                                    width={50}
                                    src={data.Image}
                                /></td>
                                <td >{data.BookName}</td>
                                <td>{data.BookCopies}</td>
                                <td>{data.AuthorName}</td>
                                <td>{data.Date}</td>
                                <td>{data.CallNumber}</td>
                                <td>{data.AccessionNumber}</td>
                                <td>{data.Barcode}</td>
                                <td className='flex gap-2 items-center justify-center'>
                                    <Link to={`/admin/update/${data.ID}`} className='btn btn-outline rounded-none btn-warning'><GiPencil /></Link>
                                    <button className='btn btn-outline rounded-none btn-error' onClick={() => handleDelete(data.ID)}><AiOutlineDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="pagination mt-5">
                {[...Array(Math.ceil(books.length / itemsPerPage)).keys()].map(number => (
                    <button key={number} onClick={() => paginate(number + 1)} className="btn btn-sm btn-outline btn-circle space-x-3 mx-3">
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BookShow;
