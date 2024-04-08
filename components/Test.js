import {View, Text,Button} from 'react-native';
import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from './firebase/configfire';
const Test = ({navigation}) => {    
    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("Déconnexion réussie");
            console.log(auth.currentUser)
            console.log(auth)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
            });
        }).catch((error) => {
            console.error("Une erreur est survenue lors de la déconnexion :", error);
        });
    };
    return (
        <View>
            <Text>Test</Text>
            <Button
                title="Logout"
                onPress={handleLogout}
            />
        </View>
        
    );
};

export default Test;