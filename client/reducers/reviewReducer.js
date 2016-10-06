import { GET_EMPLOYER_REVIEWS, GET_EMPLOYEE_REVIEWS, CREATE_REVIEW, REVIEW_INFO, IS_REVIEWED, GET_STAR_RATING } from '../actions/actionTypes';

const INITIAL_STATE = { getEmployee: [], getEmployer: [], create: [], info: '', isReviewed: '' , starRating: 0};

export default function (state = INITIAL_STATE, { type, payload }) {
	switch (type) {
		case GET_EMPLOYER_REVIEWS:
		console.log('Inside GET_EMPLOYER_REVIEWS reducer:', payload)
			return { ...state, getEmployer: payload };
		case GET_EMPLOYEE_REVIEWS:
		console.log('Inside GET_EMPLOYEE_REVIEWS reducer:', payload)
			return { ...state, getEmployee: payload };
		case GET_STAR_RATING:
		console.log('Inside GET_STAR_RATING reducer:', payload)
			return { ...state, starRating: payload };
    case CREATE_REVIEW:
      return { ...state, create: payload };
		case REVIEW_INFO:
			return { ...state, info: payload };
		case IS_REVIEWED:
			return { ...state, isReviewed: payload };
		default:
			return state;
	}
}
