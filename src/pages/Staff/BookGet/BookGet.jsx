/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const BookGet = ({id,closeModal}) => {
    const Penalty = 0;
    const returnDate = 'null';
   
    const [bookName, setBookName] = useState('');
    const [book, setBooks] = useState([]);
    const [stdId, setStdId] = useState('');
    // const [date, setDate] = useState('');
    const [callNumber, setCallNumber] = useState('');
    const [barcode, setBarcode] = useState('');

   

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(res =>{
                setBooks(res.data);
            })
            .catch(err => console.log(err))
    }, [book])
   

    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then(res => {
                const bookDetails = res.data;
                console.log(bookDetails);
                setBookName(bookDetails.bookName);
                setCallNumber(bookDetails.callNumber);
                setBarcode(bookDetails.barcode);
            })
            .catch(err => console.log(err));
    }, [id]);
  
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getUTCFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    
    function handleSubmit(event) {
        event.preventDefault();

        axios.post(`http://localhost:5000/offlineRequestBook/${id}`, {
            id,bookName,callNumber,barcode, stdId,today,Penalty,returnDate
        })
            .then(res => {
                console.log(res);
                    Swal.fire({
                        title:'Success!',
                        text:'Successfully Add Your Book',
                        icon:'success',
                        confirmButtonText:'Cool!!!'
                    }).then(result=>{
                        if(result.isConfirmed){
                            closeModal()
                        }
                    })
                    window.reload()
            }
        ).catch(err => console.log(err));

       
    }

    return (
        <div>
            <div className="mx-auto my-2 max-w-lg border border-gray-200 rounded-lg shadow-lg p-3 bg-white  hover:shadow-xl  ">
                <div className="flex flex-col p-6 space-y-1">
                    <h3 className="tracking-tight text-xl font-bold text-gray-900 ">Book Information</h3>
                    <p className="text-sm text-gray-500 ">Please fill in the form to Request a new Book.</p>
                </div>
                {/* Form Inner content */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <div className="">

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Book Name
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter Your name"id="name" value={bookName} name="name"  />
                                    </div>

                                    {/* Book ID */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Book ID
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"id="name" value={id} name="bookId"  />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="email">
                                        Call Number
                                    </label>
                                    <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" value={callNumber} 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="email">
                                       Barcode
                                    </label>
                                    <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter Your Email"id="uemail" value={barcode} name="email" 
                                    />
                                </div>

                            </div>

                            <div>
                                <div className="">

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Student Id
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter Student Id " onChange={e => setStdId(e.target.value)} />
                                    </div>

                                   

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Date
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Date" readOnly value={today} />
                                    </div>

                                </div>


                            </div>
                        </div>

                        {/* Submit button */}
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">Submit</button>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default BookGet;