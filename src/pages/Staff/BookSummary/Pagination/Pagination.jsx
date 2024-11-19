

// eslint-disable-next-line react/prop-types
const Pagination = ({totalPosts,postPerPage,setCurrentpage, currentPage,}) => {

    let pages = [];

    for(let i = 1; i<= Math.ceil(totalPosts/postPerPage); i++ )
    {
        pages.push(i);
    }
    return (
        <div className="flex items-center justify-center gap-5">
            {
                pages.map((page,index) => {
                    return <button className={`btn btn-sm btn-square btn-outline 
                        ${page === currentPage 
                            ? 'bg-black text-white border-black'
                            : 'bg-transparent text-black border-black'}`} key={index} onClick={() => setCurrentpage(page)}> {page}</button>
                })
            }
        </div>
    );
};

export default Pagination;