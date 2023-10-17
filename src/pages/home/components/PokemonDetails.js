import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import axios from "axios";
import { getTypeColor } from '../../../helpers/stylePokemon';
import { Ionicons } from '@expo/vector-icons';
import { isColor } from 'react-native-reanimated';

export const PokemonDetails = ({ navigation }) => {
  const { name } = useRoute().params;
  const [POKEMON, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        setPokemon(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error)
      }
    }
    fetchPokemon();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View
        style={[{ backgroundColor: `${(POKEMON) ? (getTypeColor(POKEMON.types[0].type.name)) : 'light'}` }, style.cotainer]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ ...style.backBottom }}
          onPress={() => navigation.pop()}
        >
          <Ionicons
            name="arrow-back"
            size={35}
            color={'white'} />
        </TouchableOpacity>
        {/* POKEMON NAME */}
        <Text
          style={{ ...style.pokemonName }}
        >{POKEMON?.name + '\n'}#{POKEMON?.id}</Text>
        {/* POKEBOLA BLANCA */}
        <Image
          source={require('../../../assets/pokebola-blanca.png')}
          style={{ ...style.pokeBall }}
        />
        <Image
          source={{ uri: POKEMON?.sprites.other.home.front_default }}
          style={style.pokemonImg}
        />
        {/* POKEMON DETAIL + LOADING*/}
      </View>
      {
        isLoading === true
          ? (
            <View style={style.loading}>
              <ActivityIndicator
                color={`${(POKEMON) ? (getTypeColor(POKEMON.types[0].type.name)) : 'light'}`}
                size={50}
              />
            </View>
          ) : <FullDetails {...POKEMON} />
      }
    </View>
  )
}
const style = StyleSheet.create({
  cotainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000
  },
  backBottom: {
    position: 'absolute',
    left: 10,

  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
    top: 40
  },
  pokeBall: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImg: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -20
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const FullDetails = ({ types, weight, sprites, abilities, moves, stats }) => {
  return (
    <ScrollView>
      {/* POKEMONS TYPES + WEIGHT*/}
      <View
        style={{ ...stylesD.container }}
      >
        <Text style={{ ...stylesD.title }}>Types</Text>
        <View style={{ flexDirection: 'row' }}>
          {types.map((type) => {
            return (
              <Text
                key={type.type.name}
                style={{ ...stylesD.regularText }}
              > {type.type.name} </Text>
            )
          })}
        </View>
        <Text style={{ ...stylesD.title }}>Peso</Text>
        <Text style={{ ...stylesD.regularText }}> {weight} Kg </Text>
      </View>
      {/* POKEMONS SPRITES */}
      <View style={{ ...stylesD.container }}>
        <Text style={{ ...stylesD.title }}>Sprites</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Image
          source={{ uri: sprites.front_default }}
          style={{ ...stylesD.basicSprite }}
        />
        <Image
          source={{ uri: sprites.back_default }}
          style={{ ...stylesD.basicSprite }}
        />
        <Image
          source={{ uri: sprites.front_shiny }}
          style={{ ...stylesD.basicSprite }}
        />
        <Image
          source={{ uri: sprites.back_shiny }}
          style={{ ...stylesD.basicSprite }}
        />
      </ScrollView>
      {/* POKEMON HABILITIES */}
      <View style={{ ...stylesD.container }}>
        <Text style={{ ...stylesD.title }}>Habilidades Base</Text>
        <View style={{ flexDirection: 'row' }}>
          {abilities.map(({ ability }) => {
            return (
              <Text
                key={ability.name}
                style={stylesD.regularText}
              > {ability.name}</Text>
            )
          })}
        </View>
      </View>
      {/* POKEMON MOVES */}
      <View style={{ ...stylesD.container }}>
        <Text style={{ ...stylesD.title }}>Movimientos</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {moves.map(({ move }) => {
            return (
              <Text
                key={move.name}
                style={stylesD.regularText}
              > {move.name}</Text>
            )
          })}
        </View>
      </View>
      {/* POKEMON STATS */}
      <View style={{ ...stylesD.container }}>
        <Text style={{ ...stylesD.title }}>Stats</Text>
        <View >
          {stats.map(({ stat, base_stat }) => {
            return (
              <View key={stat.name}
                style={{ flexDirection: 'row' }}
              >
                <Text style={{ ...stylesD.regularText, width: 150 }}> {stat.name}</Text>
                <Text style={{ ...stylesD.regularText, fontWeight: 'bold' }}> {base_stat}</Text>
              </View>
            )
          })}
        </View>
        {/* POKEMOS FINAL SPRITE */}
        <View
          style={{
            marginBottom: 20,
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: sprites.front_default }}
            style={{ ...stylesD.basicSprite }}
          />
        </View>
      </View>
    </ScrollView>
  )
}
const stylesD = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20
  },
  regularText: {
    fontSize: 18,
    marginRight: 10
  },
  basicSprite: {
    width: 100,
    height: 100
  }
})
