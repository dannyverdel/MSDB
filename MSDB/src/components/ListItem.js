import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

const ListItem = ({ result, type }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{type == 'Movie' ? result.title : result.name}</Text>
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/original/${result.poster_path}` }} />
            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeader}>{result.original_language}</Text>
                <Text style={styles.subHeader}>{type == 'Movie' ? result.release_date : result.first_air_date}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingBottom: 10,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    image: {
        height: 500,
        width: 350,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3
    },
    subHeaderContainer: {
        width: 350,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subHeader: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.6)'
    }
});

export default ListItem;