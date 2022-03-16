import { IList } from "commons/models";

import { normalize } from "normalizr";
import { listEntity } from "commons/entity-schemas";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  writeBatch,
  setDoc,
} from "firebase/firestore";
import { db } from "firebase-config";
import { EntityId } from "@reduxjs/toolkit";

const listService = {
  list: async () => {
    try {
      const listRef = collection(db, "lists");

      const responseFirebase = await getDocs(
        query(listRef, orderBy("order"))
      ).then((r) =>
        r.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        }))
      );
      const normalizedData = normalize(responseFirebase, [listEntity]);
      return normalizedData.entities;
    } catch (e) {
      console.error(e);
    }
  },
  updateOne: async (newUpdatedList: Partial<IList>) => {
    try {
      if (newUpdatedList.id) {
        await updateDoc(
          doc(db, "lists", newUpdatedList.id?.toString()),
          newUpdatedList
        );
      }
    } catch (error) {
      console.log("Failed to update list", error);
    }
  },
  add: async (newList: IList) => {
    try {
      await setDoc(doc(db, "lists", newList.id), newList);
    } catch (error) {
      console.log("error adding new list", error);
    }
    // api.post<IList>("/lists", newList);
  },
  removeOne: async (lists: IList[], deleteId:EntityId) => {
    // api.delete(`/lists/${id}`);
    const batch = writeBatch(db)
    lists.forEach(item => {
      batch.update(doc(db, 'lists', item.id), {
        order: item.order
      })
    })
    batch.delete(doc(db,'lists', deleteId.toString()))
    await batch.commit()
    // try {
    //   await deleteDoc(doc(db, "lists", id));
    // } catch (e) {
    //   console.log("error deleting list doc", e);
    // }
  },
  updateLists: async (body: IList[]) => {
    try {
      const batch = writeBatch(db);

      body.forEach((list) => {
        batch.update(doc(db, "lists", list.id), {
          ...list
        });
      });

      await batch.commit();
    } catch (error) {
      console.log("Failed to replace lists", error);
    }

    // await Promise.all(promises);
    // await Promise.all(
    //   body.map((list) => {
    //     api.post(`/lists/`, list);
    //   })
    // );
  },
};

export { listService };
