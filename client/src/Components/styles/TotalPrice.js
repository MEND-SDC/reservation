import styled from 'styled-components';

export const Wrapper = styled.div`
padding: 15px;
border-bottom: 1px solid #e5e5e5;
display: flex;
flex-flow: column;
`;

export const Container = styled.div`
display: flex;
flex-flow: row;
border-bottom: 1px solid #e5e5e5;
padding: 10px;
justify-content: space-between;
`;

export const Informational = styled.div`
color: #484848;
font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 18px;
`;

export const Price = styled.div`
color: #484848;
font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 18px;
`;

export const Button = styled.button`
height: 20px;
width: 20px;
border-radius: 50%;
border: 1px solid #49a2a5;
color: #49a2a5;
`;
