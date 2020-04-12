import React from "react";
import "./Home.css"

class Home extends React.Component<any, any> {
  
  constructor(props: any) {
    super(props);
   
    this.state = {
      name:'player1',
      scoreMax: 1,
      modeAuto: false
    }

    this.setName = this.setName.bind(this);
    this.setScoreMax = this.setScoreMax.bind(this);
    this.setModeAuto = this.setModeAuto.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }

  setName(name: string) {
    this.setState({name})
  }

  setScoreMax(scoreMax: number) {
    this.setState({scoreMax});
  }

  setModeAuto(modeAuto: boolean) 
  {
    this.setState({modeAuto});
  }

  handleSubmit(event: React.FormEvent) {
    const { submitCongigurationForm } = this.props;
    submitCongigurationForm(this.state);
    event.preventDefault();
  }

  configFormContentRender() {
    const {name, scoreMax, modeAuto} = this.state;
    return (
      <form onSubmit={this.handleSubmit} >
      <div
        className="formContainer"
      >
        <h3 style={{ marginTop: "0" }}>Configurations</h3>
        
          <div style={{ textAlign: "left" }}>
          <div>
            <label>Your Name :</label>
            <input
              style={{ marginLeft: "5px", padding: "5px" }}
              type="text"
              value={name}
              onChange={(event) => {this.setName(event.target.value)}}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>Best of :</label>
            <select value={scoreMax} style={{ marginLeft: "5px", padding: "5px" }} onChange={(event) => {this.setScoreMax(Number(event.target.value))}}>
              <option value={1}>1 round</option>
              <option value={3}>3 rounds</option>
              <option value={5}>5 rounds</option>
            </select>
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>Automatic mode :</label>
            <input onChange={(event) => {this.setModeAuto(event.target.checked)}} checked={modeAuto} style={{ marginLeft: "5px" }} type="checkbox" />
          </div>
          </div>
        
      </div>

      <input 
        className="submitBtn"
        value='Play !'
        type="submit"
      />

      </form>
    )
  }

  
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Welcom to Rock-Paper-Scissors Game</h1>
        {this.configFormContentRender()}
      </div>
    );
  }
}

export default Home;
