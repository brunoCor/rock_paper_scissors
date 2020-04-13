import React from "react";
import HandSelector from "../HandSelector/HandSelector";
import IHand from "../../models/IHand";
import Hand from "../../classes/Hand";
import "./Board.css";
import AbstractConstants from "../../classes/AbstractConstants";
import AbstractData from "../../classes/AbstractData";
import CardCustom from "../custom/CardCustom/CardCustom";
import ButtonCustom from "../custom/ButtonCustom/ButtonCustom";

interface IProps {
  playerName: string;
  mode: number;
  scoreMax: number;
  backHome: () => void;
}
interface IState {
  flipped: boolean;
  playerTwoName: string;
  playerOneChoice: IHand | null;
  playerTwoChoice: IHand | null;
  playerOneScore: number;
  playerTwoScore: number;
  hands: IHand[] | null;
  onPause: boolean;
  gameResult: string | null;
  currentRound: number;
  message: string | null;
}

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      playerOneChoice: null,
      playerTwoChoice: null,
      onPause: false,
      hands: null,
      gameResult: null,
      flipped: false,
      currentRound: 1,
      playerOneScore: 0,
      playerTwoScore: 0,
      playerTwoName:
        props.playerName !== "Computer" ? "Computer" : "computer 2",
      message: null,
    };
    this.handleUserChoice = this.handleUserChoice.bind(this);
    this.generateRandomHand = this.generateRandomHand.bind(this);
    this.reinitialize = this.reinitialize.bind(this);
    this.playAuto = this.playAuto.bind(this);
  }

  /**
   * Reinitialize the game parameters
   */
  reinitialize() {
    this.setState({
      flipped: false,
      playerOneScore: 0,
      playerTwoScore: 0,
      gameResult: null,
    });
  }

  componentDidMount() {
    this.setState({ hands: AbstractData.getHands() });
    this.reinitialize();
  }

  /**
   * Generate a rand hand
   * @return IHand
   */
  generateRandomHand(): IHand {
    if (this.state.hands) {
      const hand = this.state.hands[Math.floor(Math.random() * 3)];
      return hand;
    } else {
      throw new Error("Hands shloud be loaded");
    }
  }

  /**
   * get the message at the end of a round
   * @param name : string | null
   */
  getRoundMessage(name: string | null) {
    let roundText = "Equality on this round";

    if (name !== null) {
      roundText = `${name} win this round`;
    }

    return roundText;
  }

  /**
   * Return the name of the round's winner
   */
  getRoundWinner(): string | null {
    const { playerName } = this.props;
    const { playerOneChoice, playerTwoChoice, playerTwoName } = this.state;

    if (playerOneChoice && playerTwoChoice) {
      let hand = new Hand(playerOneChoice);
      const result = hand.compare(playerTwoChoice);

      let name: null | string = null;

      if (result === 1) {
        name = playerName;
      } else if (result === -1) {
        name = playerTwoName;
      }

      return name;
    } else {
      throw new Error("The 2 players should have choose a hand ");
    }
  }

  /**
   * get the updated score of players
   * @param name: string
   * @return boolean
   */
  getUpdateScore(name: string | null) {
    const { playerName } = this.props;
    const { playerOneScore, playerTwoScore, playerTwoName } = this.state;

    let scores = { playerOneScore, playerTwoScore };

    if (name === playerName) {
      scores.playerOneScore = scores.playerOneScore + 1;
    } else if (name === playerTwoName) {
      scores.playerTwoScore = scores.playerTwoScore + 1;
    }

    return scores;
  }

  /**
   * Return if this is the last round of the game (after the score update)
   */
  isGameOver() {
    const { scoreMax } = this.props;
    const { playerOneScore, playerTwoScore } = this.state;

    if (playerOneScore === scoreMax || playerTwoScore === scoreMax) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * manage the end of a round (go to the next round or end the game)
   * @param lastRound: boolean
   * @param winnerPlayerName: string|null
   */
  roundEndingSettings(winnerPlayerName: string | null) {
    this.setState({
      message: null,
      flipped: false,
    });

    if (this.isGameOver() && winnerPlayerName) {
      this.setState({ gameResult: `${winnerPlayerName} win this game` });
    } else {
      this.setState({ currentRound: this.state.currentRound + 1 });
    }
  }

  /**
   * Manage the results of the round
   */
  roundResults() {
    const winnerPlayerName = this.getRoundWinner();

    setTimeout(() => {
      const message = this.getRoundMessage(winnerPlayerName);
      const updatedScores = this.getUpdateScore(winnerPlayerName);

      this.setState(
        {
          message: message,
          playerOneScore: updatedScores.playerOneScore,
          playerTwoScore: updatedScores.playerTwoScore,
        },
        () => {
          setTimeout(() => {
            this.roundEndingSettings(winnerPlayerName);
          }, 2000);
        }
      );
    }, 1500);
  }

  /**
   * With the choice of the playerOne in the parameter manage the round until its end
   * @param hand
   */
  handleUserChoice(hand: IHand) {
    const computerHand = this.generateRandomHand();

    this.setState(
      {
        playerOneChoice: hand,
        playerTwoChoice: computerHand,
        flipped: true,
      },
      () => {
        this.roundResults();
      }
    );
  }

  /**
   * Player choose automaticly a hand and the game continu
   */
  playAuto() {
    const computerHand = this.generateRandomHand();
    this.handleUserChoice(computerHand);
  }

  /**
   * display informations about the game configurations in the header
   */
  renderHeaderContent() {
    const { currentRound } = this.state;
    const { scoreMax, mode } = this.props;
    return (
      <div>
        <h2>
          Round {currentRound}[best of {scoreMax}]
        </h2>
        {mode === AbstractConstants.MODE_COMPUTER_VS_COMPUTER && (
          <h3>[Mode automatique]</h3>
        )}
      </div>
    );
  }

  renderRoundMessageContent() {
    const { message } = this.state;

    if (message) {
      return <div className="messageContainer alertSuccess">{message}</div>;
    }
    return null;
  }

  /**
   * Display the choice of each player and the score
   */
  renderRoundInfosContent() {
    const { playerName } = this.props;

    const {
      playerOneChoice,
      playerTwoChoice,
      flipped,
      playerOneScore,
      playerTwoScore,
      playerTwoName,
    } = this.state;

    return (
      <div className="flexColumn">
        <div className="flexRow">
          <div style={{ flexGrow: 1 }}>
            <div className="playerInfoContainer flexColumn">
              <h1>{playerName}</h1>
              <h2>Score : {playerOneScore}</h2>
              <CardCustom
                flipped={flipped}
                imagePath={
                  playerOneChoice ? playerOneChoice.imagePath : "back.png"
                }
              />
            </div>
          </div>
          <div style={{ flexGrow: 1 }}>
            <div className="playerInfoContainer flexColumn">
              <h1>{playerTwoName}</h1>
              <h2>Score : {playerTwoScore}</h2>
              <CardCustom
                flipped={flipped}
                imagePath={
                  playerTwoChoice ? playerTwoChoice.imagePath : "back.png"
                }
              />
            </div>
          </div>
        </div>
        <div>{this.renderRoundMessageContent()}</div>
      </div>
    );
  }

  /**
   * Render the block that content the actions player can realize during a round
   */
  renderRoundActionsContent() {
    const { mode } = this.props;
    const { hands, gameResult, flipped } = this.state;

    if (hands && !gameResult) {
      if (mode === AbstractConstants.MODE_PLAYER_VS_COMPUTER) {
        return (
          <HandSelector
            hands={hands}
            disabled={flipped}
            handleUserChoice={this.handleUserChoice}
          />
        );
      } else {
        return (
          <div style={{ marginTop: "20px" }}>
            <ButtonCustom
              disabled={flipped}
              handleClick={this.playAuto}
              title={"Start the round"}
              classNames="btn-primary"
            />
          </div>
        );
      }
    } else {
      return null;
    }
  }

  /**
   * Display endGame block with game result and action to perform
   */
  renderEndGameContent() {
    const { backHome } = this.props;
    const { gameResult } = this.state;

    if (gameResult) {
      return (
        <div className="flexColumn gameResultContainer alertSuccess">
          <div>{gameResult}</div>
          <div className="flexRow endGameActionsContainer">
            <ButtonCustom
              handleClick={this.reinitialize}
              title={"Play again"}
              classNames="btn-success"
            />
            <ButtonCustom
              style={{ marginLeft: "10px" }}
              handleClick={backHome}
              title={"Back home"}
              classNames="btn-secondary"
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="flexColumn">
        <div>{this.renderHeaderContent()}</div>
        <div>
          {this.renderRoundInfosContent()}
          {this.renderRoundActionsContent()}
        </div>
        <div>{this.renderEndGameContent()}</div>
      </div>
    );
  }
}

export default Board;
