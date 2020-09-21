import {
	CREATE_STREAM,
		FETCH_STREAMS,
		FETCH_STREAM,
		DELETE_STREAM,
		EDIT_STREAM
} from '../actions/types';

export default (state={},action) => {
	switch(action.type){
		case FETCH_STREAMS:
			const streamsList = {...action.payload};
			const newStateObj = {};
			for (const key in streamsList){
				newStateObj[streamsList[key].id] = streamsList[key];
			}
			return newStateObj;
		case FETCH_STREAM:
			return { ...state,[action.payload.id]: action.payload };
		case CREATE_STREAM:
			return { ...state,[action.payload.id]: action.payload};
		case EDIT_STREAM:
			return { ...state,[action.payload.id]: action.payload};
		case DELETE_STREAM:
			const newState = {...state};
			delete newState[action.payload];
			return newState;
		default:
			return state;
	}
}