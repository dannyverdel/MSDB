import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import api from '../api/api';
import Secrets from '../../Secrets';
import ListItemActors from '../components/ListItemActors';
import Searchbar from '../components/SearchBar';

const ActorScreen = ({ navigation }) => {
    const [vault] = Secrets();

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [term, setTerm] = useState("");

    const getResults = async () => {
        try {
            const response = await api.get('/person/popular', {
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
            const response = await api.get("/search/person", {
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
                        <TouchableOpacity onPress={() => navigation.navigate('ActorsDetail', { id: item.id, movies: item.known_for })}>
                            <ListItemActors result={item} />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
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
    }
});

export default ActorScreen;