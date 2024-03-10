import React from 'react'

const FilterCard = () => {
  return (
    <div className="flex flex-col gap-2 border-0 border-slate-200 text-textPrimary z-50">
      <div className="flex flex-col gap-4 px-4">
        <div className="text-md font-semibold mb-4">Recent</div>

        <div className="flex gap-4">
          <div className="h-4 w-4 rounded-sm bg-teal-400"></div>

          <div className="flex flex-col items-between">
            <div className="font-medium text-textPrimary">
              My Kanban Project (KAN)
            </div>

            <div className="text-slate-300">Software Project</div>
          </div>
        </div>

        
      </div>

      <div className="text-nowrap w-full leading-tight px-5 my-5 font-normal">
        You have no open issues assigned to you
      </div>

      {/* Got button */}

      {/* <Button /> */}

      {/* <div className="flex flex-col my-2 ">
        <Button name={`View all projects`} />
        <Button name={`Create Project`} />
      </div> */}
    </div>
  )
}

export default FilterCard