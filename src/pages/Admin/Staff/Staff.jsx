import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Badge, Image } from 'antd';
import { IoMdClose } from "react-icons/io";
import Modal from 'react-modal';
import AddStaff from '../AddStaff/AddStaff';
import { useEffect, useState } from 'react';
import axios from 'axios';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        backgroundColor:'#2C4E80',
        transform: 'translate(-50%, -50%)',
    },
};


const Staff = () => {
    
    //Modal
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    //Staff Gets
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Number of items per page

    useEffect(() => {
        axios.get(`http://localhost:5000/staff/?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    },[currentPage, itemsPerPage]);

      // Logic to calculate pagination indexes
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentBooks = books?.slice(indexOfFirstItem, indexOfLastItem);
  
      // Change page
      const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="font-oswald">
            {/* Modal Start */}
            <div className='flex items-end justify-end'>
                <Badge onClick={openModal} className='btn btn-circle bg-transparent'
                    count={
                        <PlusOutlined
                            style={{
                                color: '#ffffff',
                                backgroundColor: '#f5222d',
                                padding: '2px',
                                border: '0px',
                                borderRadius: '50%',
                                fontSize: '13px',
                                fontStyle: 'bold'
                            }}
                        />
                    }
                >
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                            size: '100px'
                        }}
                        icon={<UserOutlined />}
                    />
                </Badge>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='flex items-end justify-end'>
                <button className='btn btn-sm btn-square text-xl text-white bg-blue-400' onClick={closeModal}><IoMdClose></IoMdClose></button>
                </div>
                <AddStaff></AddStaff>
            </Modal>
            {/* Modal End */}

         {/* Fetching Staffs */}
            <div className=' h-svh '>
            <h1 className="flex items-center justify-between mt-2 mb-5 text-4xl text-center">Staffs</h1>
            <div className="overflow-x-auto max-w-6xl mx-auto">
                <table className="table">
                    <thead>
                        <tr className='text-center'>
                            
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registration Type</th>
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

export default Staff;