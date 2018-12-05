import  { actionTypes } from './actions';
import moment from 'moment';

export const initialState = {
  images: {
  	loading: 0,
  	data: []
  },
  date: moment().format('YYYY-MM-DD'),
  rover: 'curiosity'
};

export const reducer = (state = initialState, { type, payload, data }) => {
  switch (type) {

    case actionTypes.READ_IMAGES.PENDING:
    	return {
    		...state,
    		images: {
    			...state.images,
    			loading: state.images.loading + 1,
    		}
    	}
    case actionTypes.READ_IMAGES.SUCCESS:
    	return {
    		...state,
    		images: {
    			...state.images,
    			data: data.data.photos,
    			loading: state.images.loading - 1,
    		}
    	}
    case actionTypes.READ_IMAGES.FAILURE:
    	return {
    		...state,
    		images: {
    			...state.images,
    			loading: state.images.loading - 1,
    		}
    	}

    case actionTypes.SET_DAY:
    	const newDate = moment().subtract(payload.days, 'days').format('YYYY-MM-DD');
    	return Object.assign({}, state, { date: newDate });

    case actionTypes.SET_ROVER:
      return Object.assign({}, state, { rover: payload.rover });

    default:
      return state;
  }
};

