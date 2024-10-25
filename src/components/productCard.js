import React from 'react'
import { Link } from 'react-router-dom'

const PortoCard = ({id, title, trademark, pict, desc}) => {
    return (
        <Link to={`/product/` + id} className=' md:w-80 w-8/12 m-8 pb-8 bg-slate-100 rounded-lg' id={id}>
            <div className='w-full h-48'>
                <img className='object-cover w-full h-full' src={pict} />
            </div>
            <p className='font-bold mt-4 text-xl mx-4'>{title}</p>
            <p className='font-normal mt-4 mx-4 text-xs tracking-wide leading-5'>{desc.length > 200 ? desc.substring(0, 200) + '...' : desc}</p>
            <span className='mt-2 mx-4 bg-sky-100 px-4 py-1.5 rounded-full text-sky-900 font-medium text-sm inline-block'>Panel</span>
        </Link>
    )
    
}

export default PortoCard