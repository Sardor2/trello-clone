import { api } from "../commons/api";

const userService = {
  list: () => api.get("/users"),
  getById: (id: string | number) => api.get(`/users/${id}`),
};

export { userService };
