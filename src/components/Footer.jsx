import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  const exploreIcon = 'https://s3-alpha-sig.figma.com/img/4af1/7bad/204ed6440fc9f98ff5790a9a9c3d4e12?Expires=1607904000&Signature=XqnYPNwdAnqihE6dwcP6iIZZOdyCw3Noes6gnXIlrJGLny5cCeg~PsT-joNp7CJlesoiipbRUFpKLWJsx26EjaoNV1t9eKILhqd3WCHZuCMUWXfOgjpIfXcH34SgcpiaKOrLnvCceA-mnmtgY3NjkwjGxi9xXd9vSuO6-LVsb9HJagDMzQrBknm3ZXrKmT1tSonHAYM-UV-AUiL2N7odPr~xYkBb43GyyEjgUF-kinh~RTkGzE4c9~QANzvA0epK~PWhFUoSoBpi0TN7-cuASUh9Qk1gJrVi6JwKwuur0iSCZ64tSYgv-dYStSlKaSbPQbz7E2Y29K6QUGkypwYdvw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
  const drinkIcon = 'https://s3-alpha-sig.figma.com/img/35c3/54eb/692d2d0b57b0beff114e9a64324e7294?Expires=1607904000&Signature=bKAB8~8FoKgvOk4tGfPu7Lpg-kcsKe9gtmrOT97zvtbo9cI5EyQSUCAFc3ai3Atkn9uucWDlYonzqbb6Qa4-HBSU-TU0SiRcq~30Tp5eHQ~61sXk3X8ofMHjYX3kfS3jqDcyqiUV3t0uwO6psEqKMLs3JX6QsR6FHhCg87A-WhDNwoMJwDtG~Rv7ivFIxNHjCEkNJVAMK724sNUBrgcKOEpPG02gBc~b132I2hrwEHSL9Qqp3aQ6i64mo6U7DRAUooXUtanMqtGGmrJtPJxh8zpEThOvPlfjz7q3oDhnNkkivgLNMwiOE2DitMggK4K6xCDWQ0jcrMzF5JOWkRGbCA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
  const mealIcon = 'https://s3-alpha-sig.figma.com/img/9ad8/bad4/ba310b9799e95da825593be858214fc3?Expires=1607904000&Signature=IcKjbrnid3RlkrLIEopn-F~~zZQ1Ui0b24I32q9JwCHVayx7Fm5YNwKoRyP91kOQvoElZVSGRKwLZtTxNpGScQmdBBP3XDgRI3VmHTtSdFvRpaJ8vFN-p6cORlU2K-QW9cHKBjaP2nvNW-zKAFnk~T1exBqKZuybxU7wo8aQWQhpsTl4ABgYLL9~5lNqO0caXp9I71rTwU1asSChNalh9nWUl7cZCFV12b2SNXlc1EcRB2y7QnoBLf8b-rWZz9DEcy9f0NcfhzWmyVcbSonOEYruyuanNYNlq8mj~1GfCV30ccAcJQO4P~PImNC5Nw7rFZz4aoU7KtUFc7bsI~UCzA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img
          width="50"
          height="50"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </Link>
      <Link to="/explorar">
        <img
          width="40"
          height="40"
          padding-top="20"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="exploreIcon"
        />
      </Link>
      <Link to="/comidas">
        <img
          width="65"
          height="50"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </Link>
    </div>
  );
}

export default Footer;
