import { Box, Button, IconButton, Input, styled } from "@mui/material";
import { useAppDispatch, useForm } from "commons";
import React, { useState } from "react";
import { addCard } from "../state/list-slice";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 5px;

  .add-button {
    width: 100px;
  }
`;

const initialState = {
  title: "",
  description: "",
};

const AddCardForm: React.FC<{ listId: string }> = ({ listId }) => {
  const [showForm, setShowForm] = useState(false);

  const { values, handleChange, clear } =
    useForm<typeof initialState>(initialState);
  const dispatch = useAppDispatch();

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (values.description && values.title) {
      dispatch(
        addCard({
          id: listId,
          card: {
            id: Date.now() + values.title,
            ...values,
          },
        })
      );
      clear();
      setShowForm(false);
    }
  };

  return showForm ? (
    <Form onSubmit={onSubmit}>
      <Input
        value={values.title}
        onChange={handleChange("title")}
        placeholder="Title"
        name="title"
      />
      <Input
        minRows={2}
        value={values.description}
        onChange={handleChange("description")}
        placeholder="Description"
        name="description"
        multiline
      />
      <Box mt={2} display={"flex"} justifyContent="space-between">
        <Button
          className="add-button"
          size="small"
          variant="contained"
          type="submit"
        >
          Add Card
        </Button>
        <IconButton onClick={() => setShowForm(false)}>
          <ClearIcon />
        </IconButton>
      </Box>
    </Form>
  ) : (
    <Button
      sx={{ mt: 2 }}
      onClick={() => setShowForm(true)}
      startIcon={<AddIcon />}
    >
      Add Card
    </Button>
  );
};

export { AddCardForm };
