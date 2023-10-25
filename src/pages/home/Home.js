import { SafeAreaView, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";

import axios from "axios";

import Searcher from "./components/Searcher";
import PokemonCard from "./components/PokemonCard";

export default function Home() {
  const [nextPokemons, setNextPokemons] = useState("");
  const [pokemons, setPokemons] = useState([]);

  function loadPokemons(url) {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        const names = data.results.map((p) => ({ name: p.name, url: p.url }));
        setPokemons((s) => [...s, ...names]);
        setNextPokemons(data.next);
      } catch (error) {
        console.error(error);
      }
    };
    if (url !== "") fetchPokemons();
  }

  useEffect(() => {
    loadPokemons("https://pokeapi.co/api/v2/pokemon/");
  }, []);

  return (
    <SafeAreaView style={{paddingTop:30}} >
      <Searcher />
      <FlatList
        data={pokemons}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PokemonCard url={item.url} />}
        onEndReached={() => {
          loadPokemons(nextPokemons);
        }}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
  },
});
