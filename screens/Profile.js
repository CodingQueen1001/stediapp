
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView , Share, ScrollView, Button, Touchable, TouchableOpacity, CameraRoll} from 'react-native';
import { Card, CardTitle, CardContent} from 'react-native-material-cards';
import BarChart from 'react-native-bar-chart';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';

const cameraOptions={
  quality:0,
  exif:false
}

const Profile = (props) => {
  const [userName,setUserName] = useState("");
  const [cameraPermission, setCameraPermission] = useState(false)
  const[profilePhoto, setProfilePhoto] = useState(null);
  const cameraRef = UseRef(null);
  const[CameraReady, setCameraReady] = useState(false);
}

useEffect(()=>{
const getUserName = async ()=>{
  const cameraPermission = await Camera.requestCameraPermissionsAsync();
  const userName = await AsyncStorage.getItem('userName');
  setCameraPermission(cameraPermission);
  setUserName(userName);
  await AsyncStorage.removeItem('profilePhoto')
  const profilePhoto = await AsyncStorage.getItem('profilePhoto');
  setProfilePhoto(profilePhoto);

};
getUserName();

},[]);


const myCustomerShare = async() =>{
  const shareOptions = {
    message: 'This is a test'
  }
  try{
    const shareResponse = await Share.share(shareOptions)
    console.log(shareResponse);
    }
    catch(error){
console.log('Error', error)
    }
  }
      if(profilePhoto==null){
        return (
          <view style={styles.container}>
            <camera style={styles.camera} ref={cameraRef} onCameraReady={()=>{setCameraReady{true}}}>
            <view style={styles.buttonContanier}>
              {cameraReady?<TouchableOpacity style={styles.button} onPress={async ()=> {
              
              const picture = await cameraRef.current.takePictureAsync(cameraOptions);
              console.log('Picture', picture);
              await AsyncStorage.setitem('profile');
              setProfilePhoto(picture.uri);
              }}>
                <Text style={styles.text}>Take Picture</Text>
              </TouchableOpacity>: null}
          </view>
        </camera>
      </view>
        )

  const myCustomerShare = async() =>{
    const shareOptions = {
      message: 'This is a test'
    }
    try{
      const shareResponse = await Share.share(shareOptions)
      console.log(shareResponse);
      }
      catch(error){
  console.log('Error', error)
      }
    }
      }
  return (
    <SafeAreaView style={{flex: 1}}>
         <Card style={{backgroundColor:'white', borderRadius: 10, margin:20 ,width: 320, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4}}>
     <CardContent>
     <Image style={{height: 100, width:100, borderRadius: 75}}
      source={require('../image/me.jpg')} />
    <Text style={{marginTop:10,marginBottom:10,fontWeight: 'bold'}}>Sarah Romero</Text>

    <Text style={{marginTop:20,marginBottom:2}}>This Week's progress</Text>
{/* <BarChart barColor='green' data={data} horizontalData={horizontalData} /> */}
     <View style={{ marginTop: 50 }}>
      <Button onPress={myCustomerShare} title="Share" />
    </View>
    </CardContent>
    </Card>
 </SafeAreaView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  }
})
