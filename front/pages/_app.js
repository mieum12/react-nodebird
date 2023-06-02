// import PropTypes from "prop-types";
import Head from "next/head";
// import "antd/dist/antd.css";
import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Trirong"
        ></link>
        <title>LIFE RECAP</title>
      </Head>
      {/* <div>전체의 공통메뉴</div> */}
      <Component />
    </div>
  );
};

// NodeBird.propTypes = {
//   Component: PropTypes.elementType.isRequired,
// };

export default wrapper.withRedux(NodeBird);
