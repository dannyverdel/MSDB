import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

const ListItem = ({ result }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/original/${result.poster_path}` }} />
            <Text style={styles.name}>{result.name}</Text>
            <Text style={styles.episodes}>{result.episode_count} episodes</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 250,
        marginHorizontal: 10
    },
    image: {
        height: 350,
        width: 250,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3
    },
    name: {
        textAlign: 'center',
        marginVertical: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },
    episodes: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black'
    }
});

export default ListItem;