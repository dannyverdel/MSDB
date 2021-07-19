import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
    return (
        <View style={styles.backgroundStyle}>
            <Feather
                name="search"
                style={styles.iconStyle}
                color='black'
            />
            <TextInput
                placeholder="Search"
                style={styles.inputStyle}
                value={term}
                onChangeText={onTermChange}
                autoCapitalize="none"
                autoCorrect={false}
                onEndEditing={onTermSubmit}
                placeholderTextColor='black'
                color='black'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        height: 50,
        borderRadius: 25,
        marginHorizontal: 15,
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    inputStyle: {
        fontSize: 18,
        flex: 1
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 15
    }
});

export default SearchBar;