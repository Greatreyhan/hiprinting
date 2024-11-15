import React from 'react'
import NavUser from './navUser'

const LayoutUser = ({ children }) => {
  return (
    <div className='flex w-screen'>
      <div className="md:w-2/12">
      <NavUser />
      </div>
      <div className='md:w-10/12 w-full'>
        {children}
      </div>
    </div>
  )
}

export default LayoutUser