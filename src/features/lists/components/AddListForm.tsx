import React, { useEffect, useRef, useState } from "react";
import { Box, styled } from "@mui/system";
import { Button, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useForm } from "commons";
import { addList } from "../state/list-slice";

const Wrapper = styled(Box)`
  min-width: 300px;
  button {
    text-transform: capitalize;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 80%;

    .add-button {
      width: max-content;
      margin-top: 10px;
      margin-right: auto;
    }
  }
`;

export const AddListForm = () => {
  const [show, setShow] = useState(false);
  const { values, handleChange, clear } = useForm<{ title: string }>({
    title: "",
  });
  const scrollRef = useRef<HTMLElement>();

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [show]);

  const dispatch = useAppDispatch();

  return (
    <Wrapper ref={scrollRef}>
      {show ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (values.title) {
              setShow(false);
              dispatch(
                addList({
                  id: Date.now().toString(),
                  title: values.title,
                })
              );
              clear();
            }
          }}
        >
          <Input
            name="title"
            value={values.title}
            onChange={handleChange("title")}
            placeholder="New list"
            autoFocus
          />
          <Button
            type="submit"
            className="add-button"
            size="small"
            variant="outlined"
          >
            Add
          </Button>
        </form>
      ) : (
        <Button onClick={() => setShow(true)} startIcon={<AddIcon />}>
          New List
        </Button>
      )}
    </Wrapper>
  );
};
