import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import api from '../api/api';
import Secrets from '../../Secrets';
import ListItemCast from '../components/ListItemCast';

const MoviesDetailScreen = ({ navigation }) => {
    const id = navigation.getParam('id');

    const [vault] = Secrets();

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [credits, setCredits] = useState([]);

    const getResults = async () => {
        try {
            const response = await api.get(`/movie/${id}`, {
                params: {
                    api_key: vault.apiKey
                }
            });
            setResults(response.data);
            getCredits()
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

    const getCredits = async () => {
        try {
            const response = await api.get(`/movie/${id}/credits`, {
                params: {
                    api_key: vault.apiKey
                }
            });
            setCredits(response.data.cast);
        } catch (err) {
            setErrorMessage('Something went wrong, please try again later.');
        }
    }

    return (
        <ScrollView style={styles.container}>
            {errorMessage ? <Text style={styles.error}>Something went wrong, please try again later</Text> : null}
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/original/${results.poster_path}` }} />
            <Text style={styles.title}>{results.title}</Text>
            <Text style={styles.overview}>{results.overview}</Text>
            <Text style={styles.title}>Cast</Text>
            <FlatList
                data={credits}
                keyExtractor={(result) => (result.id).toString()}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <ListItemCast result={item} />
                        </View>
                    );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </ScrollView>
    );
};

MoviesDetailScreen.navigationOptions = {
    title: 'Movie Detail'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d253f'
    },
    error: {
        textAlign: 'center',
        color: 'red',
        marginTop: 10,
        marginBottom: 10
    },
    image: {
        height: 575,
        width: 375,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 3,
        marginTop: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: 'white'
    },
    overview: {
        fontSize: 18,
        width: 350,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white'
    },
    subHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 10
    },
    row: {
        flexDirection: 'row',
        width: 350,
        alignSelf: 'center',
        textAlign: 'center'
    }
});

export default MoviesDetailScreen;