import react from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends react.Component{
  state={
    name: null,
    height: null,
    mass: null,
    homeworld: null,
    image: null,
    affilations: [1, 2, 3],
    isLoading: false
  }
  fetchData = async () =>{
    this.setState({isLoading: false});

    try{
      const randomNumber = Math.ceil(Math.random() * 88)
      const data = await fetch(`https://akabab.github.io/starwars-api/api/id/${randomNumber}.json`)
      const fetchedData = await data.json()
      this.setState({
        name: fetchedData.name,
        height: fetchedData.height,
        mass: fetchedData.mass,
        image: fetchedData.image,
        homeworld: fetchedData.homeworld,
        affilations: fetchedData.affiliations,
        isLoading: true 
      });
      
    }
    catch(error){
      console.error(error)
    }
  }
  render(){
    const {name, mass, height, homeworld, affilations, isLoading, image} = this.state
    return (
      <div className="bg-container">
        {
          isLoading && 
          <div className='character-container'>
            <img src={image} className='name-photo' alt='name'/>
            <h1>Name: {name}</h1>
            <p>Height: {height}</p>
            <p>Mass: {mass}</p>
            <p>HomeWorld: {homeworld}</p>
            <ul>
              {affilations.map(eachitem=>(
                <li key={eachitem}>{eachitem}</li>
              ))}
            </ul>
          </div>
        }
        <button className='btn btn-primary' onClick={this.fetchData}>Randomize Character</button>
      </div>
    );
  }
  
}

export default App;
