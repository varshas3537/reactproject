import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";
import {DrawerItems} from "react-navigation-drawer";
import {Avatar} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import db from "../config";
import {Icon} from "react-native-elements"
import {RFValue} from "react-native-responsive-fontsize"

export default class CustomSideBarMenu extends Component{
    state = {
        userId: firebase.auth().currentuser.email,
        image : "#",
        paintingName : "",
        quantity : "",
        cost: "",
        artist: "",
        docId: "",
        moreQuantity: ""
    };

    selectPicture = async () =>{
        const{cancelled,uri} = await ImagePicker.lauchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
        if(!cancelled){
            this.uplaodImage(uri,this.state.userId)
        }
    };

    uploadImage = async(uri,imageName) =>{
        var response = await fetch(uri);
        var blob = await response.blob();

        var ref = firebase
        .storage()
        .ref()
        .child("available_paintings/" + imageName);
        return ref.put(blob).then((response) =>{
            this.fetchImage(imageName);
        });
    };

    
    addInfoToDb = () =>{
        db.collection("available_paintings").add({
            paintingname: this.state.paintingname,
            quantity: this.state.quantity,
            cost: this.state.cost,
            artist: this.artist
        })
    };
    getInfoFromDb = () =>{
        db.collection("available_paintings/")
        .where("painting_name", "==", paintingName)
        .get()
        .then()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection("available_paintings").doc(doc.id).update({
              quantity : moreQuantity + quantity
            });
          });
        }); 
    }

    render(){
        return(
            <View>
                <View style = {{flex: 1}}>
                    <TouchableOpacity
                    style = {styles.button}
                    onPress ={() => {
                        <View>
                        <View
                        style = {{
                        flex: 0.3,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#00FFEF",
                        }}>
                        <Avatar
                        source = {{
                            uri: this.state.image,
                        }}
                        size = {"xlarge"}
                        onPress = {() => this.state.selectPicture()}
                        showEditButton
                        />
                        <Text
                        style={{
                            fontWeight: "300",
                            fontSize: RFValue(20),
                            color: "#fff",
                            padding: RFValue(10),
                        }}
                        >
                        {this.state.name}
                        </Text>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <DrawerItems {...this.props} />
                    </View>
                    <View style = {styles.form}>
                        <Text>Name of Painting:</Text>
                        <TextInput
                            style={styles.loginBox}
                            placeholder = "Example: Starry Night"
                            placeholderTextColor="gray"
                            onChangeText={text => {
                            this.setState({
                                paintingname: text
                            });
                            }}
                        />
                        <Text>Quantity:</Text>
                        <TextInput
                            style={styles.loginBox}
                            placeholder = "Example: 2"
                            placeholderTextColor="gray"
                            keyboardType = "numeric"
                            onChangeText={text => {
                            this.setState({
                                quantity: text
                            });
                            }}
                        />
                        <Text>Cost in rupees:</Text>
                        <TextInput
                            style={styles.loginBox}
                            placeholder = "Example: 500"
                            placeholderTextColor="gray"
                            keyboardType = "numeric"
                            onChangeText={text => {
                            this.setState({
                                cost: text
                            });
                            }}
                        />
                        <Text>Artist: </Text>
                        <TextInput
                            style={styles.loginBox}
                            placeholder = "Example: khushi bansal"
                            placeholderTextColor="gray"
                            onChangeText={text => {
                            this.setState({
                                artist: text
                            });
                            }}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                        style = {styles.confirmButton}
                        onPress ={() =>{
                            this.addInfoToDb;
                        }}>
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    }}
                >
                        <Text>Uplaod New Painting</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{flex: 1}}>
                    <TouchableOpacity
                    style = {styles.button}
                    onPress ={() =>{
                        <View style = {{flex: 1}}>
                            <Text>Name of painting of which quantity should be updated:</Text>
                            <TextInput
                                style={styles.loginBox}
                                placeholder = "Example: Starry Night"
                                placeholderTextColor="gray"
                                onChangeText={text => {
                                this.setState({
                                    paintingname: text
                                });
                                }}
                            />
                            <Text>More quantity:</Text>
                            <TextInput
                                style={styles.loginBox}
                                placeholder = "Example: 2"
                                placeholderTextColor="gray"
                                onChangeText={text => {
                                this.setState({
                                    moreQuantity: text
                                });
                                }}
                            />
                            <TouchableOpacity
                            style = {styles.confirmButton}
                            onPress = {() =>{
                                this.getInfoFromDb;
                            }}>
                                <Text>Confirm;</Text>
                            </TouchableOpacity>
                        </View>
                    }}>
                        <Text>Add Quantity</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  form:{

  },
  button: {

  },
  loginBox: {

  },
  confirmButton: {
    
  }
})