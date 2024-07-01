export interface TemplateType {
  templateId: number;
  username: string;
  userImg: string | null;
  category: string;
  title: string;
  content: string;
  thumbnailImg : string | null;
  createdAt : Date;
  likes: number;
  views: number;
  liked: boolean;
  subscribed: boolean;
};

const DummyPosts: TemplateType[] = [
  {
    templateId: 1,
    title: "First Post",
    content: "This is the **first** post content.",
    username: "user1",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2024-07-01T21:00:00Z"),
    likes: 4,
    liked: true,
    views: 32,
    category: "Study",
    subscribed: true,
  },
  {
    templateId: 2,
    title: "Second Post",
    content: "This is the **second** post content.",
    username: "user2",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2024-07-01T00:00:00Z"),
    likes: 5,
    liked: false,
    views: 45,
    category: "Cooking",
    subscribed: false,
  },
  {
    templateId: 3,
    title: "Third Post",
    content: "This is the **third** post content.",
    username: "user3",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2023-07-03T16:00:00Z"),
    likes: 3,
    liked: true,
    views: 25,
    category: "Study",
    subscribed: true,
  },
  {
    templateId: 4,
    title: "Fourth Post",
    content: "This is the **fourth** post content.",
    username: "user4",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2023-07-04T18:00:00Z"),
    likes: 8,
    liked: false,
    views: 55,
    category: "All",
    subscribed: false,
  },
  {
    templateId: 5,
    title: "Fifth Post",
    content: "This is the **fifth** post content.",
    username: "user5",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2023-07-05T10:00:00Z"),
    likes: 7,
    liked: true,
    views: 40,
    category: "Study",
    subscribed: true,
  },
  {
    templateId: 6,
    title: "Sixth Post",
    content: "This is the **sixth** post content.",
    username: "user6",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2023-07-06T12:30:00Z"),
    likes: 6,
    liked: false,
    views: 30,
    category: "Cooking",
    subscribed: false,
  },
  {
    templateId: 7,
    title: "Seventh Post~~~~~~~~~~~~~~~~~~~~~~~",
    content: "This is the **seventh** post content.",
    username: "user7",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2024-07-01T09:30:00Z"),
    likes: 9,
    liked: true,
    views: 70,
    category: "Study",
    subscribed: true,
  },
  {
    templateId: 8,
    title: "Eighth Post",
    content: "This is the **eighth** post content.",
    username: "user8",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2023-07-08T16:30:00Z"),
    likes: 4,
    liked: false,
    views: 20,
    category: "Cooking",
    subscribed: false,
  },
  {
    templateId: 9,
    title: "Ninth Post",
    content: "This is the **ninth** post content.",
    username: "user9",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2023-07-09T18:30:00Z"),
    likes: 10,
    liked: true,
    views: 60,
    category: "Study",
    subscribed: true,
  },
  {
    templateId: 10,
    title: "Tenth Post",
    content: "This is the **tenth** post content.",
    username: "user10",
    userImg: "https://via.placeholder.com/40",
    thumbnailImg: "https://via.placeholder.com/100",
    createdAt: new Date("2023-07-10T20:30:00Z"),
    likes: 11,
    liked: false,
    views: 80,
    category: "All",
    subscribed: false,
  },
];

export default DummyPosts;