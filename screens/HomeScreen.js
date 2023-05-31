import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import log from '../log';
import Student from '../components/Student';

const HomeScreen = ({ navigation }) => {
    const [students, setStudents] = useState([]);
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };
    async function getListStudent() {
        try {
            const API_URL = 'http://192.168.137.89:3000/student';
            const response = await fetch(API_URL);
            const data = await response.json();
            setStudents(data);
            log.info('====> students:', JSON.stringify(data));
        } catch (error) {
            log.error('Fetch data failed ' + error);
        }
    }
    useEffect(() => {
        console.log('useEffect has been called!');
        getListStudent();
    }, []);return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollView}>
                <Button title='Go to Login Screen' onPress={navigateToLogin} />
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>
                <View style={styles.studentContainer}>
                    {students.map((item, index) => {
                        return <Student student={item} key={index}></Student>;
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
        padding: 20
    },
    txtHeader: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    studentContainer: {
        flex: 1
    }
});

export default HomeScreen;