import styled from "styled-components";

export const CircleContainer = styled.div`
    position: absolute;
    background-color: ${({colour}) => colour ? `${colour}` : 'red'} ;
    border-radius: 50%;
    z-index: 1;
    width: ${({width}) => width ? `${width}` : '800px'} ;
    height: ${({height}) => height ? `${height}` : '800px'};
    top: ${({top}) => `${top}px`};
    right: ${({right}) => `${right}px`}
`

