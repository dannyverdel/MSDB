import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import api from '../api/api';
import Secrets from '../../Secrets';

const MoviesScreen = ({ navigation }) => {
    const [vault] = Secrets();

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const getResults = async () => {
        try {
            const response = await api.get('/movie/popular', {
                params: {
                    api_key: vault.apiKey
                }
            });
            setResults(response.data.results);
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

    return (
        <View style={styles.container}>
            {errorMessage ? <Text style={styles.error}>Something went wrong, please try again later</Text> : null}
            <FlatList
                data={results}
                keyExtractor={(result) => (result.id).toString()}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('MoviesDetail', { id: item.id })}>
                                <Text>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    error: {
        textAlign: 'center',
        color: 'red',
        marginTop: 10
    },
    container: {
        borderWidth: 5,
        borderColor: 'red',
        flex: 1
    }
});

export default MoviesScreen;