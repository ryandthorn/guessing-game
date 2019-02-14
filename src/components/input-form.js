import React from 'react';

export default class UserInput extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    this.props.onGuess(+this.userInput.value)
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input type="number" ref={value => this.userInput = value} />
        <input type="submit" name="submit"
          id="input--submit" value="Guess" />
      </form>
    );
  }
}