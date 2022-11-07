import { ClockLoader } from "react-spinners";
import { StyledLoader } from "./LoaderElement";

export default function MyLoader({ active, children }) {
  return (
    <StyledLoader active={active} spinner={<ClockLoader />}>
      {children}
    </StyledLoader>
  );
}
