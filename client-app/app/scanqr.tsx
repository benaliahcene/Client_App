import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getTableById } from '@/api/tables';
import { alert } from '@/utils/alert';
import { useRouter } from 'expo-router';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean|null>(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    

    try{
    const table= await getTableById(data);
    console.log(table)
    console.log("NIKMOK",data)

    if(!table){
      alert("Table introuvable")
      return;
    }

    alert("Table trouvée")
    router.push('/app/menu/'+data)

  }catch(e){
    console.log(e)
  }


  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
        <Text className='text-black'>Scanner le QR de la Table :</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});