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
			id: '1',
			duration: '10',
			url: 'mediaFiles[i].path',
			title: 'Song Challenge from Suraj',
			// artwork: 'mediaFiles[i].cover || null',
			artist: 'Start a song from letter S',
			album: 'unknown',
			index: 'i',
			folder: 'folderName',
		},
		{
			id: '2',
			duration: '10',
			title: 'Song Challenge from Pankaj',
			// artwork: 'mediaFiles[i].cover || null',
			artist: 'Start a song from letter A',
			album: 'unknown',
			index: 'i',
			folder: 'folderName',
		},
	]
}
