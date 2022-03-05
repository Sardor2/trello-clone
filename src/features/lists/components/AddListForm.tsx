import React, { useState } from "react";
import { Box, styled } from "@mui/system";
import { Button, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useForm } from "commons";
import { addList } from "../state/list-slice";

const Wrapper = styled(Box)`
  button {
    text-transform: capitalize;
  }

  form {
    display: flex;
    flex-direction: column;

    .add-button {
      width: max-content;
      margin-top: 10px;
      margin-left: auto;
    }
  }
`;

export const AddListForm = () => {
  const [show, setShow] = useState(false);
  const { values, handleChange, clear } = useForm<{ title: string }>({
    title: "",
  });
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      {show ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (values.title) {
              setShow(false);
              dispatch(
                addList({
                  id: Date.now() + values.title,
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
        <Box>
          <Button onClick={() => setShow(true)} startIcon={<AddIcon />}>
            New List
          </Button>
        </Box>
      )}
    </Wrapper>
  );
};
