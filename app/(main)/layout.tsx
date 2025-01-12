import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='container mx-auto'>
      {children}
    </div>
  )
}

export default layout
