import React from 'react'
import { ExternalLink ,X} from 'lucide-react'
import Link from 'next/link'

const helpItems = [
    {
        name: 'Getting Started',
        link: '/help/getting-started'
    },
    {
        name: 'Find out more about Collab',
        link: '/help/faqs'
    },
    {
        name: 'Browse complete documentation',
        link: '/help/documentation'
    },{
        name:"Learn about Collab's security",
        link: '/help/security'
    },{
        name:"Ask our community forums",
        link: '/help/community'
    },{
        name:"Contact support",
        link: '/help/support'
    },
    {
        name:"Submit a feature request",
        link: '/help/feature-request'
    },{
        name:"Give feedback",
        link: '/help/feedback'
    }
    ,{
        name:"Report a bug",
        link: '/help/report-bug'
    }
    
]


const Help = ({setSelectedNavOption}:any) => {
  return (
    
        <div className="flex flex-col gap-4  w-full relative min-h-[calc(100vh-72px)] border-l-2 border-tertiary bg-white z-1">
            <div className="text-2xl font-bold px-4 bg-secondary py-2 flex justify-between items-center border-b-2 border-tertiary">
                <div>Help</div>
                <X  fontSize={16} color='#44546F' className='cursor-pointer' onClick={()=>setSelectedNavOption('')}/>
            </div>
            <div className="flex flex-col ">
            {helpItems.map((item, index) => (
                <Link href={item.link} key={index} className="text-md duration-300 transition-all delay-75 ease-in-out  flex gap-2  text-textPrimary hover:bg-secondary py-2 px-4">
                {item.name}
                <ExternalLink color='#44546F' size={16} />
                </Link>
            ))}
            </div>



            {/* Footer */}

            <div className='absolute bottom-0 flex flex-col gap-4 items-center justify-center bg-secondary text-sm w-full py-6 border-t-2 border-tertiary '>

                <div className='flex gap-4 text-textPrimary font-medium'>

                    <div className='hover:underline cursor-pointer'>About Collab</div>
                    <div className='hover:underline cursor-pointer'>Terms of use</div>
                    <div className='hover:underline cursor-pointer'>Privacy policy</div>
                </div>

            </div>
        </div>
    
  )
}

export default Help