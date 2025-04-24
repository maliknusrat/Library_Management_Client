import { useState } from 'react';
import Box from '@mui/material/Box';
import GetBorrowBooks from '../../../utils/GetBorrowBooks';

const BorrowBooks = () => {
    const books = GetBorrowBooks();
    console.log(books);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page

    // Logic to calculate pagination indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="font-oswald">
            <Box sx={{ display: 'flex' }}>
                <div>
                    {/* Fetching Books */}
                    <div className=' h-svh '>
                        <h1 className="flex items-center justify-between mt-2 mb-5 text-4xl text-center">BorrowBooks</h1>
                        <div className="overflow-x-auto max-w-6xl mx-auto">
                            <table className="table">
                                <thead>
                                    <tr className='text-center'>
                                        <th>Book Id</th>
                                        <th>Email</th>
                                        <th>Approve Date</th>
                                        <th>Expire Date</th>
                                        <th>Return Date</th>
                                        <th>Penalty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBooks.map((data, i) => (
                                        <tr key={i} className='text-center'>
                                            <td>{data.BookId}</td>
                                            <td>{data.Email}</td>
                                            <td>{data.ApproveDate}</td>
                                            <td>{data.LastReturnDate}</td>
                                            <td>{data.ReturnDate}</td>
                                            <td>{data.Penalty}</td>
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
                </div>
            </Box>
        </div>
    );
};

export default BorrowBooks;
