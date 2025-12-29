import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteNames } from "../../navigation/routes";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { commonStyles } from "../../theme/commonStyle";
import { isValidEmail } from "../../utils/validator";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";

const SignUp: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const { signup } = useAuth();
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });
    const [signInError, setSignInError] = useState('')
    const [obsecure, setObsecure] = useState(true)
    const { reset, navigate } = useNavigation()
    const onPressSignUp = async () => {
        const newErrors = { name: '', email: '', password: '' };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password length less than 6 characters.';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            try {
                await signup(name, email, password);
                reset({
                    index: 0,
                    routes: [{ name: RouteNames.home as never }]
                });
            } catch (e: any) {
                setSignInError(e.toString())
            }
        }
    };

    const goToLogin = () => navigate(RouteNames.login as never)


    const onChangeName = (text: string): void => {
        setName(text);
        if (errors.name) {
            setErrors(prev => ({ ...prev, name: '' }));
        }
    };


    const onChangeEmail = (text: string): void => {
        setEmail(text);
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    const onChangePassword = (text: string): void => {
        setPassword(text);
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: '' }));
        }
    };

    return <SafeAreaView>
        <KeyboardAvoidingView behavior='padding' style={{}}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={commonStyles.title}>Sign Up</Text>
                    <Text style={commonStyles.error}>{signInError}</Text>
                    {/* Name Field */}
                    <Text style={commonStyles.subtitle}>Name</Text>
                    <TextInput
                        style={[commonStyles.input, errors.name ? styles.inputError : null]}
                        onChangeText={onChangeName}
                    />
                    {errors.name ? <Text style={styles.errorLabel}>{errors.name}</Text> : null}

                    {/* Email Field */}
                    <Text style={commonStyles.subtitle}>Email</Text>
                    <TextInput
                        style={[commonStyles.input, errors.email ? styles.inputError : null]}
                        onChangeText={onChangeEmail}
                    />
                    {errors.email ? <Text style={styles.errorLabel}>{errors.email}</Text> : null}

                    {/* Password Field */}
                    <Text style={commonStyles.subtitle}>Password</Text>
                    <View style={[[commonStyles.input, errors.password ? styles.inputError : null, { flexDirection: "row" }]]}>
                        <TextInput
                            style={{ flex: 1 }}
                            onChangeText={onChangePassword}
                            secureTextEntry={obsecure}
                        />
                        <TouchableOpacity style={{}} onPress={() => setObsecure(!obsecure)}>
                            <FontAwesome6 name={obsecure ? "eye-slash" : "eye"} color={colors.primary} size={20} />
                        </TouchableOpacity>
                    </View>

                    {errors.password ? <Text style={styles.errorLabel}>{errors.password}</Text> : null}

                    <TouchableOpacity onPress={onPressSignUp} style={commonStyles.button}>
                        <Text style={commonStyles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToLogin} style={styles.linkButton}>
                        <Text style={styles.linkText}>Go to Login</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
}


export default SignUp;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        flex: 1,
        gap: 10,
        paddingTop: 100
    },
    errorLabel: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginTop: -5,
    },
    inputError: {
        borderColor: 'red',
    },
    linkButton: {
        marginTop: 15,
        alignItems: 'center'
    },
    linkText: {
        // color: '#007AFF',
        // fontWeight: '600',
        textDecorationLine: 'underline',
        textDecorationColor: "black",
        textDecorationStyle: 'solid'
    }
});