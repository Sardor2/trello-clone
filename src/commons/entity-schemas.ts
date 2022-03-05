import { schema } from "normalizr";

export const cardEntity = new schema.Entity("cards");

export const listEntity = new schema.Entity("lists", {
  cards: [cardEntity],
});
