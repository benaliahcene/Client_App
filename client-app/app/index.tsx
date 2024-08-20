import EditScreenInfo from "@/components/EditScreenInfo";
// import { Text, View } from '@/components/Themed';
import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, useRouter } from "expo-router";

export default function TabOneScreen() {
  const router = useRouter();
  const { user } = useAuth();
  // if (!user) {
  //   router.push("/login");
  //   return;
  // }
  if (user) {
    return <Redirect href="/home" />;
  }

  return (

    <View style={styles.container}>
    <View style={styles.innerContainer} className="space-y-10">
      <Text className="text-center" style={styles.title}>Bienvenue a l'application de client!</Text>
      <Pressable 
                className="flex flex-row justify-center w-46 border border-solid text-white  border-gray-300 rounded-md p-4 bg-red-500  cursor-pointer"

        onPress={() => router.push("/scanqr")} 
      ><Text className="text-white">Scanner QR maintenant</Text></Pressable>
     
      <StatusBar style="auto" />
    </View>
  </View>

  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
