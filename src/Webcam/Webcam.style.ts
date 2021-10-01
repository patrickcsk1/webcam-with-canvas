import styled from "styled-components";

interface IWebcamBtn {
  isPrimary: boolean;
}

export const WebcamTimer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > p {
    color: black;
    margin-right: 5px;
  }
`;

export const WebcamBtn = styled.button<IWebcamBtn>`
  padding: 10px 15px;
  outline: none;
  border: none;
  background: ${(props) => (props.isPrimary ? "green" : "pink")};
  color: ${(props) => (props.isPrimary ? "white" : "black")};
`;
export const WebcamControls = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const WebcamCanvas = styled.canvas`
  border: 1px solid blue;
  background: lightblue;
  width: 100%;
  height: 100%;
`;
export const WebcamVideo = styled.video`
  display: none;
`;
export const WebcamWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background: white;
  border: 1px solid crimson;
  margin: 50px auto;
`;
