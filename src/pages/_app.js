import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

MyApp.propTypes = {
  pageProps: PropTypes.any,
  Component: PropTypes.any,
};
