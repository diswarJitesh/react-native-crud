import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default function Header({navigation, title}) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <>
    <View style={styles.headerTitle}>
      <Icon name='menu' size={32} color='#FFF' onPress={openMenu} style={styles.icon} />
      
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
    marginLeft: 10,
    marginTop: 2
  },
  icon: {
    // position: 'absolute',
    left: 16,
    marginRight: 30
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10
  },
});