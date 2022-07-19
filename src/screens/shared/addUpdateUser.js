import React from "react";
import { StyleSheet, TextInput, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from "./button";
import { UsersService } from '../../services/users.service';

const formSchema = (userId) => {
    return yup.object({
        name: yup.string()
            .required("Name is required"),
        email: yup.string()
            .required("Email is required")
            .email("Please enter valid email address")
            .test('isUnique', 'Entered email address is already taken', async (val) => {
                try {
                    let res = await UsersService.checkFieldUnique('email', val.toString(), userId);
                    return (res && res.data && res.data.length) ? false : true;
                } catch (err) {
                    return true;
                }
    
            }),
        mobile: yup.string().required("Phone number is required").typeError("Please enter valid phone number")
            .test('isUnique', 'Entered mobile number is already taken', async (val) => {
                try {
                    let res = await UsersService.checkFieldUnique('mobile', val.toString(), userId);
                    return (res && res.data && res.data.length) ? false : true;
                } catch (err) {
                    return true;
                }
    
            }),
    });
}

export default ({ onSubmit, user = null, userId = null }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Formik
                    initialValues={{ name: user?.name || '', email: user?.email || '', mobile: user?.mobile || '' }}
                    validationSchema={formSchema(userId)}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        onSubmit(values)
                    }}
                >
                    {props => (
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder='Name'
                                onChangeText={props.handleChange('name')}
                                onBlur={props.handleBlur('name')}
                                value={props.values.name}
                            />
                            {/* only if the left value is a valid string, will the right value be displayed */}
                            <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>
                            <TextInput
                                style={styles.input}
                                multiline minHeight={60}
                                placeholder='Email'
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                            />
                            <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Phone Number'
                                onChangeText={props.handleChange('mobile')}
                                onBlur={props.handleBlur('mobile')}
                                keyboardType='numeric'
                                value={props.values.mobile}
                            />
                            <Text style={styles.errorText}>{props.touched.mobile && props.errors.mobile}</Text>
                            <CustomButton title={'submit'} backgroundColor="#19AC52" pressHandler={props.handleSubmit} />
                        </View>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        maxHeight: 350
    },
    input: {
        borderWidth: 2,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
});