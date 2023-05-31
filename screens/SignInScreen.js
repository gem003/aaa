import React, { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import log from '../log';

const SignInScreen = (props) => {
    let users = [];
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function to fetch data from the API
    async function fetchData() {
        try {
            const response = await fetch('http://192.168.137.89:3000/users');
            const data = await response.json();
            return data;
        } catch (error) {
            log.error('Fetch data failed ' + error);
            return null;
        }
    }

    // Call the fetchData function and store the result in a variable
    async function storeData() {
        users = await fetchData();
    }

    storeData();

    const doLogin = () => {
        // Kiểm tra dữ liệu gồm username và password
        if (username.length == 0) {
            alert('Username is required');
            return;
        }

        if (password.length == 0) {
            alert('Password is required');
            return;
        }

        // Tạo đối tượng lưu giữ thông tin login
        let request = { username: username, password: password };

        log.info('authInfo: ' + JSON.stringify(request));

        if (users) {
            const authInfo = users.find((user) => user.userName === request.username);

            if (!authInfo) {
                Alert.alert('Notification', 'Cant find user infomation', [{ text: 'Cancel', onPress: () => log.error('Cant find user ' + request.username) }]);
            } else {
                if (!(authInfo.password === request.password)) {
                    Alert.alert('Notification', 'Password is not correct', [{ text: 'Cancel', onPress: () => log.error('Password sai ' + request.username) }]);
                } else {
                    Alert.alert('Notification', 'Login successfull ' + request.username, [
                        { text: 'OK', onPress: () => navigateToHome() },
                        { text: 'Cancel', onPress: () => log.info('Press Cancel') }
                    ]);
                }
            }
        }
    };

    const navigateToHome = () => {
        props.navigation.navigate('Home');
    };

    return (
        <View style={styles.root}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
            <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
            <CustomButton btnLabel={'Sign In'} onPress={doLogin} />
            <CustomButton btnLabel={'Back to Home'} onPress={navigateToHome} />
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    }
});