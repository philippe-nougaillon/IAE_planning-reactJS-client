import React, { Component } from 'react';
import { connect } from 'react-redux';

import { doFetchPlanning  } from '../actions/planning';

// import Button from './Button';

const mapDispatchToProps = (dispatch) => ({
    onFetchPlanning: query => dispatch(doFetchPlanning(query)),
});

const applyQueryState = query => () => ({
    query
});

class SearchPlanning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: new Date().toISOString().substring(0,10),
//          query: '2019-01-28',
            searchTerm: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSubmit(event) {
        const { query } = this.state;
        if (query) {
            this.props.onFetchPlanning(query);
//          this.setState(applyQueryState(''));
        }
        event.preventDefault();
    }

    onChange(event) {
        const { value } = event.target;
        this.setState(applyQueryState(value));
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    type="date"
                    value={this.state.query}
                    onChange={this.onChange}
                />
                <button type="submit">
                    Search
                </button>
                <input
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.onSearchChange}
                />
            </form>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(SearchPlanning);