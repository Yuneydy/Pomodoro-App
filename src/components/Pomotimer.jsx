import React from 'react';
import { BsStopwatch } from 'react-icons/bs';
import styled from 'styled-components';

const TimerWrapper = styled.div`
  margin-top: 20px;
  width: 450px;
  margin: 20px auto;
  background-color: #91c2a8;
  border-radius: 8px;
  padding: 20px; /* Add padding for better visibility */
  box-sizing: border-box; /* Include padding in the width */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.2);
  padding 1 rem 0;

  .stopwatch {
    font-size: 6rem;
    margin-right: 1rem;
    color: white;
  }
  
  label {
    margin-bottom: 0.5rem;
    color: #fff;
    font-family:"Manrope", sans-serif;
    padding-left: 40px;
  }

  input {
    width: 100px;
    margin-right: 1rem;
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: 4.5rem;
    font-weight: 600;
    text-align: center;
    color: #9acfb3;
    box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 0rem 0.5rem;
    cursor: pointer;
  }
  input:hover {
    background-color: #c2e6d3;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }
`;

export default function Pomotimer({seconds, minutes, changeMinutes, changeSeconds}) {
  return (
    <TimerWrapper>
      <BsStopwatch class= 'stopwatch'/>
      <div className='d-flex flex-column'>
        <label>MIN</label>
        <input value={minutes} onChange={changeMinutes}/>
      </div>{" "}
      <div className='d-flex flex-column'>
        <label>SEC</label>
        <input  value={seconds} onChange={changeSeconds}/>
      </div>{" "}
    </TimerWrapper>
  );
}

