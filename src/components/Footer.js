import React from 'react';

// Icons
import {
  faCompass,
  faGlassMartiniAlt,
  faUtensils } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styled components
import { FooterContainer, FooterIconStyle } from '../styles/footerStyle';

function Footer() {
  return (
    <FooterContainer data-testid="footer">
      <div>
        <FooterIconStyle>
          <a
            href="/bebidas"
          >
            <FontAwesomeIcon icon={ faGlassMartiniAlt } size="3x" />
          </a>
          <a
            href="/explorar"
          >
            <FontAwesomeIcon icon={ faCompass } size="3x" />
          </a>
          <a
            href="/comidas"
          >
            <FontAwesomeIcon icon={ faUtensils } size="3x" />
          </a>
        </FooterIconStyle>
      </div>
    </FooterContainer>
  );
}

export default Footer;
