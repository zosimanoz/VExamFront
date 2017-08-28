import React from 'react';

import GamesList from './games-list.component';

import { fetchGames } from '../../actions/games.action';

import { connect } from 'react-redux';

class Home extends React.Component {

  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <a className="btn btn-secondary pull-right" href="/add/game">Add new game</a>

            <GamesList games={this.props.games} />
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    games: state.games
  }
}

export default connect(mapStateToProps, { fetchGames })(Home);