import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../api/api';
import Secrets from '../../Secrets';

const MoviesDetailScreen = ({ navigation }) => {
    const id = navigation.getParam('id');

    const [vault] = Secrets();

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const getResults = async () => {
        try {
            const response = await api.get(`/movie/${id}`, {
                params: {
                    api_key: vault.apiKey
                }
            });
            setResults(response.data);
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
        <View>
            <Text>{results.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default MoviesDetailScreen;