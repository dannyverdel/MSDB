import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import api from '../api/api';
import Secrets from '../../Secrets';
import ListItem from '../components/ListItem';
import Searchbar from '../components/SearchBar';

const ShowsScreen = ({ navigation }) => {
    const [vault] = Secrets();

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [term, setTerm] = useState("");

    const getResults = async () => {
        try {
            const response = await api.get('/tv/popular', {
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

    const searchApi = async (searchTerm) => {
        try {
            const response = await api.get("/search/tv", {
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
                            <TouchableOpacity onPress={() => navigation.navigate('ShowsDetail', { id: item.id })}>
                                <ListItem result={item} type='Tv' />
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
        flex: 1
    }
});

export default ShowsScreen;