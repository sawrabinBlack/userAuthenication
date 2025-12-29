import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteNames } from "./routes";
import Home from "../screens/Home";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import { useAuth } from "../context/authContext";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator()

const RootNavigation = () => {

    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (

            <Stack.Screen name={RouteNames.home} component={Home} />
        ) : (

            <>
                <Stack.Screen name={RouteNames.login} component={Login} />
                <Stack.Screen name={RouteNames.signUp} component={SignUp} />
            </>)}
    </Stack.Navigator>
}

export default RootNavigation;