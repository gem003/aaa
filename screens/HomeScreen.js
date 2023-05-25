import { Button } from 'react-native';
import React from 'react';

const HomeScreen = ({ navigation }) => {
    // Hàm điều hướng
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    return <Button title='Go to Login Screen' onPress={navigateToLogin} />;
};

export default HomeScreen;