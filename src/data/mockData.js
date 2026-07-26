export const mockUser = {
  displayName: "Dina Usman",
  email: "dinausman2001@gmail.com",
};

export const mockStats = {
  groups: 1,
  events: 0,
  posts: 0,
  polls: 0,
  payments: 0,
};

export const mockEvents = []; // empty on purpose — matches your "No upcoming events" screenshot

export const mockPosts = [];
export const mockPolls = [];
export const mockPayments = [
  {
    id: 1,
    groupName: "Mumbai cricket club",
    title: "Kit",
    category: "Club Fee",
    frequency: "One Time",
    amount: 1,
    collected: 1,
    dueDate: "21 Jul 2026",
    status: "Paid",
  },
];
export const mockGroups = [
  {
    id: 1,
    name: "Mumbai cricket club",
    sport: "Volleyball",
    groupType: "Normal Group",
    clubType: "Club",
    location: "Mumbai",
    members: 1,
    subGroups: 0,
    teams: 1,
    groupCode: "121E7K0FK8",
  },
];
export const mockProfile = {
  displayName: "Dina Usman",
  email: "dinausman2001@gmail.com",
  phone: "8590412538",
  isPlayer: true,
  groups: 1,
  children: 0,
  events: 0,
};
export const mockGroupEvents = [
  {
    id: 1,
    groupName: "Mumbai cricket club",
    title: "Match city",
    type: "Match",
    date: "Wed 22 Jul",
    time: "5:26 am",
    rsvp: { going: 0, notGoing: 0, maybe: 0 },
    fee: 0,
  },
];
export const mockGroupPosts = [
  {
    id: 1,
    groupName: "Mumbai cricket club",
    title: "",
    content: "Dygejeoabakst",
    pinned: true,
    date: "23 Jul 2026",
  },
];
export const mockGroupPolls = [];