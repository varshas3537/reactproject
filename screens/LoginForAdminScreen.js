import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default class LoginForAdminScreen extends Component{
  constructor(){
    super();
    this.state = {
      emailId: "",
      password: ""
    };
  }
  checkEmailIdAndPassword(){
    if ((emailId === "khushi2020b@gmail.com")&&(password === "#kb123")){
      this.props.navigation.navigate("AdminScreen");
    }
    else{
      return Alert.alert("You are not authorized to login. Only admins can login through here")
    }
  }
  render(){
    return(
      <View style = {styles.form}>
        <View style={styles.TextInput}>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            placeholderTextColor="gray"
            keyboardType="email-address"
            onChangeText={text => {
              this.setState({
                emailId: text
              });
            }}
          />
          <TextInput
            style={[styles.loginBox, { marginTop: RFValue(15) }]}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor="gray"
            onChangeText={text => {
              this.setState({
                password: text
              });
            }}
          />
        </View>
        <View style={{ flex: 0.5, alignItems: "center" }}>
          <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.checkEmailIdAndPassword();
          }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}