

// eslint-disable-next-line react/prop-types
const Pagination2 = ({totalPosts2,postPerPage2,setCurrentpage2, currentPage2,}) => {
    let pages = [];

    for(let i = 1; i<= Math.ceil(totalPosts2/postPerPage2); i++ )
    {
        pages.push(i);
    }
    return (
        <div className="flex items-center justify-center gap-5">
            {
                pages.map((page,index) => {
                    return <button className={`btn btn-sm btn-square btn-outline 
                        ${page === currentPage2 
                            ? 'bg-black text-white border-black'
                            : 'bg-transparent text-black border-black'}`} key={index} onClick={() => setCurrentpage2(page)}> {page}</button>
                })
            }
        </div>
    );
};

export default Pagination2;