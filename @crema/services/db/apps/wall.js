import {getCustomDateTime} from '../../../utility/Utils';

export const wallData = {
  id: 123,
  name: 'Suzanna J. Fowler',
  profilePic: 'https://via.placeholder.com/150',
  videoCall: {
    users: [
      {
        id: 1,
        name: 'John Doe',
        profilePic: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Lily John',
        profilePic: 'https://via.placeholder.com/150',
      },
    ],
    title: 'Jessica Wedding Plan',
  },
  friendRequests: [
    {
      id: 5454,
      profilePic: 'https://via.placeholder.com/150',
      name: 'Sarah Taylor',
      date: getCustomDateTime(-12, 'minutes', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
    {
      id: 435,
      profilePic: 'https://via.placeholder.com/150',
      name: 'Johna Say',
      date: getCustomDateTime(-30, 'minutes', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
    {
      id: 54345,
      profilePic: 'https://via.placeholder.com/150',
      name: 'Nikunj Lee',
      date: getCustomDateTime(-50, 'minutes', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
    {
      id: 7656,
      profilePic: 'https://via.placeholder.com/150',
      name: 'Kennie Sebestian',
      date: getCustomDateTime(-120, 'minutes', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
    {
      id: 875456,
      profilePic: 'https://via.placeholder.com/150',
      name: 'Bose Warne',
      date: getCustomDateTime(-1, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
  ],
  photos: [
    {
      id: 1,
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 7,
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 8,
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 9,
      thumb: 'https://via.placeholder.com/150',
    },
  ],
  recentNews: [
    {
      id: 1,
      user: {
        name: 'Kara Blake',
        profilePic: 'https://via.placeholder.com/150',
      },
      title: 'New Post Design',
      desc: 'It is a long established fact that a user will be diverted',
    },
    {
      id: 2,
      user: {
        name: 'Jonathan Lee',
        profilePic: 'https://via.placeholder.com/150',
      },
      title: 'New Book Release',
      desc: 'It is a long established fact that a user will be diverted',
    },
    {
      id: 3,
      user: {
        name: 'Johna Khali',
        profilePic: 'https://via.placeholder.com/150',
      },
      title: 'Scraping of Law',
      desc: 'It is a long established fact that a user will be diverted',
    },
    {
      id: 4,
      user: {
        name: 'Kara Blake',
        profilePic: 'https://via.placeholder.com/150',
      },
      title: 'Inching towards Victory',
      desc: 'It is a long established fact that a user will be diverted',
    },
  ],
  whoToFollow: [
    {
      id: 1,
      name: 'Key Chain',
      profilePic: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Kinda Joe',
      profilePic: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Subrata Ponting',
      profilePic: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Kane Twose',
      profilePic: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'Reymen sterio',
      profilePic: 'https://via.placeholder.com/150',
    },
  ],
  suggestions: [
    {
      id: 1,
      name: 'Facebook Design',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'React Developers',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Buy & Sell',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'All about travel',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'Javascript Lovers',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: 'https://via.placeholder.com/150',
    },
  ],
};

export const postsList = [
  {
    id: 123,
    owner: {
      name: 'Cripton Rice',
      profilePic: 'https://via.placeholder.com/150',
      id: 323445,
    },
    date: getCustomDateTime(-1, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
    attachments: [
      {
        id: 5445,
        path: 'https://via.placeholder.com/800x600',
        preview: 'https://via.placeholder.com/800x600',
        metaData: {type: 'images/jpg', size: 2343},
      },
      {
        id: 54546,
        path: 'https://via.placeholder.com/800x600',
        preview: 'https://via.placeholder.com/800x600',
        metaData: {type: 'images/jpg', size: 2345},
      },
    ],
    message: 'Beautiful cities of Europe...',
    liked: true,
    likes: 324,
    shares: 45,
    views: 3456,
    comments: [
      {
        id: 324,
        author: {
          name: 'John Doe',
          profilePic: 'https://via.placeholder.com/150',
          id: 3423,
        },
        liked: true,
        comment: 'Wow! these pics are so mesmerizing.',
        date: getCustomDateTime(-1, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
      },
    ],
  },
  {
    id: 3443,
    owner: {
      name: 'John Buchanan',
      profilePic: 'https://via.placeholder.com/150',
      id: 3243,
    },
    date: getCustomDateTime(-2, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
    attachments: [
      {
        id: 5445,
        path: 'https://via.placeholder.com/800x600',
        preview: 'https://via.placeholder.com/800x600',
        metaData: {type: 'images/jpg', size: 2343},
      },
      {
        id: 54546,
        path: 'https://via.placeholder.com/800x600',
        preview: 'https://via.placeholder.com/800x600',
        metaData: {type: 'images/jpg', size: 2345},
      },
    ],
    message: 'Amazing clicks from my camera!',
    liked: false,
    likes: 435,
    shares: 34,
    views: 6544,
    comments: [
      {
        id: 5465,
        author: {
          name: 'James Jennie',
          profilePic: 'https://via.placeholder.com/150',
          id: 343432,
        },
        liked: true,
        comment: 'Wow! Excellent, these images are so beautiful.',
        date: getCustomDateTime(0, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
      },
    ],
  },
  {
    id: 3454,
    owner: {
      name: 'Josh Blake',
      profilePic: 'https://via.placeholder.com/150',
      id: 32434,
    },
    date: getCustomDateTime(-3, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
    attachments: [
      {
        id: 54546,
        path: 'https://via.placeholder.com/800x600',
        preview: 'https://via.placeholder.com/800x600',
        metaData: {type: 'images/jpg', size: 2345},
      },
    ],
    content: '',
    liked: true,
    likes: 4343,
    shares: 34,
    views: 3243,
    comments: [],
  },
];
