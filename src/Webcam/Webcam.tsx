import * as React from "react";
import {
  WebcamBtn,
  WebcamCanvas,
  WebcamControls,
  WebcamWrapper,
  WebcamVideo,
  WebcamTimer
} from "./Webcam.style";

const Webcam = () => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isGrayscale, setIsGrayscale] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);

  const resetTime = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  React.useEffect(() => {
    if (isPlaying) {
      let myInterval = setInterval(() => {
        let currSeconds = seconds + 1;
        setSeconds(currSeconds);
        if (currSeconds === 60) {
          let currMinutes = minutes + 1;
          setMinutes(currMinutes);
          setSeconds(0);
          if (currMinutes === 60) {
            setMinutes(0);
            let currHours = hours + 1;
            setHours(currHours);
            setMinutes(0);
          }
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    } else {
      resetTime();
    }
  }, [isPlaying, seconds, minutes, hours]);

  React.useEffect(() => {
    let canvaVideo = canvasRef.current;
    let ctx = canvaVideo.getContext("2d");
    if (!isPlaying) ctx.clearRect(0, 0, 300, 100);
    const interval =
      isPlaying &&
      setInterval(() => {
        let video = videoRef.current;
        const width = 300;
        const height = 100;
        ctx.drawImage(video, 0, 0, width, height);
        if (isGrayscale) {
          ctx.filter = "grayscale(1)";
        } else ctx.filter = "grayscale(0)";
      }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, isGrayscale]);

  const startVideo = () => {
    setIsPlaying(true);
    navigator.getUserMedia(
      { video: true },
      (stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      },
      (error) => console.log(error)
    );
  };

  const stopVideo = () => {
    setIsPlaying(false);
    resetTime();
    let video = videoRef.current;
    if (video.srcObject.getTracks().length > 0)
      video.srcObject.getTracks().map((track) => track.stop());
  };

  return (
    <WebcamWrapper>
      <WebcamTimer>
        <p>{`Time: ${hours}:${minutes}:${seconds}`}</p>
      </WebcamTimer>
      <WebcamVideo ref={videoRef} height="100%" width="100%" muted />
      <WebcamCanvas ref={canvasRef}></WebcamCanvas>
      <WebcamControls>
        <WebcamBtn isPrimary disabled={isPlaying} onClick={startVideo}>
          Start
        </WebcamBtn>
        <WebcamBtn onClick={stopVideo}>Stop</WebcamBtn>
        <WebcamBtn onClick={() => setIsGrayscale(!isGrayscale)}>
          {`TURN ${isGrayscale ? "OFF" : "ON"} GRAYSCALE`}
        </WebcamBtn>
      </WebcamControls>
    </WebcamWrapper>
  );
};

export { Webcam };
