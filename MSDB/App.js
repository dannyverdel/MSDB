import React from "react";

// Navigation imports
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// Screen imports
import MoviesScreen from "./src/screens/MoviesScreen";
import MoviesDetailScreen from "./src/screens/MoviesDetailScreen";
import ShowsScreen from "./src/screens/ShowsScreen";
import ShowsDetailScreen from "./src/screens/ShowsDetailScreen";
import ActorScreen from "./src/screens/ActorsScreen";
import ActorsDetailScreen from "./src/screens/ActorsDetailScreen";

// Icon imports
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

const moviesFlow = createStackNavigator({
  Movies: MoviesScreen,
  MoviesDetail: MoviesDetailScreen
});

moviesFlow.navigationOptions = {
  title: 'Movies',
  tabBarIcon: <MaterialIcons name='local-movies' size={24} />,
  tabBarIcon: ({ tintColor }) => <MaterialIcons name='local-movies' size={24} color={tintColor} />,
  tabBarOptions: { activeTintColor: '#007AFF' }
};

const showsFlow = createStackNavigator({
  Shows: ShowsScreen,
  ShowsDetail: ShowsDetailScreen
});

showsFlow.navigationOptions = {
  title: 'Shows',
  tabBarIcon: ({ tintColor }) => <FontAwesome5 name='tv' size={24} color={tintColor}/>,
  tabBarOptions: { activeTintColor: '#007AFF' }
}

const actorsFlow = createStackNavigator({
  Actors: ActorScreen,
  ActorsDetail: ActorsDetailScreen
});

actorsFlow.navigationOptions = {
  title: 'Actors',
  tabBarIcon: ({ tintColor }) => <Entypo name='star' size={24} color={tintColor}/>,
  tabBarOptions: { activeTintColor: '#007AFF' }
};

const tabNavigator = createBottomTabNavigator({
  moviesFlow,
  showsFlow,
  actorsFlow
});

export default createAppContainer(tabNavigator);