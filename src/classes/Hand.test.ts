import Hand from "./Hand";
import AbstractData from "../classes/AbstractData";

it("shall return rock beat paper", () => {
  const hand = new Hand(AbstractData.getHands()[0]);
  const result = hand.compare(AbstractData.getHands()[2]);
  expect(result).toEqual(1);
});

it("shall return paper is beaten by rock", () => {
  const hand = new Hand(AbstractData.getHands()[2]);
  const result = hand.compare(AbstractData.getHands()[0]);
  expect(result).toEqual(-1);
});

it("shall return rock is equal to rock", () => {
  const hand = new Hand(AbstractData.getHands()[0]);
  const result = hand.compare(AbstractData.getHands()[0]);
  expect(result).toEqual(0);
});
