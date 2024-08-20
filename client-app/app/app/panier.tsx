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
import { createCommande, updateCommande } from "@/api/commandes";

export default function TabOneScreen() {

  const route=useRoute()

  const { items, addItem, removeItem, clearCart,orderId,setOrderId } = useCartStore();

  const {table,setTable} = useDataStore()

  const [cartData, setCartData] = useState<any>([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log(items)


    setCartData(Object.values(items) || [])
    let total = 0;
    Object.values(items).map((item: any) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
   
}, [items]);


const submitOrder = async () => {
  const tableId= table?.id
  
  const order = {
    items: cartData,
    total: total,
    userId: table?.userId,
    tableName: table?.name,
  };

  console.log(order);

  try{

  if(orderId){
    updateCommande(orderId,order)
    alert("Commande modifiée")
    return;
  }
  const commande =await createCommande(tableId, order);
  alert("Commande passée")

  setOrderId(commande)


}catch(e){
  console.log(e)

}

  
}
  
  // Render your categories here

  return (
    <View style={styles.container} className="p-5">
      <ScrollView className="flex-1 w-full  center py-10 space-y-10">
        <View className=" w-full flex flex-row justify-between items-center">

        </View>
        <View>
          
          <View className="w-full mx-auto ">
            {/* categories with articles in them */}

            <Text className="text-2xl font-bold">Panier {table?.name}</Text>
            
            <View className="flex flex-row w-full items-center py-6 ">
                          <Text className="text-md flex-1 text-center ">Article</Text>
                          <Text className="text-md flex-1 text-center">Prix</Text>
                          <Text className="text-md flex-1 text-center"> Quantité</Text>
                          <Text className="text-md flex-1 text-center"> Total</Text>
                          </View>
                <View>
                  {cartData.map((article: any, index: number) => (
                    <View className="my-3  flex flex-col justify-center items-center">
                        <>
                          <View className="flex flex-row w-full items-center py-6 ">
                          <Text className="text-md flex-1 text-center ">{article.name}</Text>
                          <Text className="text-md flex-1 text-center">{article.price} DA</Text>
                          <Text className="text-md flex-1 text-center"> {article.quantity}</Text>
                          <Text className="text-md flex-1 text-center"> {article.quantity * article.price} DA</Text>
                          </View>

                        </>
                    </View>
                  ))}

                </View>
                <View className="flex flex-row w-full items-center py-6 justify-end px-10 ">
                          <Text className="text-md"> Total: {total} DA</Text>
                </View>


                </View>




                <Pressable
                                    className="p-2 bg-red-500 text-center text-white flex flex-row justify-center py-4 "
                                    onPress={() => submitOrder()}
                                    >
                                     <Text className="text-white ">{orderId ? "Commander Plus" : "Passer La Commande"}</Text>
                                    </Pressable>
            


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
