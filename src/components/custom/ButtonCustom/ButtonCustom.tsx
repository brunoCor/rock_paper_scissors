import React from "react";
import  "./ButtonCustom.css";

interface IProps{
    handleClick:()=>void,
    title: string,
    classNames: string,
    style?: any,
    disabled?: boolean
}

interface IState{};



class ButtonCustom extends React.Component<IProps, IState> {

    handleClick() {
        const {handleClick, disabled}  = this.props;
        if(!disabled) {
            handleClick();
        }

    }

    render() {
       const {title, classNames, style, disabled} = this.props;

        return (
            <span
              onClick={this.handleClick.bind(this)}
              className={`btn ${classNames} ${disabled?'disabled':''}`}
              style={{...style}}
            >
              {title}
            </span>
        )
    }
}

export default ButtonCustom;