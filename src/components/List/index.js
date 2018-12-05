import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';

class List extends React.Component {
	static propTypes = {
		rover: PropTypes.string.isRequired,
		fetchImages: PropTypes.func.isRequired,
		_setRover: PropTypes.func.isRequired
	};

	async componentDidMount() {
		const { _setRover, fetchImages, rover } = this.props;

		await _setRover(rover);

		fetchImages();
	}

	render() {
		const { images } = this.props;

		return (
			<div className='list'>
				{
					images.loading ? <h2>Loading</h2> : null
				}
				{
					images.data.map((image, index) => {

						const { earth_date, img_src, rover: { name, status }, camera: { full_name } } = image;

						return (
							<div className='cell' key={index}>
								<h4>{full_name}</h4>
								<img src={img_src} />
								<div className='meta'>
									<div>{moment(earth_date, 'YYYY-MM-DD').format('LL')}</div>
									<div>{`Status: ${status}`}</div>
								</div>
					    </div>
				    )
					})
				}
			</div>
		);
	};
}

export default List;
