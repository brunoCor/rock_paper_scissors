import React, { Component } from "react";
import IHand from "../../models/IHand";
import DynamicImageProvider from "../../classes/DynamicImageProvider";
import "./HandSelector.css";

interface IState {}
interface IProps {
  handleUserChoice: (hand: IHand) => void;
  hands: IHand[];
  disabled: boolean;
}

class HandSelector extends Component<IProps, IState> {
  renderActionsContent() {
    const { handleUserChoice, hands, disabled } = this.props;

    return hands.map((hand: IHand) => {
      return (
        <img
          alt={hand.label}
          className={"handSelection " + (disabled ? "inactive" : "active")}
          key={hand.id}
          onClick={() => {
            if (!disabled) {
              handleUserChoice(hand);
            }
          }}
          src={DynamicImageProvider.get(hand.imagePath)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Choose you card !</h2>
        {this.renderActionsContent()}
      </div>
    );
  }
}

export default HandSelector;
