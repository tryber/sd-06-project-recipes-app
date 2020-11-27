import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import './InProgress.css';

const InProgress = () => {
  const { inProgressRecipe } = useContext(Context);

  return (
    <div>
      In progress
    </div>
  );
};

export default InProgress;
