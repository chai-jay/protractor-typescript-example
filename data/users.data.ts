export interface User {
  username: string;
  password: string;
  types: UserType[];
}

export enum UserType {
  IEL = 'iel',
  INST = 'institution',
  WEB = 'web'
}

export const users: User[] = [
  {
    username: 'fakesampleusername1',
    password: 'fakesampleusername1',
    types: [UserType.IEL, UserType.INST]
  },
  {
    username: 'fakesampleusername2',
    password: 'fakesampleusername2',
    types: [UserType.WEB]
  }
];

export const instUsers: User[] = users.filter((user) => {
  return user.types.some(type => type === UserType.INST);
});

export const webUsers: User[] = users.filter((user) => {
  return user.types.some(type => type === UserType.WEB);
});
