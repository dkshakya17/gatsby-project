import styled from 'styled-components';
import info from '../images/info.svg';
import error from '../images/error.svg';

export const Aside = styled.aside`
  background: ${({ className }) =>
    className.includes('warning')
      ? 'rgba(239, 174, 8, 0.1)'
      : className.includes('notice')
      ? 'rgba(125, 68, 240, 0.1)'
      : 'rgba(125, 68, 240, 0.1)'};
  border: ${({ className }) =>
  className.includes('warning')
  ? ' solid 1px #efae08'
  : className.includes('notice')
  ? '1px solid #7d44f0'
  : '1px solid #7d44f0'};
  background-image: ${({ className }) =>
  className.includes('warning')
  ? `url(${error})`
  : className.includes('notice')
  ? `url(${info})`
  : `url(${info})`};
  padding: 26px 46px;
  padding-left: 10%;
  font-family: 'openSans' !important;
  box-sizing: border-box;
  width: 93%;
  margin: 0 auto;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #666666;
  border-radius: 8px;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 36px;
  background-position-x: 20px;

`
