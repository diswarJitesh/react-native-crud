// screens/UserDetailScreen.js
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, ActivityIndicator, View } from 'react-native';
import { UsersService } from '../services/users.service';
import { Messages } from '../metadata/Messages';
import { useToast } from "react-native-toast-notifications";
import GlobalConstants from '../metadata/GlobalConstants';
import CustomButton from './shared/button';
import AddUpdateUser from './shared/addUpdateUser';

const UserDetailScreen = (props) => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [user, SetUser] = useState({
    name: '',
    email: '',
    mobile: ''
  })

  useEffect(() => {
    if (props.route.params.userkey) {
      setId(props.route.params.userkey);
      setLoading(true);
      UsersService.getUser(props.route.params.userkey).then((res) => {
        if (res && res.data) {
          SetUser(res.data)
        }
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
        toast.show(Messages.serverErr, GlobalConstants.toastErrOptions);
      })
    } else {
      props.navigation.goBack();
    }
  }, [])

    const updateUser = async (user) => {
      setLoading(true);
      let data = {...user, id};
      UsersService.updateUser(data).then(res => {
        setLoading(false);
        toast.show(Messages.userUpdated, GlobalConstants.toastOptions);
        props.navigation.goBack();
      }).catch(err => {
        setLoading(false);
        toast.show(Messages.serverErr, GlobalConstants.toastErrOptions);
      })
      
    }
    const deleteUser = () => {
      setLoading(true);
      UsersService.deleteUser(id).then(res => {
        setLoading(false);
        toast.show(Messages.userDeleted, GlobalConstants.toastOptions);
        props.navigation.navigate('UserScreen');
      }).catch(err => {
        setLoading(false);
        toast.show(Messages.serverErr, GlobalConstants.toastErrOptions);
      })
    }
    const openConfirmationAlert = () => {
      Alert.alert(
        'Delete User',
        'Are you sure?',
        [
          {text: 'Yes', onPress: () => deleteUser()},
          {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
        ],
        { 
          cancelable: true 
        }
      );
    }
  if (loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    )
  } else {
    return (
        <>
          <AddUpdateUser onSubmit={updateUser} user={user} userId={id}/>
          <View style={styles.deleteButton}>
            <CustomButton title="Delete" backgroundColor="#FF0000" pressHandler={openConfirmationAlert}/>
          </View>
        </>
    );
  }
}
const styles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    maxWidth: 372,
    marginHorizontal: "5%"
  }
})
export default UserDetailScreen;