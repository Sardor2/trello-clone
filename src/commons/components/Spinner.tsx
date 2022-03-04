import { CircularProgress, styled } from "@mui/material";
import React from "react";

const StyledProgress = styled(CircularProgress)`
  color: black;
`;

const Wrapper = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  loading?: boolean;
  className?: string;
  size?: number;
};

export const Spinner: React.FC<Props> = ({
  children,
  size,
  loading,
  className
}) => {
  return (
    <>
      {loading ? (
        <Wrapper className={className}>
          <StyledProgress size={size} />{" "}
        </Wrapper>
      ) : (
        children
      )}
    </>
  );
};

Spinner.defaultProps = {
  size: 20,
  loading: false,
  className: ""
};
