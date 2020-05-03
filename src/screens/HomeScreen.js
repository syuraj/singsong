import React, { useState, useEffect } from 'react'
import { View, Animated, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import QuickScrollList from 'react-native-quick-scroll'
import RenderActivityIndicator from '../components/RenderActivityIndicator'
import RenderChallenge from '../components/RenderChallenge'
import Icon from '../components/Icon'
import { flatListItemLayout } from '../utils/FlatListLayout'
import { scanMessage } from '../constants'
import { contrastColor } from '../themes/styles'

const ScreenHeight = Dimensions.get('window').height
const StatusBarHeight = StatusBar.currentHeight
const FooterHeight = 60
const BottomTabHeight = 49
const ViewportHeight = ScreenHeight - (StatusBarHeight + FooterHeight + BottomTabHeight)
const itemHeight = 75

function HomeScreen(props) {
	const [scrollY] = useState(new Animated.Value(0))
	const { challenges, challengesLoaded } = props

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', props.showFooter)
		return unsubscribe
	}, [props.navigation])

	useEffect(() => {
		props.getChallenges()
	}, [])

	const AnimatedIcon = Animated.createAnimatedComponent(StyledIcon)
	const headerHeight = scrollY.interpolate({
		inputRange: [0, 40],
		outputRange: [40, 0],
		extrapolate: 'clamp',
	})

	if (challengesLoaded) {
		if (challenges.length > 0) {
			return (
				<View style={{ flex: 1 }}>
					<QuickScrollList
						keyExtractor={(asset) => asset.id.toString()}
						data={challenges}
						renderItem={({ item }) => <RenderChallenge item={item} />}
						getItemLayout={flatListItemLayout}
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
							useNativeDriver: false,
						})}
						scrollEventThrottle={16}
						contentContainerStyle={styles.flatlistContent}
						itemHeight={itemHeight}
						viewportHeight={ViewportHeight}
						rightOffset={10}
						thumbStyle={styles.thumbStyle}
					/>
					<Animated.View style={[styles.header, { height: headerHeight }]}>
						<TouchableOpacity onPress={() => props.navigation.navigate('settings')}>
							<AnimatedIcon {...styles.settingsIcon} />
						</TouchableOpacity>
					</Animated.View>
				</View>
			)
		}
		return (
			<MessageWrapper>
				<Message numberOfLines={2}>{"Oops! You don't have any challenges yet"}</Message>
			</MessageWrapper>
		)
	}

	return <RenderActivityIndicator text={scanMessage} />
}

function mapStateToProps(state) {
	return {
		challenges: state.challenges.challenges,
		challengesLoaded: state.challenges.challengesLoaded,
	}
}

export default connect(mapStateToProps, actions)(HomeScreen)

const StyledIcon = styled(Icon)`
	color: ${contrastColor};
	margin-right: 15px;
`

const MessageWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

const Message = styled.Text`
	font-family: 'Circular';
	font-size: 16px;
	color: ${contrastColor};
	margin: 0 55px 0 55px;
	text-align: center;
`

const styles = {
	header: {
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	thumbStyle: {
		width: 4,
		borderWidth: 0,
	},
	settingsIcon: {
		name: 'setting',
		type: 'antdesign',
		size: 24,
	},
	flatlistContent: {
		marginTop: 35,
		paddingBottom: 35,
	},
}
