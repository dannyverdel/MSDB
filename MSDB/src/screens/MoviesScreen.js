import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import api from '../api/api';
import Secrets from '../../Secrets';
import ListItem from '../components/ListItem';
import Searchbar from '../components/SearchBar';

const MoviesScreen = ({ navigation }) => {
    const [vault] = Secrets();

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [term, setTerm] = useState("");

    const getResults = async () => {
        try {
            const response = await api.get('/movie/popular', {
                params: {
                    api_key: vault.apiKey
                }
            });
            setResults(response.data.results);
            setErrorMessage('');
        } catch (err) {
            setErrorMessage("Something went wrong, please try again later.");
        }
    };

    useEffect(() => {
        getResults();
        setTerm('');

        const listener = navigation.addListener("didFocus", () => {
            getResults();
            setTerm('');
        });

        return () => {
            listener.remove();
        };
    }, []);

    const searchApi = async (searchTerm) => {
        try {
            const response = await api.get("/search/movie", {
                params: {
                    api_key: vault.apiKey,
                    query: searchTerm
                }
            });
            setResults(response.data.results);
            setErrorMessage('');
        } catch (err) {
            setErrorMessage('Something went wrong, please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <Searchbar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => {
                    term.length > 0 ? searchApi(term) : getResults()
                }}
            />
            {errorMessage ? <Text style={styles.error}>Something went wrong, please try again later</Text> : null}
            <FlatList
                data={results}
                keyExtractor={(result) => (result.id).toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('MoviesDetail', { id: item.id })}>
                                <ListItem result={item} type='Movie' />
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
        marginTop: 10,
        marginBottom: 10
    },
    container: {
        flex: 1
    }
});

export default MoviesScreen;