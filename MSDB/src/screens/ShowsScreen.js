import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const ShowsScreen = ({ navigation }) => {
    return (
        <View>
            <Text>ShowsScreen</Text>
            <Button
                title='go to detail'
                onPress={() => navigation.navigate('ShowsDetail')}
                type="outline"
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default ShowsScreen;