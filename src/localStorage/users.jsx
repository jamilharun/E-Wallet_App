
export const sampleUsers = [
    {
        id: 1,
        name: 'John Doe',
        img: 'https://randomuser.me/api/portraits/men/1.jpg',
        cardNumber: '5234 6718 9524 8347',
    },
    {
        id: 2,
        name: 'Jane Doe',
        img: 'https://randomuser.me/api/portraits/women/1.jpg',
        cardNumber: '3741 9823 4096 7342',
    },
    {
        id: 3,
        name: 'Bob Smith',
        img: 'https://randomuser.me/api/portraits/men/2.jpg',
        cardNumber: '6011 4527 8394 1289',
    },
    {
        id: 4,
        name: 'Sara Johnson',
        img: 'https://randomuser.me/api/portraits/women/2.jpg',
        cardNumber: '4539 0172 3849 2765',
    },
    {
        id: 5,
        name: 'Alice Brown',
        img: 'https://randomuser.me/api/portraits/women/3.jpg',
        cardNumber: '4921 7674 8163 5294',
    }
]
export const randomUsers = () => {
    // Get a random user
    const getRandomUser = () => {
        return sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    };

    // Return the result of calling getRandomUser, not the function itself
    return getRandomUser();
};