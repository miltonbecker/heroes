import React, { Component } from 'react';
import { fetchInfo } from '../redux/actions';
import { connect } from 'react-redux';

class HeroInfo extends Component {

  render() {
    const info = this.props.info;
    const fetchingInfoError = this.props.fetchingInfoError;

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <h1>Fiche identité :</h1>

          {!info && !fetchingInfoError &&
            <p className='loading'>Chargement en cours...</p>
          }

          {fetchingInfoError &&
            <p className='error'>Désolé, une erreur s'est produite lors de la récupération de la fiche identité.</p>
          }

          {info &&
            <div className='row'>
              <div className='col-xs-12 col-sm-3 col-md-4'>
                <img src={`${info.thumbnail.path}.${info.thumbnail.extension}`} />
              </div>
              <div className='col-xs-12 col-sm-9 col-md-8'>
                <div className='header'>
                  <h2>{info.name}</h2>
                  <p className='description'>{info.description}</p>
                </div>

                <div className='comics'>
                  <h3>Comics</h3>

                  {(!info.comics.items || !info.comics.items.length) &&
                    'None.'}

                  <ul id='comics-list' className='list-group'>
                    {info.comics.items.map((comic) => (
                      <li key={comic.resourceURI} className='list-group-item'>{comic.name}</li>
                    ))}
                  </ul>
                </div>

                <div className='series'>
                  <h3>Series</h3>

                  {(!info.series.items || !info.series.items.length) &&
                    'None.'}

                  <ul id='series-list' className='list-group'>
                    {info.series.items.map((show) => (
                      <li key={show.resourceURI} className='list-group-item'>{show.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getInfo(this.props.id);
  }

}

const mapStateToProps = (state) => ({
  info: state.info,
  fetchingInfoError: state.fetchingInfoError
});

const mapDispatchToProps = (dispatch) => ({
  getInfo: (id) => {
    dispatch(fetchInfo(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroInfo);