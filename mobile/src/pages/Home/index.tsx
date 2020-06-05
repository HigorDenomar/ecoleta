import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNSelect from 'react-native-picker-select';

import styles from './styles';

const Home = () => {
  const[uf, setUf] = useState<string>('');
  const[city, setCity] = useState<string>('');
  const navigation = useNavigation();

  function handleNavigateToPoints() {
    if(uf === '') {
      Alert.alert('Opss...', 'selecione um estado pra continuar');
    } else if(city === '') {
      Alert.alert('Opss...', 'selecione uma cidade pra continuar');
    } else {
      navigation.navigate('Points', {uf, city});
    }
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/home-background.png')}
      imageStyle={{
        width: 274,
        height: 368
      }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')}/>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.input}>
          <RNSelect
            placeholder={{
              label: 'Selecione um estado',
              value: null,
            }}
            value={uf}
            onValueChange={selected => selected ? setUf(selected) : setUf('')}
            items={[
              {label: 'MG', value: 'MG'},
              {label: 'RS', value: 'RS'},
              {label: 'MR', value: 'MR'},
              {label: 'SP', value: 'SP'},
            ]}
          />
        </View>
        
        <View style={styles.input}>
          <RNSelect
            placeholder={{
              label: 'Selecione uma cidade',
              value: null,
            }}
            value={city}
            onValueChange={selected => selected ? setCity(selected) : setCity('')}
            items={[
              {label: 'Brasília de Minas', value: 'Brasília de Minas'},
              {label: 'Montes Claros', value: 'Montes Claros'},
              {label: 'Japonvar', value: 'São Francisco'},
              {label: 'Nova Minda', value: 'Belo Horizonte'},
            ]}
          />
        </View>

        <RectButton
          style={styles.button}
          onPress={() => {
            handleNavigateToPoints();
          }}
        >
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

export default Home;