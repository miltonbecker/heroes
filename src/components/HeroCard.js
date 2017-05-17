import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HeroCard extends Component {

  render() {
    return (
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
        <div className='card'>
          <div className='thumbnail'>
            <img src={this.props.imageUrl} />
          </div>
          <div className='name'>
            {this.props.name}
          </div>
          <div className='link-div'>
            <Link className='link' to={`/detail/${this.props.id}`}>
              détail
            </Link>
          </div>
        </div>
      </div>
    );
  }

}

export default HeroCard;