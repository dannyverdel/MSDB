import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

const ListItem = ({ result }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/original/${result.profile_path}` }} />
            <Text style={styles.name}>{result.name}</Text>
            <Text style={styles.character}>{result.character}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 130,
        marginHorizontal: 10
    },
    image: {
        height: 150,
        width: 130,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3
    },
    name: {
        textAlign: 'center',
        marginVertical: 5,
        fontWeight: 'bold',
        color: 'black'
    },
    character: {
        textAlign: 'center',
        color: 'black'
    }
});

export default ListItem;