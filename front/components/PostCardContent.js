//해시태그 선택하는 정규표현식

import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s]+)/)) {
        return (
          <Link
            href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
            as={`/hashtag/${v.slice(1)}`}
            key={i}
          >
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
