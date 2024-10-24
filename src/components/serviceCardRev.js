import React from 'react'
import { Heroimage, HeroService } from "../assets/images";
import { IconService1 } from "../assets/icons";
import { IoIosArrowRoundForward } from "react-icons/io";
const ServiceCardRev = ({title, subtitle, description, link, image}) => {
  return (
    <div className='bg-slate-100'>
        
        <div className="flex w-10/12 gap-x-8 mx-auto py-8 items-center">
          <div className="flex-1 order-2">
            {/* <img className="bg-sky-100 p-3 rounded-full" src={IconService1} /> */}
            <h2 className="mt-4 text-3xl font-medium text-slate-900">{title}</h2>
            <p className="mt-2 font-medium text-slate-800">{subtitle}</p>
            <p className="mt-2 text-sm text-slate-700">{description}</p>
            <a href={link} className="mt-8 inline-flex bg-sky-900 text-white px-6 py-2 rounded-full items-center gap-2"><span>Lihat Produk</span><IoIosArrowRoundForward className="text-2xl" /></a>
          </div>
          <div className="flex-1 order-1">
            <img className="rounded-md" src={image} />
          </div>
        </div>

      </div>
  )
}

export default ServiceCardRev