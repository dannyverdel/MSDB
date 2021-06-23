import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import api from '../api/api';
import Secrets from '../../Secrets';
import ListItemKnownMovies from '../components/ListItemKnownMovies';

const ActorsDetailScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const movies = navigation.getParam('movies');

    const [vault] = Secrets();

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const getResults = async () => {
        try {
            const response = await api.get(`/person/${id}`, {
                params: {
                    api_key: vault.apiKey
                }
            });
            setResults(response.data);
        } catch (err) {
            setErrorMessage('Something went wrong, please try again later.');
        }
    };

    useEffect(() => {
        getResults();

        const listener = navigation.addListener("didFocus", () => {
            getResults();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <ScrollView>
            {errorMessage ? <Text style={styles.error}>Something went wrong, please try again later</Text> : null}
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/original/${results.profile_path}` }} />
            <View style={styles.row}>
                <Text style={styles.subHeader}>{results.place_of_birth}</Text>
                <Text style={styles.subHeader}>{results.birthday}</Text>
            </View>
            <Text style={styles.name}>{results.name}</Text>
            <Text style={styles.biography}>{results.biography}</Text>
            <FlatList
                data={movies}
                style={styles.list}
                keyExtractor={(result) => (result.id).toString()}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <ListItemKnownMovies movie={item} />
                        </View>
                    );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </ScrollView>
    );
};

ActorsDetailScreen.navigationOptions = {
    title: 'Actor Detail'
};

const styles = StyleSheet.create({
    error: {
        textAlign: 'center',
        color: 'red',
        marginTop: 10,
        marginBottom: 10
    },
    image: {
        height: 550,
        width: 375,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
        marginTop: 20
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    biography: {
        fontSize: 18,
        width: 350,
        alignSelf: 'center',
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 375,
        alignSelf: 'center',
        marginVertical: 5
    },
    subHeader: {
        color: 'rgba(0, 0, 0, 0.6)'
    },
    list: {
        marginVertical: 20
    }
});

export default ActorsDetailScreen;