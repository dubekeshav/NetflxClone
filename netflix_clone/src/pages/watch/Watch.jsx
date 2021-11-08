import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import "./watch.scss";

function Watch() {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined /> Home
      </div>
      <video
        className="video"
        autoPlay
        progress
        controls
        src="https://cdn.videvo.net/videvo_files/video/free/2020-03/large_watermarked/200223_Cafe_03_39_preview.mp4"
      />
    </div>
  );
}

export default Watch;
