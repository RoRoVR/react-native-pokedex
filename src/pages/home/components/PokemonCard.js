import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getBackColor, getTypeColor } from "../../../helpers/stylePokemon";
import CardStyles from "../../../helpers/CardStyles";

export default function PokemonCard({ url }) {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonNumber, setPokemonNumber] = useState(null);
  const { navigate } = useNavigation();

  const extractPokemonNumber = (url) => {
    const regex = /\/(\d+)\//;
    const match = url.match(regex);
    if (match && match[1]) {
      setPokemonNumber(match[1]);
    }
  };

  const showDetailsPokemon = () => {
    if (pokemonNumber) {
      navigate("PokemonDetails", { number: pokemonNumber, name: pokemon.name });
    }
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        setPokemon(data);
        extractPokemonNumber(url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemons();
  }, [url]);

  return (
    <Pressable
      style={{
        ...style.card,
        backgroundColor: `${
          pokemon ? getTypeColor(pokemon.types[0].type.name) : "light"
        }`,
      }}
      onPress={showDetailsPokemon}
    >
      {pokemon ? (
        <View style={style.container}>
          <View style={style.textContainer}>
            <Text style={CardStyles.number}>#{pokemonNumber}</Text>
            <Text style={CardStyles.title}>{pokemon.name.toUpperCase()}</Text>
            <View style={style.typesContainer}>
              {pokemon.types.map((type, index) => (
                <Text
                  key={index}
                  style={{
                    backgroundColor: `${
                      pokemon ? getBackColor(type.type.name) : "light"
                    }`,
                    marginRight: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    color: "white",
                  }}
                >
                  {type.type.name.toUpperCase()}
                </Text>
              ))}
            </View>
          </View>
          <View style={style.imageContainer}>
            <Image
              style={style.image}
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonNumber}.png`,
              }}
            />
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </Pressable>
  );
}
const style = StyleSheet.create({
  card: {
    margin: 12,
    padding: 15,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  imageContainer: {
    position: "absolute",
    right: 0,
    top: -20,
  },
  image: {
    width: 135,
    height: 135,
  },
  typesContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
});
