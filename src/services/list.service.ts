import { IList } from "commons/models";
import { api } from "../commons/api";

import { normalize } from "normalizr";
import { listEntity } from "commons/entity-schemas";

const listService = {
  list: async () => {
    try {
      const response = await api.get<IList[]>("/lists");
      const normalizedData = normalize(response.data, [listEntity]);
      return normalizedData.entities;
    } catch (e) {}
  },
  updateOne: async (newUpdatedList: Partial<IList>) => {
    return api.patch(`/lists/${newUpdatedList.id}`, newUpdatedList);
  },
  add: (newList: IList) => api.post<IList>("/lists", newList),
  removeOne: (id: string) => api.delete(`/lists/${id}`),
  updateLists: async (body: IList[]) => {
    let promises = body.map((list) => {
      api.delete(`/lists/${list.id}`);
    });
    await Promise.all(promises);

    await Promise.all(
      body.map((list) => {
        api.post(`/lists/`, list);
      })
    );
  },
};

export { listService };
