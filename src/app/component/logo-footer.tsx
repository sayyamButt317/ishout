import Image from "next/image";

export default function LogoFooter() {
    return (
        <>
            <footer className='bg-black py-12 px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-7xl mx-auto'>

                    <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">

                        <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="flex flex-row items-center justify-center gap-1">
                                <Image
                                    src="/assets/favicon.png"
                                    alt="ishout"
                                    width={40}
                                    height={40}
                                />
                                <h2 className="text-2xl font-bold text-white">iShout</h2>
                                <span className="text-primarytext font-extrabold text-2xl">
                                    .
                                </span>
                            </div>
                            <div className='w-full max-w-52 h-px mt-8 bg-linear-to-r from-black via-white/25 to-black'></div>
                            <p className='text-sm text-white/60 mt-6 max-w-sm leading-relaxed'>
                                iShout is a platform that helps you connect with your audience and grow your business.
                            </p>
                        </div>

                        <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className='text-sm text-white font-medium'>Features</h3>
                            <div className="flex flex-col gap-2 mt-6">
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Influencer Matching</a>
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Campaign Management</a>
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Performance Tracking</a>
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Reporting</a>
                            </div>
                        </div>

                        <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className='text-sm text-white font-medium'>Social Links</h3>
                            <div className="flex flex-col gap-2 mt-6">
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Twitter</a>
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Instagram</a>
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Youtube</a>
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Linkedin</a>
                            </div>
                        </div>


                    </div>

                    <div className='w-full h-px mt-16 mb-4 bg-linear-to-r from-black via-white/25 to-black'></div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className='text-xs text-white/60'>© 2025 iShout</p>
                        <p className='text-sm text-white/60'>In case of any questions, please contact us at: <a href='mailto:info@ishout.ae' className='text-white hover:text-white transition-colors'>info@ishout.ae</a></p>
                        <div className="flex items-center gap-6">
                            <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Terms & Conditions</a>
                            <div className='w-px h-4 bg-white/20'></div>
                            <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};