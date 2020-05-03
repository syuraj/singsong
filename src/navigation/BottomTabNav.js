import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { withTheme } from 'styled-components/native'
import SearchScreen from '../screens/SearchScreen'
import TopMaterialTabNav from './TopMaterialTabNav'
import Icon from '../components/Icon'
import HomeScreen from '../screens/HomeScreen'

function BottomTabNav(props) {
	const BottomTabs = createBottomTabNavigator()
	const { foreground, contrastTrans, elevatedBG } = props.theme
	const tabBarOptions = {
		showLabel: false,
		activeTintColor: foreground,
		inactiveTintColor: `${contrastTrans}0.7)`,
		activeBackgroundColor: elevatedBG,
		inactiveBackgroundColor: elevatedBG,
		style: {
			borderTopWidth: 0,
		},
		allowFontScaling: false,
	}

	function iconProvider(route) {
		return ({ focused, color }) => {
			switch (route) {
				case 'Home':
					return <Icon name="message-circle" type="feather" size={focused ? 26 : 23} color={color} />
				case 'Search':
					return <Icon name="mic" type="feather" size={focused ? 26 : 23} color={color} />
				case 'Profile':
					return <Icon name="user" type="feather" size={focused ? 26 : 23} color={color} />
			}
		}
	}

	return (
		<BottomTabs.Navigator initialRouteName="Home" backBehavior="initialRoute" tabBarOptions={tabBarOptions} lazy={false}>
			<BottomTabs.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: iconProvider('Home'),
				}}
			/>
			<BottomTabs.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: iconProvider('Search') }} />
			<BottomTabs.Screen name="Profile" component={TopMaterialTabNav} options={{ tabBarIcon: iconProvider('Profile') }} />
		</BottomTabs.Navigator>
	)
}

export default withTheme(BottomTabNav)
