import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const OfflineIssueBookLists = () => {
    const [books,setBooks] = useState([]);

    useEffect(()=>{
       axios.get('http://localhost:5000/offlineIssueBooks')
       .then(res =>setBooks(res.data))
       .catch(err=>console.log(err))
    },[])

  return (
    <div className="overflow-x-auto ">
      <table className="min-w-[80%] shadow-md  border mx-auto border-gray-100  my-6">
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
         {
            books?.map((data,i)=>(
                <tr key={i} className="hover:bg-gray-50 text-sm transition duration-300 ">
                <td className="py-4 px-6 text-start border-b">{data.BookId}</td>
                <td className="py-4 px-6 text-start border-b">{data.BookName}</td>
                <td className="py-4 px-6 text-start border-b">{data.CallNumber}</td>
                <td className="py-4 px-6 border-b text-start">{data.Barcode}</td>
                <td className="py-4 px-6 border-b text-start">{data.IssueDate}</td>
                <td className="py-4 px-6 border-b text-red-700 text-start">{data.ExpireDate}</td>
                <td className="py-4 px-6 border-b text-start">{data.ReturnDate}</td>
                <td className="py-4 px-6 border-b text-start">{data.StdResId}</td>
                <td className="py-4 px-6 border-b text-start">{data.Penalty}</td>
                <td className="py-4 px-6 border-b text-xl text-start"><div  className="btn text-xl btn-ghost border-none"><AiFillEdit/></div></td>
              </tr>
            ))
         }
        </tbody>
      </table>
    </div>
  );
};

export default OfflineIssueBookLists;
