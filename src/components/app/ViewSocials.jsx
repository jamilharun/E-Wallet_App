import { sampleUsers } from '../../localStorage/users'

export default function ViewSocials() {
  return (
    <div className="border-EWred border-4 rounded-lg space-y-2  overflow-y-auto flex flex-col transactcola">
        {
          sampleUsers.map((sub) => (
            <div key={sub.id} className="flex justify-between items-center px-2">
              <div className="flex justify-start items-center w-full gap-4" >
                <img 
                className='h-10 w-10 rounded-full'
                src={sub.img} 
                alt={sub.name} />
                <p className="font-bold">{sub.name}</p>
              </div>
            </div>
          ))
        }
      </div>
  )
}
