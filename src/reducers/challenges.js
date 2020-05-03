const INITIAL_STATE = { challenges: [], challengesLoaded: false }

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'get_challenges_success':
			console.log('printing action', action)
			return {
				challengesLoaded: true,
				challenges: action.payload,
			}
		default:
			return state
	}
}
