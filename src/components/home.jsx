import React from 'react'

function Home() {

    const downloadImgStyle = 'border-[#232A4E] h-[28.5px] w-[100px] rounded-[10px] md:w-[7.7rem] md:h-[2.3rem] lg:rounded-[13px] lg:h-[3rem] lg:w-[10rem]'

    return (
        <div className="wrapper lg:flex items-center justify-between px-12 sm:px-[65px] md:px-[70px] lg:px-20 xl:px-[110px] 2xl:px-52 w-full h-full">
            {/* left side */}
            <div className="heading flex my-9 sm:my-12 md:my-[70px] lg:my-28 xl:my-36 flex-col items-start justify-center text-slate-700">
                <span className='font-normal text-[24px] sm:text-[26px] md:text-[29px] lg:text-[35px] xl:text-[40px]'>
                    Experience The
                </span>
                <span className='font-bold text-[20px] sm:text-[22px] md:text-[24px] lg:text-[30px] xl:text-[35px]'>
                    Best Quality Game
                </span>

                <div className="lg:hidden block py-8 ">
                    <img src="/img/hero.png" alt="" className="px-5 sm:px-8 md:px-16 md:py-3" />
                </div>

                <p className="text-[14.5px] md:text-[15.5px] lg:text-[17px] pb-7 lg:py-10 text-slate-600 text-left">
                    <span className='font-semibold text-[17px] sm:text-[19px] xl:text-[21px] pb-1'> Welcome to the world of Pokémon!</span>
                    <br />Catch, train and grow your Pokémon team.
                    Get ready to start your incredible journey as a Pokémon Trainer!
                </p>

                {/* download ads */}
                <div>
                    <span className="text-[13.2px] sm:text-[13.9px] md:text-[15px] lg:text-[16px]">Download now on IOS and Android</span>
                    <div className="download py-2 lg:pt-3">
                        <div className="download_images flex">
                            <img
                                src={require("../img/App Store.png")}
                                alt=""
                                className={downloadImgStyle + ` mr-5`} />
                            <img
                                src={require("../img/Google Play.png")}
                                alt=""
                                className={downloadImgStyle} />
                        </div>
                    </div>
                </div>
            </div>

            {/* right side when : lebar layar > md */}
            <div className="hidden lg:block  relative w-[100%]">
                <img src="/img/hero.png" alt="" className="pl-3 xl:pl-8 2xl:pl-12" />
            </div>

        </div>
    )
}

export default Home