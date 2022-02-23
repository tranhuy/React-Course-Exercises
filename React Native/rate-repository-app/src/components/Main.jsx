import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';

import RepositoryList from './RepositoryList';
import LogIn from './LogIn';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
          <Route path='/' exact element={<RepositoryList />} />
          <Route path='/login' exact element={<LogIn />} />
          <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>     
    </View>
  );
};

export default Main;