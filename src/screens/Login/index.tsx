import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteNames } from "../../navigation/routes";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { commonStyles } from "../../theme/commonStyle";
import { isValidEmail } from "../../utils/validator";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";

const Login: React.FC = () => {
    const { reset, navigate } = useNavigation()
    const { login } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrors] = useState('')
    const [obsecure, setObsecure] = useState(true)
    const onPressLogin = async () => {
        setErrors('')

        if (!email.trim() || !password.trim() || !isValidEmail(email)) {
            setErrors('Invalid email/password format.')
            return;
        }

        try {
            await login(email, password)
            reset({
                index: 0,
                routes: [{ name: RouteNames.home as never }]
            });
        } catch (e: any) {
            setErrors(e.message?.toString?.() ?? "An error occurred")
        }

    }

    const onPressGoToSignUp = () => {
        navigate(RouteNames.signUp as never)
    }
    return <SafeAreaView>
        <KeyboardAvoidingView behavior='padding'>
            <ScrollView>
                <View style={{ flex: 1, justifyContent: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 100 }}>

                    <Text style={[commonStyles.title, { textAlign: 'center' }]}>Login</Text>
                    <Text style={commonStyles.error}>{error}</Text>
                    <Text style={commonStyles.subtitle}>Email</Text>
                    <TextInput style={commonStyles.input} onChangeText={setEmail}></TextInput>
                    <Text style={commonStyles.subtitle}>Password</Text>
                    <View style={[commonStyles.input, { flexDirection: 'row' }]}>
                        <TextInput style={{ flex: 1 }} onChangeText={setPassword} secureTextEntry={obsecure}></TextInput>
                        <TouchableOpacity style={{}} onPress={() => setObsecure(!obsecure)}>
                            <FontAwesome6 name={obsecure ? "eye-slash" : "eye"} color={colors.primary} size={20} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={onPressLogin}
                        style={commonStyles.button}>
                        <Text style={commonStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressGoToSignUp}
                        style={{ marginTop: 20 }}>
                        <Text style={styles.linkText}>Go To Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
}


export default Login;

const styles = StyleSheet.create({
    textInput: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 10
    },
    linkText: {
        textAlign: 'center',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    }
})