
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements'
import { UsersService } from '../services/users.service';
import { useIsFocused } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler'

const UserScreen = (props) => {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [users, setUsers] = useState([]);
    const isFocused = useIsFocused();

    const onRefresh = React.useCallback(() => {
        getUsersData(setRefreshing);
    }, []);

    const getUsersData = (fxn) => {
        fxn(true)
        UsersService.getUsers().then((res) => {
            if (res && res.data && res.data.length) {
                setUsers(res.data)
            } else {
                setUsers([]);
            }
            fxn(false)
        })
            .catch((err) => {
                fxn(false);
                toast.show(Messages.serverErr, GlobalConstants.toastErrOptions);
            });
    }

    useEffect(() => {
        setLoading(true);
        if (isFocused) {
            setUsers([])
            getUsersData(setLoading)
        }
    }, [isFocused])

    if (loading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        )
    } else {
        return (
            <>
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {
                        (users.length)
                            ?
                            users.map((l, i) => (
                                <ListItem key={i} style={styles.content} onPress={() => {
                                    props.navigation.navigate('UserDetailScreen', {
                                        userkey: l.id
                                    });
                                }}>
                                    <ListItem.Content > 
                                        <ListItem.Title style={styles.title}>{l.name}</ListItem.Title>
                                        <ListItem.Subtitle style={styles.subtitle}>{l.mobile}</ListItem.Subtitle>
                                        <ListItem.Subtitle style={styles.subtitle}>{l.email}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron iconStyle={{ fontSize: 30 }}
                                    />
                                </ListItem>
                            ))
                            :
                            <View style={styles.noRecordFound}>
                                <Text style={styles.noText}>No Record Found</Text>
                            </View>
                    }
                </ScrollView>
                <View style={styles.addIconView}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('AddUserScreen')
                    }} >
                        <Icon name="plus" size={35} color="#FFFFFF" />
                    </TouchableOpacity>

                </View>
            </>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20
    },
    subtitle: {
        fontSize: 22
    },
    noRecordFound: {
        backgroundColor: '#808080',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        marginTop: '80%',
        marginLeft: '10%',
        width: '80%'
    },
    noText: {
        textAlign: 'center',
        fontSize: 20
    },
    addIconView: {
        width: 70,
        height: 70,
        backgroundColor: "#19AC52",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        position: 'absolute',
        bottom: 20,
        right: 10
    },
    content: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        zIndex: 999
    }
})
export default UserScreen;