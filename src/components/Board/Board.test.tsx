import React from "react";
import Board from "./Board";
import { mount } from "enzyme";
import AbstractConstants from "../../classes/AbstractConstants";
import AbstractData from "../../classes/AbstractData";
import HandSelector from "../HandSelector/HandSelector";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Board
      backHome={() => {}}
      scoreMax={1}
      mode={AbstractConstants.MODE_PLAYER_VS_COMPUTER}
      playerName={"playerName"}
    />
  );
});

it("shows the handSelector", () => {
  expect(wrapped.find(HandSelector).length).toEqual(1);
});

it("should find who is the winner of the round ", () => {
  const hands = AbstractData.getHands();

  wrapped.setState({ playerOneChoice: hands[0] });
  wrapped.setState({ playerTwoChoice: hands[2] });
  wrapped.update();
  const instance = wrapped.instance();
  const winnner = instance.getRoundWinner();
  expect(winnner).toEqual("playerName");
});

it("should find who is the winner of the round ", () => {
  const hands = AbstractData.getHands();

  wrapped.setState({ playerOneChoice: hands[2] });
  wrapped.setState({ playerTwoChoice: hands[0] });
  wrapped.update();
  const instance = wrapped.instance();
  const winnner = instance.getRoundWinner();
  expect(winnner).toEqual("Computer");
});

it("should update the score when the player win the round", () => {
  const instance = wrapped.instance();
  const getUpdateScore = instance.getUpdateScore("playerName");
  expect(getUpdateScore).toEqual({
    playerOneScore: wrapped.state().playerOneScore + 1,
    playerTwoScore: wrapped.state().playerTwoScore,
  });
});

it("should update the score when the player win the round", () => {
  const instance = wrapped.instance();
  const getUpdateScore = instance.getUpdateScore("Computer");
  expect(getUpdateScore).toEqual({
    playerOneScore: wrapped.state().playerOneScore,
    playerTwoScore: wrapped.state().playerTwoScore + 1,
  });
});

it("should detect that this is not the last round", () => {
  const instance = wrapped.instance();
  const isLastRound = instance.isGameOver();

  expect(isLastRound).toEqual(false);
});

it("should detect that this is the last round", () => {
  const instance = wrapped.instance();
  wrapped.setState({ playerOneScore: 1 });
  const isLastRound = instance.isGameOver();

  expect(isLastRound).toEqual(true);
});

it("should return a random hand", () => {
  const instance = wrapped.instance();
  const hand = instance.generateRandomHand();
  expect(hand).toHaveProperty("id");
  expect(hand).toHaveProperty("label");
  expect(hand).toHaveProperty("imagePath");
  expect(hand).toHaveProperty("weakness");
});

it("should return equality message", () => {
  const instance = wrapped.instance();
  const message = instance.getRoundMessage(null);
  expect(message).toEqual("Equality on this round");
});

it("should return player1 win message", () => {
  const instance = wrapped.instance();
  const message = instance.getRoundMessage("player1");
  expect(message).toEqual("player1 win this round");
});

describe("test roundEndingSettings function", () => {
  beforeEach(() => {
    wrapped = mount(
      <Board
        backHome={() => {}}
        scoreMax={3}
        mode={AbstractConstants.MODE_PLAYER_VS_COMPUTER}
        playerName={"playerName"}
      />
    );
  });

  it("shoud prepare for next round", () => {
    const instance = wrapped.instance();
    wrapped.setState({
      flipped: true,
      message: "message",
      currentRound: 1,
      playerOneScore: 1,
      playerTwoScore: 0,
    });

    instance.roundEndingSettings();
    expect(wrapped.state().flipped === false);
    expect(wrapped.state().message === null);
    expect(wrapped.state().currentRound === 2);
  });

  it("shoud prepare for end game", () => {
    const instance = wrapped.instance();
    wrapped.setState({
      flipped: true,
      message: "message",
      currentRound: 3,
      playerOneScore: 3,
      playerTwoScore: 0,
    });

    instance.roundEndingSettings("playerName");
    expect(wrapped.state().flipped === false);
    expect(wrapped.state().message === null);
    expect(wrapped.state().currentRound === 1);
    expect(wrapped.state().gameResult === "playerName win this game");
  });
});

it("shall manage the end of the round", () => {
  jest.useFakeTimers();
  const hands = AbstractData.getHands();

  wrapped.setState({ playerOneChoice: hands[2] });
  wrapped.setState({ playerTwoChoice: hands[0] });
  const instance = wrapped.instance();
  const spyGetRoundWinner = jest.spyOn(instance, "getRoundWinner");
  const spyGetRoundMessage = jest.spyOn(instance, "getRoundMessage");
  const spyGetUpdateScore = jest.spyOn(instance, "getUpdateScore");
  const spyRoundEndingSettings = jest.spyOn(instance, "roundEndingSettings");

  instance.roundResults();

  expect(spyGetRoundWinner).toHaveBeenCalled();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1500);
  jest.runOnlyPendingTimers();
  expect(spyGetRoundMessage).toHaveBeenCalled();
  expect(spyGetUpdateScore).toHaveBeenCalled();
  expect(setTimeout).toHaveBeenCalledTimes(2);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  jest.runOnlyPendingTimers();
  expect(spyRoundEndingSettings).toHaveBeenCalled();
});

it('shall play the game automaticly', () => {
    const instance = wrapped.instance();
    const spyGenerateRandomHand = jest.spyOn(instance, "generateRandomHand");
    const spyHandleUserChoice = jest.spyOn(instance, "handleUserChoice");

    instance.playAuto();

    expect(spyGenerateRandomHand).toHaveBeenCalled();
    expect(spyHandleUserChoice).toHaveBeenCalled();
}) 

it('shall handleUserChoice ', () => {
    const hands = AbstractData.getHands();
    const instance = wrapped.instance();
    const spyGenerateRandomHand = jest.spyOn(instance, "generateRandomHand");
    const spyRoundResults = jest.spyOn(instance, "roundResults");

    instance.handleUserChoice(hands[0]);

    expect(spyGenerateRandomHand).toHaveBeenCalled();
    expect(spyRoundResults).toHaveBeenCalled();
});
