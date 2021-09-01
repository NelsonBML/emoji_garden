import ReactDOM from "react-dom";
import React from "react";
import Garden from "./Garden";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { farm: [] };//tableau qui contiendra plusieurs Gardens
    this.SIZE_GARDEN = 25;
  }

  // renvois un tableau de 25 éléments
  generateGarden = (size) => {
    let tab = [];
    // on veut une boucle pour ajouter 25 valeurs dans ce tableau
    for (let i = 0; i < size; i++) {
      tab.push({ id: i, emoji: "" });
    }
    return tab;
  };


  //fonction qui ajout un tableau dans le state "farm"
  addGarden =(size) => {
    let newFarm = [...this.state.farm]; //je copie le state
    newFarm.push(this.generateGarden(size)); //j'utilise la copie
    this.setState({farm: newFarm}); // on met à jour le "state"
  }

  // Ce qu'il se passe au 1er montage de mon composant
  componentDidMount() {
    this.addGarden(this.SIZE_GARDEN);
    
  }

  render() {
    return (
      <>
      {this.state.farm.map((elem) => {
        return (
        <Garden
          garden={elem}/>
        )
      })}
        <button onClick={() => this.addGarden(this.SIZE_GARDEN)}>Add Garden</button>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
