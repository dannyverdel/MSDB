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
        <ScrollView>
            {errorMessage ? <Text style={styles.error}>Something went wrong, please try again later</Text> : null}
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/original/${results.poster_path}` }} />
            <Text style={styles.title}>{results.title}</Text>
            <Text style={styles.overview}>{results.overview}</Text>
            <ScrollView
                style={styles.row}
                horizontal
                showsHorizontalScrollIndicator="false"
            >
                <Text style={styles.subHeader}>Released on {results.release_date}</Text>
                <Text style={styles.subHeader}>Runtime: {(results.runtime / 60).toFixed(1)} hours</Text>
                <Text style={styles.subHeader}>Revenue: ${results.revenue}</Text>
                <Text style={styles.subHeader}>Budget: ${results.budget}</Text>
            </ScrollView>
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
    title: 'Detail'
};

const styles = StyleSheet.create({
    error: {
        textAlign: 'center',
        color: 'red',
        marginTop: 10,
        marginBottom: 10
    },
    image: {
        height: 500,
        width: 350,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
        marginTop: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    overview: {
        fontSize: 18,
        width: 350,
        alignSelf: 'center',
        textAlign: 'center'
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