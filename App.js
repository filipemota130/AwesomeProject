/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

import axios from 'axios';

const Section = ({children, title, type}) => {
  return (
    <View
      style={type === 'titleBar' ? styles.TitleBar : styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
    </View>
  );
};

const Item = ({title}) => (
  <View style={styles.item}>
    <Button style={styles.title} title={title} />
  </View>
);

const App = () => {
  const [user, setUser] = React.useState('filipemota130');
  const [repos, setRepos] = React.useState([]);

  //atualizar Lista
  async function getURL() {
    const result = await axios.get(
      `https://api.github.com/users/${user}/repos`,
    );
    console.log(result);
    setRepos(result.data);
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <Section title="Lista de Repositorios" type="titleBar" />
      <TextInput
        placeholder="Insira seu repositorio"
        onChangeText={text => setUser(text)}
        Value={user}
      />
      <Button title="buscar" onPress={() => getURL()} />
      <FlatList
        data={repos}
        renderItem={({item}) => <Item title={item.name} />}
      />
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
