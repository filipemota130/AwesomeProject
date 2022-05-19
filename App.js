/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
} from 'react-native';
import api from './src/services/api';

//import {Colors} from 'react-native/Libraries/NewAppScreen';
const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const Section = ({children, title, type}) => {
  return (
    <View
      style={type === 'titleBar' ? styles.TitleBar : styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
    </View>
  );
};

const App = () => {
  const [user, setUser] = React.useState('');
  const [repos, setRepos] = React.useState([]);

  //atulizar Lista
  useEffect(() => {
    const response = api.get(`/${user}/repos`);
    const lista = response.data;
    setRepos(lista);
  }, [user]);

  return (
    <SafeAreaView>
      <StatusBar />
      <Section title="Lista de Repositorios" type="titleBar" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TextInput
          placeholder="Insira seu repositorio"
          onChangeText={newName => setUser(newName)}
          defaultValue={user}
        />
        <SectionList
          sections={repos}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Section title={item.name} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#363635',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  TitleBar: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#51C713',
  },
});

export default App;
