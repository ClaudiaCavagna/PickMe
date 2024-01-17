import React from 'react';
import styled, {keyframes} from 'styled-components';

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const WaveBox = styled('div')`
  &::after {
    animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
  }
`;

const SkeletonBox = styled(WaveBox)`
  background-color: var(--grey-700);
  width: 100%;
  height: 100%;
  ::after {
    background-color: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent);
    content: "";
    position: absolute;
    transform: translateX(-100%);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
`

const Skeleton = () => {
  return (
    <SkeletonBox />
  )
}

export default Skeleton;
