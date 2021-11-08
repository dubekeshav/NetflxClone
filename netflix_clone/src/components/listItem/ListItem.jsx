import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./listItem.scss";

function ListItem({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  const trailer =
    "https://cdn.videvo.net/videvo_files/video/free/2017-12/large_watermarked/171124_B1_HD_001_preview.mp4";

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://www.designmantic.com/blog/wp-content/uploads/2016/05/Game-of-Thrones-Logo-718x300.jpg"
        alt=""
      />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownAltOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
              <span className="limit">+16</span>
              <span>1999</span>
            </div>
            <div className="itemDescription">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias tenetur, amet placeat eligendi est harum adipisci sit
              quis autem.
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
}

export default ListItem;
