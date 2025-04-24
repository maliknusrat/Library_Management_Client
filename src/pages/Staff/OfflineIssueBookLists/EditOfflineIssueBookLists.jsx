import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditOfflineIssueBookLists = ({id,closeModal}) => {
 const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  console.log("id", id);
  const [bookName, setBookname] = useState("");
  const [callNumber, setCallNumber] = useState("");
  const [barcode, setBarcode] = useState("");
  const [expiredate, setExpiredate] = useState("");
  const [stdId, setStdId] = useState("");
  const [penalty, setPenalty] = useState("");
  const [issueDate, setIssuedate] = useState("");
  const [returnDate, setReturndate] = useState("");
  const [bookId, setBookId] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/offlineIssueBooks/${id}`)
      .then((res) => {
        const bookDetails = res.data;
        console.log(bookDetails);
        setBookname(bookDetails.bookName);
        setCallNumber(bookDetails.callNumber);
        setBarcode(bookDetails.barcode);
        setExpiredate(bookDetails.expiredate);
        setStdId(bookDetails.stdId);
        setPenalty(bookDetails.penalty);
        setIssuedate(bookDetails.issueDate);
        setReturndate(bookDetails.returnDate);
        setBookId(bookDetails.bookId);
        console.log(bookDetails);
      })

      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:5000/updateOfflineIssue/${id}/${bookId}`, {
      issueDate,returnDate
    })
        .then(res => {
            console.log(res.data.success);
            if(res.data.success){
                Swal.fire({
                    title:'Success!',
                    text:'Successfully Update Your Book',
                    icon:'success',
                    confirmButtonText:'Cool!!!'
                }).then(result=>{
                    if(result.isConfirmed){
                        closeModal()
                        window.reload();
                    }
                })
                navigate("/staff/getOfflineBooks")
                
            }
        })
        .catch(err => console.log(err));
}

  return (
    <div className="font-oswald">
      <div className="mx-auto my-4 max-w-xl border border-gray-200 rounded-lg shadow-lg p-6 bg-white  hover:shadow-xl  ">
        <div className="flex flex-col p-6 space-y-1">
          <h3 className="tracking-tight text-xl font-bold text-gray-900 ">
            Book Information
          </h3>
          <p className="text-sm text-gray-500 ">
            Please fill in the form to Request a new Book.
          </p>
        </div>
        {/* Form Inner content */}
        <div onSubmit={handleSubmit} className="p-6">
          <form className="space-y-2">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 "
                      htmlFor="first-name"
                    >
                      Book Name
                    </label>
                    <input
                      className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"
                      placeholder="Enter Your name"
                      id="name"
                      value={bookName}
                      name="name"
                    />
                  </div>

                  {/* Book ID */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 "
                      htmlFor="first-name"
                    >
                      Book ID
                    </label>
                    <input
                      className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"
                      id="name"
                      value={bookId}
                      name="bookId"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 "
                    htmlFor="email"
                  >
                    Call Number
                  </label>
                  <input
                    className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"
                    value={callNumber}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 "
                    htmlFor="email"
                  >
                    Barcode
                  </label>
                  <input
                    className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"
                    placeholder="Enter Your Email"
                    id="email"
                    value={barcode}
                    name="email"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 "
                    htmlFor="email"
                  >
                    Expire Date
                  </label>
                  <input
                    className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"
                    value={expiredate}
                  />
                </div>
              </div>

              <div>
                <div className="">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 "
                      htmlFor="first-name"
                    >
                      Student Id
                    </label>
                    <input
                      className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"
                      value={stdId}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 "
                      htmlFor="first-name"
                    >
                      Penalty
                    </label>
                    <input
                      className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"
                      value={penalty}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 "
                      htmlFor="first-name"
                    >
                      Book Issue Date
                    </label>
                    <input
                      className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"
                      value={issueDate}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 "
                      htmlFor="first-name"
                    >
                      Book Return Date
                    </label>
                    <input
                      className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"
                      placeholder="Date"
                      value={returnDate}
                      onChange={e => setReturndate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOfflineIssueBookLists;
