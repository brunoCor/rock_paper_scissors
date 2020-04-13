import React from "react";
import Board from "../Board/Board";
import Home from "../Home/Home";
import AbstractConstants from "../../classes/AbstractConstants";

interface IProps {}
interface IState {
  displayHome: boolean;
  mode: number;
  playerName: string;
  scoreMax: number;
}

interface IConfig {
  playerName: string;
  scoreMax: number;
  name: string;
  modeAuto: boolean;
}

class Game extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      displayHome: true,
      mode: 1,
      playerName: "",
      scoreMax: 1,
    };
    this.submitCongigurationForm = this.submitCongigurationForm.bind(this);
    this.backHome = this.backHome.bind(this);
  }

  /**
   * Submit the config form of the game
   * @param configs
   */
  submitCongigurationForm(configs: IConfig) {
    this.setState({
      playerName: configs.name,
      scoreMax: configs.scoreMax,
      mode: configs.modeAuto
        ? AbstractConstants.MODE_COMPUTER_VS_COMPUTER
        : AbstractConstants.MODE_PLAYER_VS_COMPUTER,
      displayHome: false,
    });
  }

  /**
   * Return to home section
   */
  backHome() {
    this.setState({
      displayHome: true,
    });
  }

  render() {
    const { displayHome, scoreMax, mode, playerName } = this.state;

    return (
      <div>
        {displayHome && (
          <Home submitCongigurationForm={this.submitCongigurationForm} />
        )}
        {!displayHome && (
          <Board
            backHome={this.backHome}
            scoreMax={scoreMax}
            mode={mode}
            playerName={playerName}
          />
        )}
      </div>
    );
  }
}

export default Game;
