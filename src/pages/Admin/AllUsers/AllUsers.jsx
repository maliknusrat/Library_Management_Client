import { Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


const AllUsers = () => {

    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Number of items per page

    useEffect(() => {
        axios.get(`http://localhost:5000/allusers/?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    }, [currentPage, itemsPerPage]);

    // Logic to calculate pagination indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div className="font-oswald">
            {/* Fetching Users */}
            <div className=' h-svh '>
            <h1 className="flex items-center justify-between mt-2 mb-5 text-4xl text-center">All Users</h1>
            <div className="overflow-x-auto max-w-6xl mx-auto">
                <table className="table">
                    <thead>
                        <tr className='text-center'>
                            
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registration Type</th>
                            <th>Student ID</th>
                            <th>Registration Number</th>
                            <th>Phone Number</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks?.map((data, i) => (
                            <tr key={i} className='text-center'>
                                <td><Image className='flex items-start  justify-start'
                                    width={30}
                                    
                                    src={data.Image}
                                /></td>
                                <td >{data.Name}</td>
                                <td>{data.Email}</td>
                                <td>{data.RegisterType}</td>
                                <td>{data.StdID}</td>
                                <td>{data.StdRes}</td>
                                <td>{data.PhoneNumber}</td>
                                
                                
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
    );
};

export default AllUsers;