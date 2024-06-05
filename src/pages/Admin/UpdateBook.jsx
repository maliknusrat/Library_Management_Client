import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBook = () => {
    const [bookName, setBookName] = useState('');
    const [price, setPrice] = useState('');
    const [Author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [callNumber, setCallNumber] = useState('');
    const [accessionNumber, setAccessionNumber] = useState('');
    const [barcode, setBarcode] = useState('');
    const { id } = useParams();
    console.log(id);
    console.log(barcode,accessionNumber);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then(res => {
                const bookDetails = res.data;
                console.log(bookDetails);
                setBookName(bookDetails.bookName);
                setPrice(bookDetails.price);
                setAuthor(bookDetails.author);
                setDate(bookDetails.date);
                setCallNumber(bookDetails.callNumber);
                setAccessionNumber(bookDetails.accessionNumber);
                setBarcode(bookDetails.barcode);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:5000/update/${id}`, {
            bookName, price, Author, date,
            callNumber,accessionNumber,barcode
        })
            .then(res => {
                console.log(res.data.success);
                if(res.data.success){
                    Swal.fire({
                        title:'Success!',
                        text:'Successfully Update Your Book',
                        icon:'success',
                        confirmButtonText:'Cool!!!'
    
                    })
                }
                navigate('/admin/book');
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div>
                <div className=" mx-auto my-16 max-w-3xl border  border-gray-200 rounded-lg shadow-lg p-6 bg-white  hover:shadow-xl  ">
                    <div className="flex flex-col p-6 space-y-1">
                        <h3 className="tracking-tight text-2xl font-bold text-gray-900 ">Update Your Book</h3>
                        <p className="text-sm text-gray-500 ">Please fill in the form to Insert a new Book.</p>
                    </div>
                    {/* Form Inner content */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <div className="">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                                Book Id
                                            </label>
                                            <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" readOnly placeholder="Enter the Book ID" value={id} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                                Book Name
                                            </label>
                                            <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter the Book name" value={bookName} onChange={e => setBookName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="email">
                                            Book Copies
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" id="price" placeholder="Enter The Book's Price"  value={price} onChange={e => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="message">
                                            Author Name
                                        </label>
                                        <input className="flex w-full px-3 py-2 text-sm  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"  placeholder="Enter the Author Name" value={Author} onChange={e => setAuthor(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <div className="">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                                Date
                                            </label>
                                            <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" readOnly placeholder="Enter the Date" value={date}onChange={e =>setDate(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                                Call Number
                                            </label>
                                            <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter the Book name" value={callNumber} onChange={e => setCallNumber(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="email">
                                            Accession Number
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md"  placeholder="Enter The Book's Price" value={accessionNumber} onChange={e => setAccessionNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="message">
                                            Barcode
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter The Barcode" value={barcode} onChange={e => setBarcode(e.target.value)}
                                        />
                                       
                                    </div>
                                </div>
                            </div>
                            {/* Submit button */}
                            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBook;