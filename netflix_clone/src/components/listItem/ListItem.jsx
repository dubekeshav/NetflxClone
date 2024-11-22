import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./listItem.scss";

function ListItem({ index, itemId }) {
  const [isHovered, setIsHovered] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get("/movies/movie/" + itemId, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTYxMjU5MTA3MDExZDE5YmM5MDk1YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzkzODI0MSwiZXhwIjoxNjM4MzcwMjQxfQ.-3hKIaSAv8eaBrDeQkTSwd0X9Pj28aDBptGCHQ3H_ec",
          },
        });
        setItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItem();
  }, [itemId]);

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={item.listImg} alt="" />

      {isHovered && (
        <>
          <Link to="/watch" state={{ movie: item }} className="link">
            <video src={item.trailer} autoPlay={true} loop />
          </Link>
          <div className="itemInfo">
            <div className="icons">
              <Link to="/watch" state={{ movie: item }} className="link">
                <PlayArrow className="icon" />
              </Link>

              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownAltOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{item.duration}</span>
              <span className="limit">{item.ageLimit}+</span>
              <span>{item.year}</span>
            </div>
            <div className="itemDescription">{item.description}</div>
            <div className="genre">{item.genre}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default ListItem;
