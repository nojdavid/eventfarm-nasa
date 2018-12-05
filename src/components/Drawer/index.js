import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import moment from 'moment';

import { setDay, readImages } from '../../actions';

class Drawer extends React.Component {
  static propTypes = {
    _readImages: PropTypes.func.isRequired,
    _setDay: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    rover: PropTypes.string.isRequired
  };

	constructor(props) {
		super(props);

		this.state = {
			fields: {
				daysAgo: 0
			}
		};
	}

	matchRover = (match, location) => {
		if (location.pathname === '/' || location.pathname === '/curiosity') 
			return true;
	};

	onInputChange = (ev) => {
    ev.preventDefault();

    const { fields } = this.state;
    const { _setDay } = this.props;

    let value = ev.target.value; 

    if (value === '') {
    	value = 0;
    } else {
    	value = parseInt(value, 10);
    }

    fields[ev.target.name] = value;
    _setDay(value);

    this.setState({
      fields
    });
  };

  handleKeyPress = (ev) => {
  	const { fields: { daysAgo } } = this.state;

  	if (ev.key === 'Enter') {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { _readImages, date, rover } = this.props;
    _readImages({ rover,  queries: { earth_date: date } });
  };

	render() {
		const { fields: { daysAgo } } = this.state;

		return (
			<div className='drawer'>
				<label>Days Ago</label>
      	<input
          type="text"
          name="daysAgo"
          value={daysAgo}
          onChange={this.onInputChange}
          onKeyPress={this.handleKeyPress}
        />
      	<ul>
        	<li>
      			<NavLink activeClassName="active" to='/curiosity' isActive={this.matchRover}>
      				Curiosity
      			</NavLink>
      		</li>
      		<li>
      			<NavLink exact activeClassName="active" to='/opportunity'>
      				Opportunity
      			</NavLink>
      		</li>
      		<li>
      			<NavLink exact activeClassName="active" to='/spirit'>
      				Spirit
      			</NavLink>
      		</li>
      	</ul>
	    </div>
		);
	};
}

const mapStateToProps = (state) => ({
  date: state.date,
  rover: state.rover
});

const mapDispatchToProps = dispatch => ({
  _readImages: (config) => dispatch(readImages(config)),
  _setDay: (rover) => dispatch(setDay(rover))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Drawer));
