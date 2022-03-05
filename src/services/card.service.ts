import { ICard } from "commons";
import { api } from "../commons/api";

const cardService = {
  updateCard: (listId: string) => (updatedCards: any) => {
    return api.patch(`/lists/${listId}`, {
      cards: updatedCards,
    });
  },
};

export { cardService };
