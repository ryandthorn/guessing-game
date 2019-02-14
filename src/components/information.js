import React from 'react';

export default function Information(props) {
  if (props.clue === 'You guessed it!') {
    return (
      <div className="info-wrapper">
        <h2>The number was {props.mostRecent}</h2>
        <p>It took you {props.count} guesses:</p>
        <ul id="ul--guess-list">{props.previous}</ul>
      </div>
    );
  }

  return (
    <div className="info-wrapper">
      <p>This is guess #{props.count}</p>
      <p>Most recent guess: {props.mostRecent}</p>
      <ul id="ul--guess-list">{props.previous}</ul>
    </div>
  );
}