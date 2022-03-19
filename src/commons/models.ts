interface ICard {
  id: string;
  title: string;
  description: string;
}

interface IList {
  id: string;
  title: string;
  cards: ICard[];
  order: number;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
}

export enum DropDragItems {
  CARD = "CARD",
  LIST = "LIST",
}

export type { ICard, IList, IUser };
