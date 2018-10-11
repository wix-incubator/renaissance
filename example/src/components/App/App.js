import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Autocomplete } from 'wix-ui-backoffice/Autocomplete';
import s from './App.scss';
import TYPES, { actions } from '../../actions';

class App extends React.Component {
  static propTypes = {
    results: PropTypes.array,
  };

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  render() {
    const { query } = this.props;
    const options = this._generateOptions();
    const movie = this._getMovie();

    return (
      <div className={s.root}>
        <div className={s.header}>
          <h2>Renaissance Example</h2>
        </div>
        <div>
          <Autocomplete
            options={options}
            value={query}
            onChange={this._onChange}
            onSelect={this._onSelect}
          />
        </div>
        {movie}
      </div>
    );
  }

  _onChange(e) {
    const { changeQuery } = this.props;
    const { target } = e;
    const { value } = target;
    changeQuery({ query: value });
  }

  _onSelect({ id }) {
    const { selectMovie } = this.props;
    selectMovie({ id });
  }

  _generateOptions() {
    const { results } = this.props;

    return results.map(result =>
      Autocomplete.createOption({ id: result.imdbID, value: result.Title }),
    );
  }

  _getMovie() {
    const { selectedMovie } = this.props;

    console.log('adler', 'App.js:22', selectedMovie);

    return selectedMovie ? (
      <div>
        <h4>{selectedMovie.Title}</h4>
        <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    query: state.query,
    results: state.results,
    selectedMovie: state.selectedMovie,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeQuery: bindActionCreators(
      actions[TYPES.CHANGE_SEARCH_VALUE],
      dispatch,
    ),
    selectMovie: bindActionCreators(actions[TYPES.SELECT_MOVIE], dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
