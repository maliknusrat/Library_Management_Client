

const EditOfflineIssueBookLists = () => {
    return (
        <div>
        <div className="mx-auto my-4 max-w-xl border border-gray-200 rounded-lg shadow-lg p-6 bg-white  hover:shadow-xl  ">
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

export default EditOfflineIssueBookLists;