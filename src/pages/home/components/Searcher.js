import { useEffect, useState } from "react";
import { TextInput, StyleSheet, View, FlatList, Pressable, Text } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


export default function Searcher(){
    const { navigate } = useNavigation();

    const [search, setSearch] = useState('');
    const [pokemonNames, setPokemonNames] = useState([]);
    const [showPokemonNames, setShowPokemonNames] = useState([]);
    

    const filterPokemons = (t) => {
        if(t === ''){
            setSearch(t);
            setShowPokemonNames([]);
        }else{
            const newShowPokemonNames = pokemonNames.filter(p => p.includes(t.toLowerCase()));
            setSearch(t);
            setShowPokemonNames(newShowPokemonNames.slice(0,5));
        }
    }

    useEffect(() => {
        const fetchPokemonNames = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
                const data = response.data;
                const names = data.results.map(p => (p.name));
                setPokemonNames(names);
            } catch (error) {
                console.error(error)                
            }
        }
        fetchPokemonNames();
    }, [])
    
    return(
        <View style={styles.container } >
            <TextInput
            style={styles.textInput}
            placeholder="Buscar..."
            onChangeText={filterPokemons}
            value={search}
            />

            <FlatList
                style={styles.flatList}
                data={showPokemonNames}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text 
                    style={styles.text}
                    onPress={() => { navigate( 'PokemonDetails', {name: item} ); }} 
                    > 
                        { item } 
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingLeft: 10,
        marginBottom: 10
    },
    flatList:{
        flex: 0.2,
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 1000,
        top: 40,
        left: 20,
        borderRadius: 10,
        paddingHorizontal: 20,

        elevation: 10,
    },
    text:{
        borderBottomWidth: 1,
        borderColor:'#E7E7E7',
        paddingVertical: 5
    },
    textInput: {
        width: 200,
        height:30,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 15,
        paddingRight: 10
    }
});