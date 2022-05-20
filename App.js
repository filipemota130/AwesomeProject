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
import axios from 'axios';
//import api from './src/services/api';

//import {Colors} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title, type}) => {
  return (
    <View
      style={type === 'titleBar' ? styles.TitleBar : styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
    </View>
  );
};

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const [user, setUser] = React.useState('/filipemota130');
  const [repos, setRepos] = React.useState([]);

  //atulizar Lista
  useEffect(() => {
    function getURL() {
      return `https://api.github.com/users${user}/repos`;
    }
    async function fetchData() {
      const result = await axios(getURL());
      setRepos(result.data);
    }
    fetchData();
  }, [user]);

  return (
    <SafeAreaView>
      <StatusBar />
      <Section title="Lista de Repositorios" type="titleBar" />
      <TextInput
        placeholder="Insira seu repositorio"
        onChangeText={newName => setUser(newName)}
        Value={user}
      />
      <SectionList
        sections={repos}
        keyExtractor={item => item.id}
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
