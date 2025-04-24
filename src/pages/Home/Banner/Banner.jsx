import img1 from '../../../assets/Just.jpg'

const Banner = () => {
    return (
        <div className="font-oswald">

            <section className="flex min-h-[700px]   items-center justify-center border border-black w-full h-[80vh] bg-gradient-to-tr from-black via-black/90 to-black px-8">
                <div className="flex w-full max-w-6xl gap-10 lg:flex-row flex-col items-center justify-between">
                    <div className="max-w-md md:space-y-6 sm:space-y-5 space-y-4">
                        <h1 className="lg:text-5xl sm:text-3xl text-3xl font-bold leading-tight text-slate-200">Take your Knowladge to the next level.</h1>
                        <p className="lg:text-lg sm:text-base text-sm text-slate-200">
                        Empowering Knowledge, Connecting Minds: Your Library, Your Way.
                        </p>
                        <div className="flex space-x-4">
                            <button className="inline-flex flex-nowrap items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-600 text-white">
                                Get Started
                            </button>
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-transparent text-blue-600">
                                Learn More
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">Trusted by 5000+ Users</p>
                    </div>
                    <div className="relative">
                        <img src={img1} className="relative md:h-[500px]  sm:h-[500px] h-[350px]   w-[450px] bg-gray-400 rounded-b-full object-cover" />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Banner;
