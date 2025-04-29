import React from "react";
import { Badge, badgeVariants } from "./ui/badge";
import { Link } from "react-router";

const BadgeUs = () => {
  return (
    <div>
      <Link
        to="/b"
        className={`${badgeVariants({
          variant: "outline",
        })} h-10 m-10 w-sm border-destructive`}
      >
        click here
      </Link>
    </div>
  );
};

export default BadgeUs;
