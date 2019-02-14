import React from 'react';
import UserInput from './input-form';
import Information from './information'

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clue: 'Guess a number!',
      correctNumber: Math.floor(Math.random() * (100) + 1),
      guesses: [],
      mostRecent: null
    }
  }

  evaluateGuess(guess) {
    const clue = this.determineClueText(guess);
    this.setState({
      clue,
      guesses: [...this.state.guesses, guess],
      mostRecent: guess
    });
  }

  determineClueText(guess) {
    const distance = Math.abs(this.state.correctNumber - guess);
    if (distance === 0) {
      return "You guessed it!";
    } else if (distance < 5) {
      return "You're on fire!";
    } else if (distance >= 5 && distance < 20) {
      return "You're heating up...";
    } else if (distance >= 20 && distance < 35) {
      return "It's a bit chilly...";
    } else {
      return "Winter is coming."
    }
  }

  restart(event) {
    event.preventDefault();
    this.setState({
      clue: 'Guess a number!',
      correctNumber: Math.floor(Math.random() * (100) + 1),
      guesses: [],
      mostRecent: null
    });
  }

  render() {
    if (!this.state.guesses.length) {
      return (
        <div className="game-wrapper">
          <h1>{this.state.clue}</h1>
          <UserInput onGuess={value => this.evaluateGuess(value)} />
        </div>
      )
    }

    if (this.state.clue === `You guessed it!`) {
      return (
        <div className="game-wrapper">
          <h1>{this.state.clue}</h1>
          <Information
            clue={this.state.clue}
            count={this.state.guesses.length}
            mostRecent={this.state.mostRecent}
            previous={this.state.guesses.map((guess, i) => <li key={i}>{guess}</li>)}
          />
          <button onClick={e => this.restart(e)} type="button">New Game</button>
        </div>
      )
    }

    return (
      <div className="game-wrapper">
        <h1>{this.state.clue}</h1>
        <UserInput
          onGuess={value => this.evaluateGuess(value)} />
        <Information
          clue={this.state.clue}
          count={this.state.guesses.length + 1}
          mostRecent={this.state.mostRecent}
          previous={this.state.guesses.map((guess, i) => <li key={i}>{guess}</li>)} />
      </div>
    )
  }
}