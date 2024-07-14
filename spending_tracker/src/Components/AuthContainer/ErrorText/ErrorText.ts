import React from "react";

export interface IErrorTextProps {
  error: string;
}

const ErrorText: React.FunctionComponent<IErrorTextProps> = (props) => {
  const { error } = props;

  if (error === "") return null;

  return <p>{error}</p>;
};

export default ErrorText;
