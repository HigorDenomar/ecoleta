import React, { useState, useEffect, useReducer } from 'react';
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
import axios from 'axios';

import styles from './styles';

interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
     // const ufInitials = res.data.map(uf => uf.sigla);
      const ufInitials = res.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if(selectedUf === '0') {
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res => {
      const cityNames = res.data.map(city => city.nome);

      setCities(cityNames);
    });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    if(selectedUf === '') {
      Alert.alert('Opss...', 'selecione um estado pra continuar');
    } else if(selectedCity === '') {
      Alert.alert('Opss...', 'selecione uma cidade pra continuar');
    } else {
      navigation.navigate('Points', {uf: selectedUf, city: selectedCity});
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
              value: '0',
            }}
            value={selectedUf}
            onValueChange={value => setSelectedUf(value)}
            items={ufs.map(uf => {
              return {
                label: uf,
                value: uf,
              }
            })}
          />
        </View>
        
        <View style={styles.input}>
          <RNSelect
            placeholder={{
              label: 'Selecione uma cidade',
              value: null,
            }}
            value={selectedCity}
            onValueChange={value => setSelectedCity(value)}
            items={cities.map(city => {
              return {
                label: city,
                value: city,
              }
            })}
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