import React, { FunctionComponent } from "react";

export interface OwnProps {
  test?: string;
}

type Props = OwnProps;

const Youtube: FunctionComponent<Props> = ({ test }) => {
  console.log(test);
  return (
    <div>
      <iframe
        width="1664"
        height="769"
        src="https://www.youtube.com/embed/dTFXufTgfOE?autoplay=1&controls=0"
        title="Build a Fullstack E-commerce using Next.js (react.js, mongo, tailwind, styled components)"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Youtube;
