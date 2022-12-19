import React from "react";

interface AuthHrefProps {
  text: string;
  href: string;
  textAnchor: string;
}

const AuthHref = (props: AuthHrefProps) => {
  const { text, href, textAnchor } = props;
  return (
    <p className="text-center text-sm font-light mt-4">
      {text}{" "}
      <a href={href} className="font-bold text-bluebutton">
        {textAnchor}
      </a>
    </p>
  );
};

export default AuthHref;
