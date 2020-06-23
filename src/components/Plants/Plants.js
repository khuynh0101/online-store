import React from 'react';
import { useParams } from 'react-router-dom';

export const Plants = () => {
  const { name } = useParams();
  return <div>{name}</div>;
};
