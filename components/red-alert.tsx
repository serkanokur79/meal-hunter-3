import { TriangleAlertIcon } from 'lucide-react'

const RedAlert = ({text}:{text:string}) => {
  return (
    <div className='container flex flex-col p-8'>
    <div className="border-l-4 border-red-400 bg-red-50 p-4 ">
    <div className="flex">
      <div className="flex-shrink-0">
        <TriangleAlertIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700">
      {text}  
        </p>
      </div>
    </div>
  </div></div>
  )
}

export default RedAlert