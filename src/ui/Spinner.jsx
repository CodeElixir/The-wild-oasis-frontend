import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StyledDiv = styled.div`
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px no-repeat,
    conic-gradient(#0000 30%, #4f46e5);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

function Spinner() {
  return <StyledDiv className="mx-auto mt-12 w-16" />;
}

export default Spinner;
