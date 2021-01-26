import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal } from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      first_name : '',
      last_name : '',
      address: '',
      phone_number : '',
      user_name : '',
      isModalVisible: 'false'
     
    }
  }
  showModal = () => {
    return(
      <Modal
      transparent = {true}
      visible = {this.state.isModalVisible}>
        <View>
          <Text style = {styles.ModalTitle}>Registration</Text>
          <TextInput
          style = {styles.formText}
          placeholder = {'first_name'}
          maxLength = {10}
          onChangeText = {(text) => {
            this.setState({
              first_name: text
            })
          }}></TextInput>
          <TextInput
          style = {styles.formText}
          placeholder = {'last_name'}
          maxLength = {10}
          onChangeText = {(text) => {
            this.setState({
              last_name: text
            })
          }}></TextInput>
           <TextInput
          style = {styles.formText}
          placeholder = {'address'}
          multiline = {true}
          onChangeText = {(text) => {
            this.setState({
              address: text
            })
          }}></TextInput>
          <TextInput
          style = {styles.formText}
          placeholder = {'phone_number'}
          maxLength = {10}
          keyboardType = {'numeric'}
          onChangeText = {(text) => {
            this.setState({
              phone_number: text
            })
          }}></TextInput>
           <TextInput
          style = {styles.formText}
          placeholder = {'user_name'}
          maxLength = {10}
          onChangeText = {(text) => {
            this.setState({
              user_name: text
            })
          }}></TextInput>
          
        </View>
      </Modal>
    )
  }
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password) =>{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      return Alert.alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
  }


  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <SantaAnimation/>
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.cancelButton}
          onPress = {() => this.setState({"isModalVisible" : false})}>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center',
  },
  ModalTitle:{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  cancelButton:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  formText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  }
})
