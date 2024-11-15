import React from 'react'
import { Heroimage, HeroService } from "../assets/images";
import { IconService1 } from "../assets/icons";
import { IoIosArrowRoundForward } from "react-icons/io";
const ServiceCardRev = ({title, subtitle, description, link, image}) => {
  return (
    <div className='bg-slate-100'>
        
        <div className="flex md:flex-row flex-col gap-x-8 mx-auto md:w-10/12 py-8 items-center">
          <div className="flex-1 px-8 order-2 ">
            {/* <img className="bg-rose-700 p-3 rounded-full" src={IconService1} /> */}
            <h2 className="mt-4 text-3xl font-bold text-slate-900 leading-relaxed">{title}</h2>
            <p className="mt-2 font-medium text-slate-800 leading-relaxed">{subtitle}</p>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">{description}</p>
            <a href={link} className="mt-8 inline-flex bg-rose-700 text-white px-6 py-2 rounded-full items-center gap-2"><span>Pesan Sekarang</span><IoIosArrowRoundForward className="text-2xl" /></a>
          </div>
          <div className="flex-1 h-96 order-1">
            <img className="rounded-md h-full w-full object-cover" src={image} />
          </div>
        </div>

      </div>
  )
}

export default ServiceCardRev