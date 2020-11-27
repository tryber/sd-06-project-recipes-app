import React, { useContext } from 'react';
import Context from '../../context/Context';
import './InProgress.css';

const InProgress = () => {
  const { inProgressId } = useContext(Context);
  return (
    <div>
      In progress
      <p>{ inProgressId }</p>
    </div>
  );
};

export default InProgress;
