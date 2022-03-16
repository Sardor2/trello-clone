import { ICard } from "commons";
import { db } from "firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const cardService = {
  updateCard: (listId: string) => async (updatedCards: ICard[]) => {
    await updateDoc(doc(db, "lists", listId), {
      cards: updatedCards,
    });
  },
};

export { cardService };
