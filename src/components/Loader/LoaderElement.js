import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay"
LoadingOverlay.propTypes = undefined

export const StyledLoader = styled(LoadingOverlay)`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  .MyLoader_overlay {
    background: rgba(255, 0, 0, 0.5);
  }
  &.MyLoader_wrapper--active {
    overflow: hidden;
  }
`;
