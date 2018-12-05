import apiAxios from './axios';
import { API_SYM } from '../util/constants';

const validateAction = (action) => {
  const { types, payload } = action;

  if (typeof payload.rover !== 'string') {
    throw new Error('Specify a rover string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }
};

const actionWith = (action, props) => Object.assign({}, action, props);

/**
 * API Middlware
 */

 //TODO REMOVE DISPATCH HERE
export default ({ dispatch, getState }) => next => (action) => {
  const { type, types, payload } = action;

  // API actions are marked with a symbol
  if (type !== API_SYM) {
    return next(action);
  }

  validateAction(action);

  const state = getState();
  const [pending, success, failure] = types;

  // Send the initial API request action
  next(actionWith(action, { type: pending }));

  return apiAxios(state, payload)
    .then(data => next(actionWith(action, {
      type: success,
      data,
    })))
    .catch(error => next(actionWith(action, {
      type: failure,
      payload: {
        errors: error,
      },
    })));
};
