import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./watch.scss";

function Watch() {
  const location = useLocation();
  const movie = location.state.movie;
  return (
    <div className="watch">
      <div className="back">
        <Link to="/" className="link">
          <ArrowBackOutlined />
        </Link>
      </div>
      <video className="video" autoPlay progress controls src={movie.movie} />
    </div>
  );
}

export default Watch;
