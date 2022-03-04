import { IList } from "@commons/models";
import { api } from "../commons/api";

const listService = {
  list: () => api.get<IList[]>("/lists")
};

export { listService };
