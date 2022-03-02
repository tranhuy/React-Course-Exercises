import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import LogIn from './LogIn';
import RegisterUser from './RegisterUser';
import CreateReview from './CreateReview';
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
          <Route path='/register' exact element={<RegisterUser />} /> 
          <Route path='/repo/:id' exact element={<SingleRepository />} />
          <Route path='/review/create' exact element={<CreateReview />} />
          <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>     
    </View>
  );
};

export default Main;