import React from 'react';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctNumber: Math.floor(Math.random() * (100) + 1),
      guesses: [],
      mostRecent: null,
      clue: ''
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const guess = +this.numInput.value;
    this.state.guesses.push(guess);

    if (guess === this.state.correctNumber) {
      this.setState({
        clue: "You guessed it!",
        mostRecent: this.state.guesses[this.state.guesses.length - 1]
      })
      return;
    }

    const clue = this.determineClueText(guess);

    this.setState({
      clue,
      mostRecent: this.state.guesses[this.state.guesses.length - 1]
    });
  }

  determineClueText(guess) {
    const distance = Math.abs(this.state.correctNumber - guess);
    if (distance < 5) {
      return "You're on fire!";
    } else if (distance >= 5 && distance < 20) {
      return "You're heating up!";
    } else if (distance >= 20 && distance < 35) {
      return "It's a bit chilly";
    } else {
      return "Winter is coming..."
    }
  }

  onClick(event) {
    event.preventDefault();
    this.setState({
      correctNumber: Math.floor(Math.random() * (100) + 1),
      guesses: [],
      mostRecent: null,
      clue: ''
    });
  }

  render() {
    if (!this.state.guesses.length) {
      return (
        <div className="wrapper">
          <h1>Guess a number! {this.state.correctNumber}</h1>
          <form onSubmit={e => this.onSubmit(e)}>
            <input type="number" ref={input => this.numInput = input} />
            <input type="submit" name="submit"
              id="input--submit" value="Guess" />
            <p>You're on guess #{this.state.guesses.length + 1}</p>
            <ul id="ul--guess-list">{this.state.guesses.toString()}</ul>
          </form>
        </div>
      )
    }

    if (this.state.clue === `You guessed it!`) {
      return (
        <div className="wrapper">
          <h1>{this.state.clue}</h1>
          <h2>The number was {this.state.mostRecent}</h2>
          <p>It took you {this.state.guesses.length + 1} guesses.</p>
          <ul id="ul--guess-list">{this.state.guesses.toString()}</ul>
          <button onClick={e => this.onClick(e)} type="button">New Game</button>
        </div>
      )
    }

    return (
      <div className="wrapper">
        <h1>Guess a number! {this.state.correctNumber}</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          <input type="number" ref={input => this.numInput = input} />
          <input type="submit" name="submit"
            id="input--submit" value="Guess" />
          <p>You're on guess #{this.state.guesses.length + 1}</p>
          <p>Most recent guess: {this.state.mostRecent}</p>
          <p>{this.state.clue}</p>
          <ul id="ul--guess-list">{this.state.guesses.toString()}</ul>
        </form>
      </div>
    )
  }
}