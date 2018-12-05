import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';

import List from '../List';
import { readImages, setRover } from '../../actions';

class Rover extends React.Component {
	static propTypes = {
		_readImages: PropTypes.func.isRequired,
		_setRover: PropTypes.func.isRequired,
		images: PropTypes.object.isRequired,
		date: PropTypes.string.isRequired,
		rover: PropTypes.string.isRequired
	};

	fetchImages = () => {
		const { _readImages, date, rover } = this.props;
		_readImages({ rover,  queries: { earth_date: date } });
	};

	render() {
		const { images, _setRover } = this.props;

		return (
			<div className='rover'>
				<Switch>
					<Route exact path="/" render={() => (
						<List
    					rover={'curiosity'} 
    					images={images}
    					_setRover={_setRover}
    					fetchImages={this.fetchImages}
    				/>
					)} />
      		<Route exact path="/:rover" render={({ match }) => {
      			const { params: { rover } } = match;
      			return (
      				<List
      					key={rover}
      					rover={rover} 
      					images={images}
      					_setRover={_setRover}
      					fetchImages={this.fetchImages}
      				/>
      			)
      		}} />
      	</Switch>
			</div>
		);
	};
}

const mapStateToProps = (state) => ({
	images: state.images,
	date: state.date,
	rover: state.rover
});

const mapDispatchToProps = dispatch => ({
  _readImages: (config) => dispatch(readImages(config)),
  _setRover: (rover) => dispatch(setRover(rover))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Rover));
