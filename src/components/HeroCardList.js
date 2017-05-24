import React, { Component } from 'react';
import { fetchHeroes } from '../redux/actions';
import { connect } from 'react-redux';
import HeroCard from './HeroCard';

class HeroCardList extends Component {

  render() {
    const heroes = this.props.heroes;
    const fetchingHeroesError = this.props.fetchingHeroesError;

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <h1>Liste des super héros :</h1>

          {((!heroes || !heroes.length) && !fetchingHeroesError) &&
            <p className='loading'>Chargement en cours...</p>}

          {fetchingHeroesError &&
            <p className='error'>Désolé, une erreur s'est produite lors de la récupération des héros.</p>}

          {heroes &&
            <div className='row'>
              {heroes.map((hero) => (
                <HeroCard key={hero.id} id={hero.id} name={hero.name} imageUrl={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />
              ))}
            </div>
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getHeroes();
  }

}

const mapStateToProps = (state) => ({
  heroes: state.heroes,
  fetchingHeroesError: state.fetchingHeroesError
});

const mapDispatchToProps = (dispatch) => ({
  getHeroes: () => {
    dispatch(fetchHeroes());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroCardList);