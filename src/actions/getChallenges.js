import errorReporter from '../utils/ErrorReporter'

export const getChallenges = () => async (dispatch) => {
	try {
		console.log('reached here')
		let challenges = await getChallengesWithCovers()
		dispatch({ type: 'get_challenges_success', payload: challenges })
	} catch (e) {
		errorReporter(e)
	}
}

const getChallengesWithCovers = async () => {
	return [
		{
			id: 'mediaFiles[i].duration + i',
			duration: '10',
			url: 'mediaFiles[i].path',
			title: 'Challenge from Suraj',
			// artwork: 'mediaFiles[i].cover || null',
			artist: 'unknown',
			album: 'unknown',
			index: 'i',
			folder: 'folderName',
		},
	]
}
