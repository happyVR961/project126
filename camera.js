import * as React from "react"
import { Button, Image, Platform, View, StyleSheet } from "react-native"
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
export default class PickImage extends React.Component{
constructor(){
    super();
    this.state = {
        Image: null
    }
}
getPermissions=async()=>{
    if(Platform.OS !== "web"){
        const{status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status !== "granted"){
                alert("Sorry we need camera roll permissions!")
            }
    }
}
componentDidMount(){
    this.getPermissions()
}
        


pickImages=async()=>{
    try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.all(),
            allowsEditing: true 
        })
        if (!result.cancelled){
            this.setState({
                image: result.data
            })
            this.uploadImage(result.uri)
        }
    }
    catch(error){
        console.log("Error")
    }
}


uploadImage=async(uri)=>{
    const data = new FormData()
    let fileName = uri.split("/")[
        uri.split("/").length - 1
    ]
    let type =  `Image/${uri.split(".")[uri.split(".").length - 1]}`
    const filetoUpload = {
        uri: uri,
        name: fileName,
        type: type
    }
    data.append("digit", filetoUpload)
}

render(){
    return(
        <View>
            <Button title = "Pick  image from your camera roll"
            onPress = {
                this.PickImages()
            }/>
            </View>
    )
}

}

