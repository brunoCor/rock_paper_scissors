import React from "react";
import Backcard from "../../../assets/images/back.png";
import DynamicImageProvider from "../../../classes/DynamicImageProvider";
import "./CardCustom.css"

interface IProps{
    flipped: boolean,
    imagePath: string
}

interface IState{};

class CardCustom extends React.Component<IProps, IState> {
    render() {
        const {flipped, imagePath} = this.props;

        return (
            <div className="cardContent">
                <div className={`card ${flipped ? "flipped" : ""}`}>
                  <img
                    className="front"
                    src={DynamicImageProvider.get(
                        imagePath
                    )}
                  />

                  <img className="back" src={Backcard} />
                </div>
              </div>
        )
    }
}

export default CardCustom;