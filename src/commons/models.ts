interface ICard {
  id: string;
  title: string;
  description: string;
}

interface IList {
  id: string;
  title: string;
  cards: ICard[];
}

export enum DropDragItems {
  CARD = "CARD",
  LIST = "LIST",
}

interface IUser {}

export type { ICard, IList, IUser };
