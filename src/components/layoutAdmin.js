import React from 'react'
import NavAdmin from "./navAdmin"

const LayoutAdmin = ({ children }) => {
  return (
    <div className='flex w-screen'>
      <div className="md:w-2/12">
      <NavAdmin />
      </div>
      <div className='md:w-10/12 w-full'>
        {children}
      </div>
    </div>
  )
}

export default LayoutAdmin