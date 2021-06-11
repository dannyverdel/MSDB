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

// Icon imports
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const moviesFlow = createStackNavigator({
  Movies: MoviesScreen,
  MoviesDetail: MoviesDetailScreen
});

moviesFlow.navigationOptions = {
  title: 'Movies',
  tabBarIcon: <MaterialIcons name='local-movies' size={24} />,
};

const showsFlow = createStackNavigator({
  Shows: ShowsScreen,
  ShowsDetail: ShowsDetailScreen
});

showsFlow.navigationOptions = {
  title: 'Shows',
  tabBarIcon: <FontAwesome5 name='tv' size={24} />
}

const tabNavigator = createBottomTabNavigator({
  moviesFlow,
  showsFlow
});

export default createAppContainer(tabNavigator);