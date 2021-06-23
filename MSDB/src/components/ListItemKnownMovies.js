import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

const ListItemKnownMovies = ({ movie }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }} />
            <Text style={styles.name}>{movie.title}</Text>
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
        fontSize: 20
    }
});

export default ListItemKnownMovies;