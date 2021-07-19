import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import api from '../api/api';
import Secrets from '../../Secrets';
import ListItemCast from '../components/ListItemCast';
import ListItemSeasons from '../components/ListItemSeasons';

const ShowsDetailScreen = ({ navigation }) => {
    const id = navigation.getParam('id');

    const [vault] = Secrets();

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [credits, setCredits] = useState([]);

    const getResults = async () => {
        try {
            const response = await api.get(`/tv/${id}`, {
                params: {
                    api_key: vault.apiKey
                }
            });
            setResults(response.data);
            getCredits();
        } catch (err) {
            setErrorMessage(err.message);
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
            const response = await api.get(`/tv/${id}/credits`, {
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
            <Text style={styles.title}>{results.name}</Text>
            <View style={styles.subHeaderContainer}>
                <Text style={styles.count}>{results.number_of_seasons} seasons</Text>
                <Text style={styles.count}>{results.number_of_episodes} episodes</Text>
            </View>
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
            <Text style={styles.title}>Seasons</Text>
            <FlatList
                data={results.seasons}
                keyExtractor={(result) => (result.id).toString()}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <ListItemSeasons result={item} />
                        </View>
                    );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </ScrollView>
    );
};

ShowsDetailScreen.navigationOptions = {
    title: 'Show Detail'
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        borderColor: 'black',
        borderWidth: 3,
        marginTop: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: 'black'
    },
    overview: {
        fontSize: 18,
        width: 350,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black'
    },
    subHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 10,
        color: 'black'
    },
    subHeaderContainer: {
        width: 350,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    count: {
        fontSize: 20,
        color: 'black',
        marginBottom: 10
    }
});

export default ShowsDetailScreen;