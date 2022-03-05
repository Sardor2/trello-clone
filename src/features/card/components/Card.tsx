import { Box, Button, colors, IconButton, Input, styled } from "@mui/material";
import React, { useState } from "react";
import { Edit } from "@mui/icons-material";
import {
  DragItems,
  ICard,
  useAppDispatch,
  useAppSelector,
  useForm,
} from "commons";
import { selectCardById, updateCard } from "../state/card-slice";
import { connect } from "react-redux";
import { RootState } from "app/store";
import { useDrag } from "react-dnd";

const EditIcon = styled((props: any) => {
  return (
    <IconButton {...props}>
      <Edit />
    </IconButton>
  );
})`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  svg {
    width: 15px;
    height: 15px;
  }
`;

const Wrapper = styled(Box)<{ isDragging: boolean }>`
  position: relative;
  padding: 5px;
  word-wrap: break-word;
  width: 100%;
  padding-right: 25px;
  background-color: ${colors.grey[100]};
  box-shadow: ${(props) => props.theme.shadows[1]};
  opacity: ${(props) => (props.isDragging ? 0 : 1)};
  &:hover {
    background-color: ${colors.grey[200]};
    button {
      display: inline-block;
    }
  }

  h3 {
    font-size: 14px;
    word-break: break-all;
  }
`;
const EditInput = styled(Input)`
  width: 100%;
  resize: none;
  border: none;
  font-size: 14px;
`;

const SaveButton = styled(Button)`
  text-transform: capitalize;
  font-weight: bold;
  padding: 0px 10px;
  margin-top: 5px;
`;

const initialState = {
  title: "",
  description: "",
};

const Card: React.FC<{ id: string } & { card?: ICard; listId: string }> = ({
  id,
  card,
  listId,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: DragItems.CARD,
    item: {
      cardId: id,
      listId,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const { values, handleChange, clear, handleSubmit } = useForm<
    typeof initialState
  >({
    title: card?.title,
    description: card?.description,
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: typeof initialState) => {
    if (data.description && data.title) {
      dispatch(
        updateCard({
          card: {
            id,
            title: data.title,
            description: data.description,
          },
          listId,
        })
      );
      setEditing(false);
    }
  };

  return (
    <Wrapper isDragging={collected.isDragging} ref={drag}>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <EditInput
            autoFocus
            value={values.title}
            name="title"
            onChange={handleChange("title")}
          />

          <EditInput
            autoFocus
            multiline
            value={values.description}
            name="description"
            onChange={handleChange("description")}
          />
          <SaveButton type="submit" variant="contained">
            Save
          </SaveButton>
        </form>
      ) : (
        <>
          <h3>{card?.title}</h3>
          <p>{card?.description}</p>
        </>
      )}
      {isEditing ? null : <EditIcon onClick={() => setEditing(true)} />}
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState, ownProps: { id: string }) => {
  return {
    card: selectCardById(state, ownProps.id),
  };
};

export default connect(mapStateToProps)(Card);
