import React from 'react';
import LoadingGif from '../images/loader.gif';

export default function Loading() {
  return (
    <div className="loading">
      <img src={ LoadingGif } alt="Loading" width="70px" />
    </div>
  );
}
