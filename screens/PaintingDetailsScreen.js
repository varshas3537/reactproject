import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,
  Image,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { SearchBar, ListItem, Input } from "react-native-elements";

import MyHeader from "../components/MyHeader";

export default class PaintingDetailsScreen extends Component{
    constructor(){
        super();
        this.state = {
            paintingName: "",
            cost: "",
            quantity: "",
            artist: ""
        }
    }
    getPaintingDetails(){
        db.collection("available_paintings")
      .where("painting_name", "==", this.state.paintingName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          paintingName = painting_name,
          cost = cost,
          quantity = quantity,
          artist = artist
        });
      });
    };
    
    isEligibleToBuy(){
        if(quantity != 0){
            return(
                <TouchableOpacity
                style = {styles.button}>
                    <Text>Buy Now</Text>
                </TouchableOpacity>
            );
        }
    }

    ComponentDidMount(){
        this.getPaintingDetails();
    }

    render(){
        return(
            <View>
                <View style = {styles.image}>
                    <Image/>
                </View>
                <View style = {styles.details}>
                    <Text>{this.paintingName}</Text>
                    <Text>Cost: {this.state.cost}</Text>
                    <Text>Quantity: {this.state.quantity}</Text>
                    <Text>Artist: {this.state.artist}</Text>
                </View>
                <View>
                    isEligibleToBuy();
                </View>
            </View>
        );
    }
}