import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import BookGet from "../BookGet/BookGet";
import { Image } from "antd";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-60%",
    backgroundColor: "#2C4E80",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height:'90%'
  },
};

const OfflineBookIssue = () => {
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

  const { user } = useContext(AuthContext);
  console.log(user);
  const email = user?.email;
  // const status = 'Pending';
  console.log(email);

  const [books, setBooks] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        setBooks(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  // AbortController;

  return (
    <div className=" h-svh ">
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
              <th>Call Number</th>
              <th>Accession Number</th>
              <th>Barcode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records?.map((data, i) => (
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
                <td>{data.CallNumber}</td>
                <td>{data.AccessionNumber}</td>
                <td>{data.Barcode}</td>
                <td className="flex gap-2 items-center justify-center">
                    
                  {/* Modal Start */}
                  <button
                    onClick={() => openModal(data.ID)}
                    className="btn btn-outline rounded-none btn-warning"
                  >
                    Issue Book
                  </button>

                  <Modal
                    className=""
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
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

                    <BookGet id={id} closeModal={closeModal}></BookGet>
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
export default OfflineBookIssue;
