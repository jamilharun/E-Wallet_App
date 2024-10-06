export const subs = (subscrived) => {
    const title = [
        {    
            name: 'Twitter',
            industry: 'Social Media',
            id: 1,
            icon: 'https://img.icons8.com/color/48/000000/twitter.png',
            isSubscrived: ()=>{
                subscrived.map((sub)=> sub.id === 1 ? true : false)
            },
            monthly: 10,
            yearly: 100,
            currency: '$',
            balance: 0,
        },{
            name: 'Facebook',
            industry: 'Social Media',
            id: 2,
            icon: 'https://img.icons8.com/color/48/000000/facebook.png',
            isSubscrived: () => {
              return subscrived.some((sub) => sub.id === 2);
            },
            monthly: 10,
            yearly: 100,
            currency: '$',
            balance: 0,
          },{
            name: 'Instagram',
            industry: 'Social Media',
            id: 3,
            icon: 'https://img.icons8.com/color/48/000000/instagram-new.png',
            isSubscrived: () => {
              return subscrived.some((sub) => sub.id === 3);
            },
            monthly: 10,
            yearly: 100,
            currency: '$',
            balance: 0,
          },{
            name: 'Youtube',
            industry: 'Social Media',
            id: 4,
            icon: 'https://img.icons8.com/color/48/000000/youtube-play.png',
            isSubscrived: () => {
              return subscrived.some((sub) => sub.id === 4);
            },
            monthly: 10,
            yearly: 100,
            currency: '$',
            balance: 0,
          },{
            name: 'Linkedin',
            industry: 'Social Media',
            id: 5,
            icon: 'https://img.icons8.com/color/48/000000/linkedin.png',
            isSubscrived: () => {
              return subscrived.some((sub) => sub.id === 5);
            },
            monthly: 10,
            yearly: 100,
            currency: '$',
            balance: 0,
          },{
            name: 'Github',
            industry: 'Social Media',
            id: 6,
            icon: 'https://img.icons8.com/color/48/000000/github.png',
            isSubscrived: () => {
              return subscrived.some((sub) => sub.id === 6);
            },
            monthly: 10,
            yearly: 100,
            currency: '$',
            balance: 0,
          },{
            name: 'Tiktok',
            industry: 'Social Media',
            id: 7,
            icon: 'https://img.icons8.com/color/48/000000/tiktok.png',
            isSubscrived: () => {
              return subscrived.some((sub) => sub.id === 7);
            },
            monthly: 10,
            yearly: 100,
            currency: '$',
            balance: 0,
          },{
            name: 'Snapchat',
            industry: 'Social Media',
            id: 8,
            icon: 'https://img.icons8.com/color/48/000000/snapchat.png',
            isSubscrived: () => {
              return subscrived.some((sub) => sub.id === 8);
            },
            monthly: 10,
            yearly: 100,
            currency: '$',
            balance: 0,
          }
    ]
    return title
}