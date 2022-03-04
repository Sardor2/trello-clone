interface ICard {
  id: string;
  title: string;
  description: string;
}

interface IList {
  id: string;
  title: string;
  cards: ICard[] | string[];
}

interface IUser {}

export { ICard, IList, IUser };
