import { Alert, Linking } from 'react-native'

export default function (e) {
	Alert.alert('Oops! an error ocurred', 'Send error log to developers?', [{ text: 'Send', onPress: () => mailError(e) }], { cancelable: true })
}

function mailError(e) {
	Linking.openURL(`mailto:syuraj@gmail.com?subject=SingSong error log&body=LOG\n\n${JSON.stringify(e)}`)
}
