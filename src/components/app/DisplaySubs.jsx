import { subs } from "../../localStorage/subscriptions";

export default function DisplaySubs() {
    
    const getsubs = () => {
        const listofSubs = [
            { id: 1 },
            { id: 3 },
            { id: 5 }
        ];

        const allSubs = subs(listofSubs);
        return allSubs;
    };

    const subscriptions = getsubs(); // Call the function to get the data

    return (
      <div className="border-EWred border-4 rounded-lg space-y-2  overflow-y-auto flex flex-col transactcola 
      lg:h-400px  xl:w-full xl:h-96 2xl:w-72 2xl:h-500px">
        {
          subscriptions.map((sub) => (
            <div key={sub.id} className="flex justify-between items-center px-2">
              <div className="flex">
                <img src={sub.icon} alt={sub.name} />
                <div>
                    <p className="font-bold">{sub.name}</p>
                    <p className="text-sm">{sub.industry}</p>
                </div>
              </div>
              {
                sub.isSubscrived() ? (
                <div>
                    <p className="text-end text-xl">{sub.balance ? sub.balance : '0'}{sub.currency ? sub.currency : 'N/A'}</p>
                    <div className="flex">
                        <p className="text-xl xl:text-lg">{sub.monthly ? sub.monthly : 'N/A'}<span className="text-sm ">{sub.currency ? sub.currency : 'N/A'}/m</span></p>
                        <p className="text-xl xl:text-lg xl:hidden">{sub.yearly ? sub.yearly : 'N/A'}<span className="text-sm xl:hidden">{sub.currency ? sub.currency : 'N/A'}/yrly</span></p>

                    </div>
                </div>
                ) : (
                  <p className="text-EWdarkBlue bg-EWred text-2xl xl:text-xl rounded-lg font-semibold xl:font-medium p-1">Follow</p>
                )
              }
            </div>
          ))
        }
      </div>
    );
}
