import { API_SYM } from './util/constants';

const asyncTypes = {
	PENDING: 'PENDING',
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE'
};

const createAsyncActions = (action) => (
	Object.values(asyncTypes).reduce((acc, curr) => {
		acc[curr] = `${action}_${curr}`;
		return acc;
	}, {})
);

export const actionTypes = {
	READ_IMAGES: createAsyncActions('READ_IMAGES'),
	SET_DAY: 'SET_DAY',
	SET_ROVER: 'SET_ROVER'
};

export const readImages = (config) => {
	const { queries, rover } = config;

	return {
		type: API_SYM,
		types: Object.values(actionTypes.READ_IMAGES),
  	payload: {
  		queries: queries ? queries : [],
  		rover
  	}
  };
};

export const setDay = (days) => ({
	type: actionTypes.SET_DAY,
	payload: {
		days
	}
});

export const setRover = (rover) => ({
	type: actionTypes.SET_ROVER,
	payload: {
		rover
	}
});