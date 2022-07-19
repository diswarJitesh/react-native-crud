import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import GlobalConstants from '../metadata/GlobalConstants';
import { UsersService } from '../services/users.service';
import { Messages } from '../metadata/Messages';
import { useToast } from "react-native-toast-notifications";
import CustomButton from './shared/button';
import AddUpdateUser from './shared/addUpdateUser';

const AddUserScreen = (props) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const storeUser = (user) => {
    setLoading(true);
    UsersService.addUser(user).then(res => {
      setLoading(false);
      toast.show(Messages.userAdded, GlobalConstants.toastOptions);
      props.navigation.goBack();
    }).catch(err => {
      setLoading(false);
      toast.show(Messages.serverErr, GlobalConstants.toastErrOptions);
    });
  }

  if (loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    )
  } else {
    return (
      <AddUpdateUser onSubmit={storeUser} />
    )
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
  }
})
export default AddUserScreen;