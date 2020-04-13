import React from "react";
import HandSelector from "./HandSelector";
import { shallow, ShallowWrapper } from "enzyme";
import AbstractData from "../../classes/AbstractData";
import IHand from "../../models/IHand";

let wrapped: ShallowWrapper;

beforeEach(() => {
  wrapped = shallow(
    <HandSelector
      hands={AbstractData.getHands()}
      disabled={false}
      handleUserChoice={(hand: IHand) => {}}
    />
  );
});

it("has a number of imgs equal to the number of cards", () => {
  expect(wrapped.find("img").length).toEqual(AbstractData.getHands().length);
});
