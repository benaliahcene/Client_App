import { Button, Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
// import { Text, View } from '@/components/Themed';
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "@/api/categories";
import { MaterialIcons } from "@expo/vector-icons";
import { alert } from "@/utils/alert";
import { useRoute } from "@react-navigation/native";
import { getArticles } from "@/api/articles";
import { getRestaurantWithUserId } from "@/api/restaurants";
import { getTableById } from "@/api/tables";
import useCartStore from "@/store/cart";
import useDataStore from "@/store/data";

export default function TabOneScreen() {

  const route=useRoute()

  const { items, addItem, removeItem, clearCart } = useCartStore();
  const {table,setTable} = useDataStore()

  const tableId= route.params?.tableId || ""

  const [users, setUsers] = useState([]);
  // const [table, setTable] = useState<any>([]);
  const [resto, setResto] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [articles, setArticles] = useState<any>([]);

useEffect(() => {
    const fetchData = async () => {
        const table = await getTableById(tableId);
        setTable(table);
        const unsubscribe1 = getCategories(table?.userId,setCategories);
        const unsubscribe2 = getArticles(table?.userId,setArticles);
        const unsubscribe3 = getRestaurantWithUserId(table?.userId,setResto);

        return () => {
            unsubscribe1();
            unsubscribe2();
            unsubscribe3();
        };
    };

    fetchData();
}, []);


  
  // Render your categories here
  const addToCart = (article: any) => {
    addItem(article?.id,article?.name,article?.price)
    alert("Article ajouté au panier")
    console.log(items)
  }

  return (
    <View style={styles.container} className="p-5">
      <ScrollView className="flex-1 w-full  center py-10 space-y-10">
        <View className=" w-full flex flex-row justify-between items-center">
        <Text className="text-3xl font-bold" >{table?.name}</Text>

        </View>
        <View>
          
          <View className="w-full mx-auto ">
            {/* categories with articles in them */}

            <Text className="text-2xl font-bold">Categories</Text>
            
            {categories.map((category: any, index: number) => (

              <View className="my-10 ">
                <Text className="font-bold text-xl">{category.name}</Text>

                <View>
                  {articles.map((article: any, index: number) => (
                    <View className="my-3  flex flex-col justify-center items-center">
                      {article.category?.id === category.id && (
                        <>
                          <View className="flex flex-row w-3/4 items-center py-6 gap-x-10 ">
                          <Text className="text-lg flex-1">{article.name}</Text>
                          <Text className="text-lg">{article.price} DA</Text>
                          </View>

                          <Pressable
                                    className="p-2 bg-red-500 text-center text-white  "
                                    onPress={() => addToCart(article)}
                                    >
                                      <MaterialIcons name="add" size={24} color="white" />
                                    </Pressable>
                        </>
                      )}
                    </View>
                  ))}

                </View>


                </View>

            ))}

            

          </View>

          {/* <ScrollView>
            {categories.map((category: any, index: number) => (
              <Pressable
                key={index}
                className="active:bg-gray-200 transition w-full py-5 border-b-[0.5px] border-gray-300 px-10 flex flex-row justify-between"
              >
                <Text>{category.name}</Text>

                <View className="flex flex-row gap-4">
                  <MaterialIcons name="edit" size={24} color="black" />
                  </View>
              </Pressable>
            ))}
          </ScrollView> */}
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
