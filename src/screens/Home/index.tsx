import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useAuth } from '../../context/authContext';
import { commonStyles } from '../../theme/commonStyle';


const Home = () => {
    const { user, logout } = useAuth();


    const onLogOut = async () => {
        try {
            await logout()

        } catch (error) {
            Alert.alert("Error", "Unable To Log Out")
        }

    }

    return (
        <View style={commonStyles.screen}>
            <View style={[commonStyles.card, { gap: 10 }]}>
                <Text style={commonStyles.title}>Welcome 🎉</Text>
                <Text style={commonStyles.subtitle}>{`Name - ${user?.name}`}</Text>
                <Text style={{ marginBottom: 20 }}>{`Email - ${user?.email}`}</Text>

                <Pressable style={commonStyles.button} onPress={onLogOut}>
                    <Text style={commonStyles.buttonText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Home;
