import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

const ListItemActors = ({ result }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{result.name}</Text>
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/original/${result.profile_path}` }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingVertical: 15,
        marginHorizontal: 15,
        borderRadius: 25
    },
    image: {
        height: 500,
        width: 350,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
        marginVertical: 10
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: 'black',
        marginVertical: 10
    }
});

export default ListItemActors;