import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Input = ({ name, icon: Icon, error, value, ...rest }) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    setHasText(!!value);
  }, [value]);

  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setHasFocus(false);

    setHasText(!!value);
  }, [value]);

  return (
    <div
      className={ `
        input-container
        ${hasFocus ? 'has-focus' : ''}
        ${error ? 'has-error' : ''}
        ${hasText ? 'has-text' : ''}
      ` }
    >
      {Icon && <Icon size={ 24 } />}

      <input
        className="custom-input"
        name={ name }
        value={ value }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
        { ...rest }
      />
    </div>
  );
};

Input.defaultProps = {
  error: false,
  value: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  error: PropTypes.bool,
};

export default Input;
