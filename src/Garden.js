import "./styles.css";
import React from 'react';

class Garden extends React.Component {
  constructor(props) {
    super(props);
    this.state = { garden: props.garden, count: 0 };
  }

  getNumberOfEmojis = () => {
      let numnerOfEmojis = this.state.garden.filter((element) => element.emoji !== "");
      return numnerOfEmojis.length;
  }
  // Pour suivre les mises à jours des states en synchrone
  //(et si nécessaire déclencher des actions)
  componentDidUpdate() {
    console.log("numberOfEmojis", this.getNumberOfEmojis());
    //console.log("count:", this.state.isLaunched);
  }

  // NB: anciennement fonction updateGarden()
  addPlant = () => {
    this.growGarden();
    // TODO: on rajoute la condition sur garden.length pour évacuer les cas > 25
    if (this.getNumberOfEmojis() < 25) {
    if (true) {
      // on clone garden et on va modifier la valeur de newGarden pour l'index égal à count.
      let newGarden = [...this.state.garden]; // ⚠️ syntaxe pour récupérer les références et non juste les valeurs
      newGarden.find((x) => x.emoji === "").emoji = "🌱"; // pour gérer le cas ou c'est delete
      // 3. on met à jour le state
      this.setState({ garden: newGarden });
    }
    }
  };

  // NB: cette fonction était dans updateGarden() et a été séparée
  growGarden = () => {
    let newGarden = [...this.state.garden];
    newGarden.map((elem) => {
      if (elem.emoji === "🌱") return (elem.emoji = "🌿");
      else if (elem.emoji === "🌿") return (elem.emoji = "🌲");
      else return elem.emoji;
    });
    this.setState({ garden: newGarden });

    // ici on appelle setTimeout en boucle dès que growGarden a été executé (c'est un trick pour la répéter toutes les 2sec)
    // NB: à optimiser...car trop rapide encore
    if (this.state.garden.length > 0) {
      setTimeout(() => {
        this.growGarden();
      }, 2000);
    }
  };

  // libérer une case au clic
  deletePlant = (id) => {
    let newGarden = [...this.state.garden];
    newGarden[id].emoji = "";
    this.setState({ garden: newGarden });
  };
    
  render() {
    return (
      <>
        <div className="gardenContainer">
          {this.state.garden.map((elem) => {
            return (
              <button
                key={elem.id}
                className="cell"
                onClick={() => this.deletePlant(elem.id)}>
                {elem.emoji}
              </button>
            );
          })}
        </div>
        <button onClick={this.addPlant}>Plant an emoji</button>
      </>
    );
  }
};

export default Garden;