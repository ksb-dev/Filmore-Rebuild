import React from "react";

// context
import { useMovieContext } from "../../../../context/context";

// APIs
import { APIs } from "../../../../APIs/APIs";

const Actor = ({ actor }) => {
  const { mode } = useMovieContext();
  const { original_name, character, profile_path, id } = actor;

  return (
    <div className={"actor " + (mode === true ? "lightBg1" : "darkBg2")}>
      <div className="actor__image">
        <img
          src={
            profile_path !== null
              ? APIs.img_path + profile_path
              : APIs.no_image_url
          }
          alt="actor"
        />
      </div>
      <div className="actor__name-character">
        <span className="name">{original_name && original_name}</span>
        <span className="character">{character && character}</span>
      </div>
    </div>
  );
};

export default Actor;
