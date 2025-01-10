import React, { ReactNode } from 'react'

const Authlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex justify-center pt-20'>
      {children}
    </div>
  )
}

export default Authlayout
