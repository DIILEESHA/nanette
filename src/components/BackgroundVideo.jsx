import React from "react";
import "../App.css";

const BackgroundVideo = () => {
  return (
    <div>
      <video autoPlay muted loop className="background-video">
        <source
          src="https://ik.imagekit.io/fh2hj1ayv/Gold%20and%20White%20Elegant%20Happy%20Birthday%20Video%20(1).mp4?updatedAt=1747404562708"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default BackgroundVideo;
