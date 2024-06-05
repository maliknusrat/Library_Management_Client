import axios from "axios";
import { useEffect, useState } from "react";
const image_hosting_token = import.meta.env.VITE_Image_Upload_token;
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddBook = () => {
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
    const [image, setImage] = useState(null);
    const [bookName, setBookName] = useState('');
    const [book, setBooks] = useState([]);
    const [bookId, setBookId] = useState('');
    const [price, setPrice] = useState('');
    const [Author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [callNumber, setCallNumber] = useState('');
    const [accessionNumber, setAccessionNumber] = useState('');
    const [barcode, setBarcode] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(res =>{
                setBooks(res.data);
                setBookId((book.length)+1);
            })
            .catch(err => console.log(err))
            // console.log(book);
    }, [book])

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getUTCFullYear();

    today = yyyy + '/' + mm + '/' + dd;

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        axios.post(image_hosting_url, formData,
            {
                headers: {
                    'Content-Type': undefined // Remove Content-Type header
                }
            })
            .then(res => {
                console.log(res.data.data.display_url);
                // setDisplayImage(res.data.data.display_url);
                const image = res.data.data.display_url;
                console.log(image);
                if (res.data.success) {
                    axios.post('http://localhost:5000/books', {
                        bookId,bookName, price, Author, date, image,
                        callNumber, accessionNumber, barcode
                    })
                        .then(res => {
                            console.log(res);
                                Swal.fire({
                                    title:'Success!',
                                    text:'Successfully Add Your Book',
                                    icon:'success',
                                    confirmButtonText:'Cool!!!'
                                })
                            navigate('/admin/book');
                        }).catch(err => console.log(err));
                }
            })
    }

    const handleImage = (event) => {
        setImage(event.target.files[0]);
        setDate(today);
    }

    return (
        <div>
            <div className="mx-auto my-16 max-w-3xl border border-gray-200 rounded-lg shadow-lg p-6 bg-white  hover:shadow-xl  ">
                <div className="flex flex-col p-6 space-y-1">
                    <h3 className="tracking-tight text-2xl font-bold text-gray-900 ">Add Your Book</h3>
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
                                            Book Name
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter the Book name" onChange={e => setBookName(e.target.value)} />
                                    </div>
                                    {/* image */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Book Image
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter the Book Image" type="file" onChange={handleImage} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="email">
                                        Book Copies
                                    </label>
                                    <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter The Number of Books Available" type="text" onChange={e => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="message">
                                        Author Name
                                    </label>
                                    <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter the Author Name" onChange={e => setAuthor(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Date Acquired
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter the Date" defaultValue={today} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Full call number
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter the full call number" onChange={e => setCallNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="email">
                                        Accession Number
                                    </label>
                                    <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter The Accession Number" onChange={e => setAccessionNumber(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="message">
                                        Barcode
                                    </label>
                                    <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter The Barcode" onChange={e => setBarcode(e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Submit button */}
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddBook;