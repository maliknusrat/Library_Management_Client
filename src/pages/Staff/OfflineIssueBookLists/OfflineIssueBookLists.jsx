import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import  Modal  from 'react-modal';
import EditOfflineIssueBookLists from "./EditOfflineIssueBookLists";



const customStyles = {
  content: {
    top: "60%",
    left: "50%",
    right: "auto",
    bottom: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height:'550px'
  },
};

const OfflineIssueBookLists = () => {
  const [books, setBooks] = useState([]);

  const [id, setId] = useState(null);
  //Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal(id) {
    setId(id);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

 
  useEffect(() => {
    axios
      .get("http://localhost:5000/offlineIssueBooks")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/offlineIssueBooks/${id}`)
      .then((res) => {
        const bookDetails = res.data;
        console.log(bookDetails);
      })
      .catch((err) => console.log(err));
  }, [id]);

 

  return (

    <div>
      <h1 className="flex items-center justify-between py-4 text-4xl text-center">
        Issue Books by Offline
      </h1>
      <div className="overflow-x-auto ">
      <table className="max-w-[60%] shadow-md  border mx-auto border-gray-100  my-6">
        <thead>
          <tr className="bg-[#333333] text-sm text-white">
            <th className="py-3 px-6 text-center border-b">Book Id</th>
            <th className="py-3 px-6 text-center border-b">Book Name</th>
            <th className="py-3 px-6 text-center border-b">Call Number</th>
            <th className="py-3 px-6  border-b text-center">Barcode</th>
            <th className="py-3 px-6  border-b text-center">Issue Date</th>
            <th className="py-3 px-6  border-b text-center">Expire Date</th>
            <th className="py-3 px-6  border-b text-center">Return Date</th>
            <th className="py-3 px-6  border-b text-center">Student Id</th>
            <th className="py-3 px-6  border-b text-center">Penalty</th>
            <th className="py-3 px-6  border-b text-center">Edit</th>
          </tr>
        </thead>

        <tbody>
          {books?.map((data,i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 text-sm transition duration-300 "
            >
              <td className="py-4 px-6 text-start border-b">{data.BookId}</td>
              <td className="py-4 px-6 text-start border-b">{data.BookName}</td>
              <td className="py-4 px-6 text-start border-b">
                {data.CallNumber}
              </td>
              <td className="py-4 px-6 border-b text-start">{data.Barcode}</td>
              <td className="py-4 px-6 border-b text-start">
                {data.IssueDate}
              </td>
              <td className="py-4 px-6 border-b text-red-700 text-start">
                {data.ExpireDate}
              </td>
              <td className="py-4 px-6 border-b text-start">
                {data.ReturnDate}
              </td>
              <td className="py-4 px-6 border-b text-start">{data.StdResId}</td>
              <td className="py-4 px-6 border-b text-start">{data.Penalty}</td>
              <td className="py-4 px-6 border-b text-xl text-start">
                <div onClick={()=> openModal(data.BookId)} className="btn text-xl btn-ghost border-none">
                  <AiFillEdit />
                </div>
                {/* Modal Start */}
                <Modal
                    className=""
                    isOpen={modalIsOpen}
                    style={customStyles}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                  >
                    <div className="flex items-end justify-end">
                      <button
                        className="btn btn-sm btn-square text-xl text-white bg-blue-400"
                        onClick={closeModal}
                      >
                        <IoMdClose></IoMdClose>
                      </button>
                    </div>

                    <EditOfflineIssueBookLists id={id} closeModal={closeModal}></EditOfflineIssueBookLists>
                  </Modal>
                   {/* Modal End */}
  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default OfflineIssueBookLists;
