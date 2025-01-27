import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const validateFields = () => {
        if (!email.trim() || !password.trim()) {
            setError('Both fields are required.');
            return false;
        }
        if (email !== 'admin@gmail.com') {
            setError('Invalid email.');
            return false;
        }
        if (password !== 'admin') {
            setError('Invalid password.');
            return false;
        }
        return true;
    };

    const handleLogin = () => {
        if (validateFields()) {
            setError('');
            // router.push('/home');
            router.replace('/home');
        }
    };

    const handleContinueWithoutLogin = () => {
        setError('');
        router.replace('/home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/images/housing-verse-logo1.png')}
                    style={styles.logo}
                />
                {/* <Text style={styles.appName}>HousingVerse</Text> */}
            </View>

            <Text style={styles.title}>Welcome Back!</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
            />



            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* <Pressable onPress={() => {
                console.log('pressed');

            }} style={(
                {
                    pressed
                }
            ) => [
                {
                    opacity: pressed ? 0.5 : 1,
                }
            ] }>
                <Text>Click Me</Text>
            </Pressable> */}

            <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinueWithoutLogin}
            >
                <Text style={styles.continueButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 30,
    },
    logo: {
        width: 400,
        height: 150,
        // resizeMode: 'contain',
    },
    appName: {
        fontSize: 18,
        color: '#555',
        // marginTop: 10,
        fontWeight: '600',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    continueButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#6c757d',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});