import  Link  from 'next/link'
import React, { ReactNode } from 'react'
import { Suspense } from "react";
import { BarLoader } from "react-spinners";


const WriteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='container mx-auto xp-4 py-8'>
         <div>
            <Link
                href="/dashboard"
                className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer"
            >
                ← Back to Dashboard
            </Link>
      </div>
      <Suspense fallback={<BarLoader color="orange" width={"100%"} />}>
        {children}
      </Suspense>
    </div>
  )
}

export default WriteLayout
