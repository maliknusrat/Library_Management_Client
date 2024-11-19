import { useEffect, useState } from "react";
import axios from "axios";
// import BookGet from "../BookGet/BookGet";
// import Modal from "react-modal";
// import { IoMdClose } from "react-icons/io";
import { Image } from "antd";
import Pagination2 from "./Pagination/Pagination2";
import Pagination from "./Pagination/Pagination";
import Swal from "sweetalert2";

// const customStyles = {
//   content: {
//     top: "55%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-60%",
//     backgroundColor: "#2C4E80",
//     transform: "translate(-50%, -50%)",
//     width: "50%",
//     height: "90%",
//   },
// };

const BookSummary = () => {
  const [id, setId] = useState(null);

  //Modal
  // const [modalIsOpen, setIsOpen] = useState(false);
  // function openModal(id) {
  //   setId(id);
  //   setIsOpen(true);
  // }
  // function closeModal() {
  //   setIsOpen(false);
  // }

  const [books, setBooks] = useState([]);
  const [records, setRecords] = useState([]);

  const [currentPage, setCurrentpage] = useState(1);
  const [postPerPage] = useState(3);

  const [currentPage2, setCurrentpage2] = useState(1);
  const [postPerPage2] = useState(10);

  const [studentId, setStudentId] = useState("");
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState([]);

  const handleCheckBox = (item) => {
    let newItem = [];
    const exists = selected.find((selected) => selected.UUID === item.UUID);
    if (!exists) {
      newItem = [...selected, item];
    } else {
      const remaining = selected.filter(
        (selected) => selected.UUID !== item.UUID
      );
      newItem = [...remaining];
    }
    setSelected(newItem);
    console.log(selected);
  };

  function findItem(id) {
    const item = selected.find((item) => item.UUID == id);
    if (item) return true;
    else return false;
  }

  const handleCheckBooks = (item) => {
    let newList = [];
    const exists = checked.find((checked) => checked.UUID === item.UUID);
    console.log(exists);
    if (!exists) {
      newList = [...checked, item];
    } else {
      const remaining = checked.filter((checked) => checked.UUID !== item.UUID);
      newList = [...remaining];
    }
    setChecked(newList);
    console.log(newList);
  };

  function findList(id) {
    const item = checked.find((item) => item.UUID == id);
    if (item) return true;
    else return false;
  }

  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/studentInfo/${studentId}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  }, [studentId]);

  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => {
      setBooks(res.data);
      setRecords(res.data);
    });
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    const posts = records.slice(firstPostIndex, lastPostIndex);
    setCurrentPosts(posts);
  }, [records, firstPostIndex, lastPostIndex]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        const bookDetails = res.data;
        console.log(bookDetails);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleStudentInfo = () => {};

  const [summary, setSummary] = useState([]);

  const fetchData = async () => {
    axios
      .get(`http://localhost:5000/booksummary/${studentId}`)
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  const currentInfo = summary.slice(firstPostIndex2, lastPostIndex2);

  const handleSearch = (e) => {
    let searchText = e.target.value.toLowerCase();
    console.log("Search Text:", searchText);
    console.log("Books Array:", books);

    const filteredBooks = books.filter(
      (bookItem) =>
        bookItem?.BookName.toLowerCase().includes(searchText) ||
        bookItem.AuthorName.toLowerCase().includes(searchText) ||
        bookItem.CallNumber.toLowerCase().includes(searchText) ||
        bookItem.Barcode.toLowerCase().includes(searchText) ||
        bookItem.AccessionNumber.toLowerCase().includes(searchText)
    );
    console.log("Filtered Books:", filteredBooks);

    setRecords(filteredBooks);
    setCurrentpage(1);
  };

  const Penalty = 0;
  const returnDate = "null";

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getUTCFullYear();

  today = yyyy + "/" + mm + "/" + dd;

  const bookSubmit = () => {
    let b = 0;
    for (let i = 0; i < selected.length; i++) {
      let object = {
        id: selected[i].ID,
        bookName: selected[i].BookName,
        callNumber: selected[i].CallNumber,
        barcode: selected[i].Barcode,
        stdId: studentId,
        today: today,
        Penalty,
        returnDate,
      };

      axios
        .post(`http://localhost:5000/offlineRequestBook/${object.id}`, object)
        .then((res) => {
          console.log(res);
          b++;
          if (b == selected.length) {
            Swal.fire({
              title: "Success!",
              text: "Successfully Add Your Book",
              icon: "success",
              confirmButtonText: "Cool!!!",
            }).then((result) => {
              if (result.isConfirmed) {
                fetchData();
                setSelected([]);
                console.log("Success");
              }
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const ConfirmReturn = () => {
    let a = 0;
    for (let i = 0; i < checked.length; i++) {
      const id = checked[i].UUID;
      const bookId = checked[i].BookId;
      axios
        .put(
          `http://localhost:5000/updateMultipleOfflineIssues/${id}/${bookId}`
        )
        .then((res) => {
          console.log(res);
          a++;
          if (a == checked.length) {
            Swal.fire({
              title: "Success!",
              text: "Successfully Update Your Book",
              icon: "success",
              confirmButtonText: "Cool!!!",
            }).then((result) => {
              if (result.isConfirmed) {
                // fetchData();
                setChecked([]);
                console.log("Success");
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error in updating return date: ", error);
        });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end my-5">
        <div className="flex ">
          <div className="relative w-max rounded-lg">
            <input
              onChange={(e) => setStudentId(e.target.value)}
              className="peer rounded-l-lg border border-sky-600 bg-transparent px-4 py-[11px] text-sky-600 focus:outline-none"
              type="text"
              placeholder=""
              id="navigate_ui_input_33"
            />
            <label
              className="absolute -top-2 left-2 rounded-md bg-sky-600 px-2 text-xs text-sky-100 duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-sky-600 peer-focus:text-xs peer-focus:text-sky-100"
              htmlFor="navigate_ui_input_33"
            >
              Student Id
            </label>
          </div>
          <button
            onClick={handleStudentInfo}
            className="btn rounded-none rounded-e-md btn-neutral"
          >
            Submit
          </button>
        </div>
      </div>

      {summary.length > 0 ? (
        <div className="grid gap-10 ">
          <div className="w-full">
            <div>
              {student?.map((data, id) => (
                <div
                  key={id}
                  className="flex flex-col items-center justify-center md:flex-row"
                >
                  <div className="group relative w-[250px]">
                    <img
                      width={100}
                      height={100}
                      className="h-full w-full scale-105 transform rounded-lg bg-black/70"
                      src={data.Image}
                      alt="card navigate ui"
                    />
                    <span className="absolute -bottom-6 left-1/2 z-30 flex h-[40px] w-[40px] -translate-x-1/2 transform items-center  justify-center rounded-full bg-white bg-gradient-to-tr from-[#0d87f8]  to-[#70c4ff] duration-500 group-hover:rotate-180 group-hover:shadow-[0px_0px_30px_2px_#0d87f8]">
                      <svg
                        width={25}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g strokeWidth="0"></g>
                        <g strokeLinecap="round" strokeLinejoin="round"></g>
                        <g>
                          <g id="style=linear">
                            <g id="add">
                              <path
                                id="vector"
                                d="M11.998 5.84424L11.998 18.1604"
                                stroke="#9EE6FD"
                                strokeWidth="2"
                                strokeLinecap="round"
                              ></path>
                              <path
                                id="vector_2"
                                d="M18.1561 12.002L5.83998 12.0019"
                                stroke="#9EE6FD"
                                strokeWidth="2"
                                strokeLinecap="round"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span className="absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#0d87f8]/80 to-[#70c4ff]/80 duration-300 group-hover:h-[50px] group-hover:w-[50px]"></span>
                    <span className="absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#0d87f8]/50 to-[#70c4ff]/50 duration-500 hover:duration-300 group-hover:h-[60px] group-hover:w-[60px] "></span>
                  </div>
                  <div className="max-w-full space-y-12 rounded-br-lg rounded-tr-lg bg-white p-10 text-center shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] dark:bg-[#18181B] md:w-[350px] dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">
                    <div className="space-y-1">
                      <h2 className="text-center text-xl font-medium text-gray-700 dark:text-white/90 lg:text-xl">
                        {data.Name}
                      </h2>
                      <p className="text-gray-500 dark:text-white/70">
                        {data.Email}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-white/70">
                          Student Id
                        </p>
                        <p className="text-xl tracking-wider text-gray-700 dark:text-white/80 lg:text-xl">
                          {data.StdID}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-white/70">
                          Registration Id
                        </p>
                        <p className="text-xl tracking-wider text-gray-700 dark:text-white/80 lg:text-xl">
                          {data.StdRes}
                        </p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ________________________Row one Start______________________________ */}
          <div className="grid grid-cols-2 gap-7">
            {/* ________________________Table of Return Books Start______________________________ */}
            <div className=" w-full">
              <div className="border overflow-x-auto mb-5">
                <table className="table w-full min-w-max ">
                  {/* head */}
                  <thead>
                    <tr>
                      <td></td>
                      <th>Book ID</th>
                      <th>Book Name</th>
                      <th>Issue Date</th>
                      <th className="text-red-700">Expire Date</th>
                      <th>Return Date</th>
                      <th className="text-green-700">Penalty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentInfo?.map((item, e) => (
                      <tr key={e}>
                        <td>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox rounded-none w-4 h-4"
                              checked={findList(item.UUID)}
                              onChange={() => handleCheckBooks(item)}
                            />
                          </label>
                        </td>
                        <td>{item.BookId}</td>
                        <td className="w-[200px]">{item.BookName}</td>
                        <td>{item.IssueDate}</td>
                        <td className="text-red-700">{item.ExpireDate}</td>
                        <td>{item.ReturnDate}</td>
                        <td className="text-green-700">{item.Penalty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-end my-2 justify-end overflow-auto">
                  <button
                    onClick={ConfirmReturn}
                    className=" btn btn-success btn-sm rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </div>
              <Pagination2
                totalPosts2={summary.length}
                postPerPage2={postPerPage2}
                setCurrentpage2={setCurrentpage2}
                currentPage2={currentPage2}
              ></Pagination2>
            </div>

            {/* ________________________Table of Books Start______________________________ */}

            <div>
              <div className="border overflow-x-auto mx-auto mb-5">
                {/* __________________Search books______________ */}
                <div className="flex justify-end py-4 pr-1">
                  <div>
                    <label className="input input-sm input-bordered border-blue-400 flex items-center gap-2">
                      <input
                        onChange={handleSearch}
                        type="text"
                        className="grow text-sm"
                        placeholder="Search"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-3 h-3 opacity-70"
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

                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th></th>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Book Name</th>
                      <th>Book Copies</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((data, i) => (
                      <tr key={i} className="text-center">
                        <td>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox rounded-none w-4 h-4"
                              checked={findItem(data.UUID)}
                              onChange={() => handleCheckBox(data)}
                            />
                          </label>
                        </td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                totalPosts={records.length}
                postPerPage={postPerPage}
                setCurrentpage={setCurrentpage}
                currentPage={currentPage}
              ></Pagination>

              <div className="pt-3">
              <div className="flex flex-col border p-3 gap-3">
                {/* ________________________Table of seleting Books Starts______________________________ */}
                {selected.length > 0 ? (
                  <div className="border bg-slate-950 text-white h-min">
                    <table className="table">
                      <thead>
                        <tr className="text-center text-white">
                          <th>ID</th>
                          <th>Image</th>
                          <th>Book Name</th>
                          <th>Book Copies</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selected.map((data, i) => (
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex items-end my-2 px-3 justify-end overflow-auto">
                      <button
                        onClick={bookSubmit}
                        className="btn btn-warning btn-sm rounded-md"
                      >
                        Issue
                      </button>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default BookSummary;
