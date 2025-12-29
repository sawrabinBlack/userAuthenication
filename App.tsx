import RootNavigation from "./src/navigation/rootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/authContext";

const App = () => {

  return <SafeAreaProvider>
    <NavigationContainer>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </NavigationContainer>

  </SafeAreaProvider>

}

export default App;