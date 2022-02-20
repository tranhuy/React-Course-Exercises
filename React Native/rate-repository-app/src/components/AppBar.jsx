import { View, Pressable, Text, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Constants from 'expo-constants';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backColors.appBar,
    height: 90
  },
  scrollView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.appBar,
    fontSize: theme.fontSizes.header
  },
  tab: {
      padding: 10
  }
});

const Tab = ({ title, navPath }) => {
    return (
        <Pressable>
            <Link to={navPath}>
                <View style={styles.tab}>
                    <Text style={styles.text}>{title}</Text>
                </View>            
            </Link>            
        </Pressable>
    );   
};

const AppBar = () => {
  return (
    <View style={[styles.container]}>
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
            <Tab title='Repositories' navPath='/' />
            <Tab title='Log In' navPath='/login' />
        </ScrollView>        
    </View>
  );
};

export default AppBar;