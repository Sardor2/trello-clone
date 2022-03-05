import React, { ChangeEvent, useState } from "react";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type SubmitHandler<T> = (data: T) => void;

export const useForm = <
  T = {
    [key: string]: unknown;
  }
>(
  initialState
) => {
  const [values, setValues] = useState<T>(initialState);
  const handleChange = (name: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setValues((values) => ({
        ...values,
        [name]: e.target.value,
      }));
    };
  };

  const handleSubmit = (onSubmit: SubmitHandler<T>) => {
    return (e: React.SyntheticEvent) => {
      e.preventDefault();
      onSubmit(values);
    };
  };

  const clear = () => {
    setValues(initialState);
  };

  return { values, handleChange, setValues, clear, handleSubmit };
};
