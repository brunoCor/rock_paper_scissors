import React from "react";
import Game from "./Game";
import { mount, ReactWrapper } from "enzyme";
import Board from "../Board/Board";
import Home from "../Home/Home";
import AbstractConstants from "../../classes/AbstractConstants";

let wrapped: ReactWrapper<any, any>;

beforeEach(() => {
  wrapped = mount(<Game />);
});

afterEach(() => {
  wrapped.unmount();
});

it("has a Home box by default and a Board Box when the form is submit", () => {
  expect(wrapped.find(Board).length).toEqual(0);
  expect(wrapped.find(Home).length).toEqual(1);
  wrapped.find("form").simulate("submit", {});
  expect(wrapped.find(Board).length).toEqual(1);
  expect(wrapped.find(Home).length).toEqual(0);
});

//@todo : faire plus de tests sur le mode
describe("state update after submit form", () => {
  it("change name state when the form is submit", () => {
    wrapped.find('input[type="text"]').simulate("change", {
      target: { value: "new name" },
    });
    wrapped.find("form").simulate("submit", {});
    wrapped.update();
    expect(wrapped.state().playerName).toEqual("new name");
  });

  it("change mode to COMPUTER_VS_COMPUTER when automatic mode is checked", () => {
    wrapped.find('input[type="checkbox"]').simulate("change", {
      target: { checked: true },
    });
    wrapped.find("form").simulate("submit", {});

    wrapped.update();

    expect(wrapped.state().mode).toEqual(
      AbstractConstants.MODE_COMPUTER_VS_COMPUTER
    );
  });

  it("change mode to MODE_PLAYER_VS_COMPUTER when automatic mode is not checked", () => {
    wrapped.find('input[type="checkbox"]').simulate("change", {
      target: { checked: false },
    });
    wrapped.find("form").simulate("submit", {});

    wrapped.update();
    expect(wrapped.state().mode).toEqual(
      AbstractConstants.MODE_PLAYER_VS_COMPUTER
    );
  });

  it("change scoreMax in function of the select value", () => {
    wrapped.find("select").simulate("change", {
      target: { value: 1 },
    });
    wrapped.find("form").simulate("submit", {});

    wrapped.update();

    expect(wrapped.state().scoreMax).toEqual(1);
  });
});

// afterEach(() => {
//     unmount(wrapped);
// })
