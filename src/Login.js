import React, { Component } from 'react';
import { View, Text, Button, TextInput, Keyboard, Alert, ToastAndroid } from 'react-native';

import {createAppContainer, NavigationActions} from 'react-navigation'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user_name: "",
        password: "",
    };
  }

  navegar(pantalla){
    this.props.navigation.navigate(pantalla);
  }

  valoresExample = () => {
    Keyboard.dismiss();
    const { user_name, password } = this.state;
    console.log(this.state.user_name)
    console.log(this.state.password)

    if (user_name.trim().length != 0 && password.trim().length != 0) 
    {
        fetch("http://192.168.33.10/loginApp",{
          method:'post',
          header: {
            'Accept':'application/json',
            'Content-type':'application/json'
          },
          body:JSON.stringify({
            login_email_address: user_name,
            login_password: password,
          })          
        })            
        .then((response) => response.json())              
        .then((responseJson) => {
          console.log(JSON.stringify(responseJson))
          if(responseJson.status == true)
          {

            ToastAndroid.showWithGravity(
              "You're IN",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            this.props.navigation.navigate('NavigationTest');
            
          }
          else
          {
            if(responseJson.error == 'PI')
            {                          
              ToastAndroid.showWithGravity(
                "Password is incorrect, please try again.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            }
            else
            {              
              ToastAndroid.showWithGravity(
                "No user found with this email address.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );              
            }
          }
        })
        .catch((error) => {
                ToastAndroid.showWithGravity(
                  "catch",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
          
        });
      } else
      {        
        ToastAndroid.showWithGravity(
          "Fill required fields or provide a valid email address.",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }

  }

  render() {
    return (
      <View>
        <Text> Hello Login </Text>

        <Button
            onPress={this.valoresExample}  
            title= 'LogIn'
            color= 'red'        
        >
        </Button>

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(user_name) =>
                this.setState({ user_name })
                }
            />

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(password) =>
                this.setState({ password })
                }
            />

      </View>
    );
  }
}
