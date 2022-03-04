import { api } from "../commons/api";

const cardService = {
  list: () => api.get("/cards"),
  getById: (id: string) => api.get(`/cards/${id}`)
};

export { cardService };
