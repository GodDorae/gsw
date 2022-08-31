import styled from "styled-components";
import VideoContent from "../../assets/HomePageVideo.mp4";

const VideoContainer = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
`;

const VideoTitle = styled.div`
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
`;

function VideoAndTitle() {
  return (
    <VideoContainer>
      <video
        autoPlay={true}
        loop={true}
        muted={true}
        src={VideoContent}
        style={{ width: "100%", height: "100%", opacity: "0.25", zIndex: "-1", objectFit: "cover"}}
      />
      <VideoTitle>
        YOU ALREADY KNOW <br />
        WHO IS 21-22 NBA CHAMPION 😤
      </VideoTitle>
    </VideoContainer>
  );
}

export default VideoAndTitle;
