import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-6 px-6'>

        {/* Heading */}

        <div className='flex justify-between items-center my-6'>

            <div className='text-black font-semibold text-2xl'>Projects</div>
            <div className='flex gap-2 py-2 px-4 rounded bg-primary text-white font-medium cursor-pointer'>Create Project</div>
        </div>

    </div>
  )
}

export default page