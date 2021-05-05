import React, { Component } from 'react';
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
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { SearchBar, ListItem, Input } from 'react-native-elements';//SearchBar 

import MyHeader from '../components/MyHeader';

export default class RequestPaintingScreen extends Component {
  constructor(props) {
    console.log("asdf", SearchBar)
    super(props);
    this.state = {
      search: '',
      userId: firebase.auth().currentUser.email,
      paintingName: '',
      reasonToRequest: '',
      IsPaintingRequestActive: '',
      requestedPaintingName: '',
      paintingStatus: '',
      requestId: '',
      userDocId: '',
      docId: '',
      Imagelink: '#',
      dataSource: '',
      requestedImageLink: '',
      showFlatlist: false,
      cost: '',
      artist: '',
    };
  }

  fetchImage = (imageName) => {
    var storageRef = firebase.storage().ref();
    db.collection('available_paintings');
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: '#' });
      });
  };
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  updateSearch = (search) => {
    this.setState({ search });
  };
  retreivePaintings() {
    try {
      var allPaintings = [];
      var paintings = db
        .collection('available_paitings')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allPaintings.push(doc.data());
            console.log(
              'These are the Paintings you can purchase - ',
              allPaintings
            );
          });
          this.setState({ allPaintings });
        });
    } catch (error) {
      console.log(error);
    }
  }
  searchFilter = () => {
    var dataSourceList = this.searchFilter(search, { allPaintings });
  };
  addRequest = async (paintingName, reasonToRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();

    db.collection('requested_paintings').add({
      user_id: userId,
      painting_name: paintingName,
      reason_to_request: reasonToRequest,
      request_id: randomRequestId,
      painting_status: 'requested',
      date: firebase.firestore.FieldValue.serverTimestamp(),
      image_link: paintings.data[0].volumeInfo.imageLinks.thumbnail,
    });

    await this.getPaintingRequest();
    db.collection('users')
      .where('email_id', '==', userId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            IsPaintingRequestActive: true,
          });
        });
      });

    this.setState({
      paintingName: '',
      reasonToRequest: '',
      requestId: randomRequestId,
    });

    return Alert.alert('Painting Requested Successfully');
  };

  receivedPaintings = (paintingName) => {
    var userId = this.state.userId;
    var requestId = this.state.requestId;
    db.collection('received_paintings').add({
      user_id: userId,
      painting_name: paintingName,
      request_id: requestId,
      paintingStatus: 'received',
    });
  };

  getIsPaintingRequestActive() {
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            IsPaintingRequestActive: doc.data().IsPaintingRequestActive,
            userDocId: doc.id,
          });
        });
      });
  }

  getPaintingRequest = () => {
    var paintingRequest = db
      .collection('users')
      .where('user_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().painting_status !== 'received') {
            this.setState({
              requestId: doc.data().request_id,
              requestedPaintingName: doc.data().painting_name,
              paintingStatus: doc.data().painting_status,
              requestedImageLink: doc.data().image_link,
              docId: doc.id,
            });
          }
        });
      });
  };
  getPaintingDetails = () => {
    collection('available_paintings')
      .where('painting_name', '==', this.state.paintingName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            paintingName: doc.data().painting_name,
            quantity: doc.data().quantity,
            cost: doc.data().cost,
            artist: doc.data().cost,
            paintingStatus: doc.data().painting_status,
            requestedImageLink: doc.data().image_link,
            docId: doc.id,
          });
        });
      });
  };

  sendNotification = () => {
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var username = doc.data().username;

          db.collection('all_notifications')
            .where('request_id', '==', this.state.requestId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var donorId = doc.data().donor_id;
                var paintingName = doc.data().painting_name;

                //targert user id is the donor id to send notification to the user
                db.collection('all_notifications').add({
                  targeted_user_id: donorId,
                  message: username + ' received the painting ' + paintingName,
                  notification_status: 'unread',
                  painting_name: paintingName,
                });
              });
            });
        });
      });
  };

  componentDidMount = () => {
    this.getPaintingRequest();
    this.getIsPaintingRequestActive();
  };

  updatePaintingRequestStatus = () => {
    db.collection('requested_paintings').doc(this.state.docId).update({
      painting_status: 'received',
    });

    //getting the  doc id to update the users doc
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            IsPaintingRequestActive: false,
          });
        });
      });
  };

  renderItem = ({ item, i }) => {
    let obj = {
      title: item.volumeInfo.title,
      selfLink: item.selfLink,
      buyLink: item.saleInfo.buyLink,
      imageLink: item.volumeInfo.imageLinks,
    };

    return (
      <TouchableHighlight
        style={styles.touchableopacity}
        underlayColor="#DDDDDD"
        onPress={() => {
          this.setState({
            PaintingName: item.volumeInfo.title,
          });
        }}
        bottomDivider>
        <Text> {item.volumeInfo.title} </Text>
      </TouchableHighlight>
    );
  };
  render() {
    const search = this.search;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <Text>some text</Text>
        <ScrollView style={styles.scrollView}>
          <FlatList
            data={this.state.allPaintings}
            renderItem={({ item }) => (
              <View>
                <View style={styles.imageContainer}>
                  <Image />
                </View>
                <View style={styles.paintingDetails}>
                  <Text style={styles.title}>{this.state.paintingName}</Text>
                  <Text style={style.cost}>
                    Cost of Painting: {this.state.cost}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.navigation.navigate(
                      'PaintingDetailsScreen'
                    )}>
                    <Text>See Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
});
