import React, { Component } from 'react';
import { View, Text, FlatList, ToastAndroid, Button } from 'react-native';

import * as Constants from './constant/Constants';
//import * as Constants from '../src/constant/Constants';

export default class NavigationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }


  testFetch() {
    let timeStamp = Math.floor(Date.now() / 1000);    
    let url = Constants.URL + Constants.GET_PRODUCTS;    
    let ck = Constants.CLIENT_KEY;    
    let cs = Constants.CLIENT_SECRET;    
    let method = Constants.ENCRYPTION_METHOD;    
    let base_str = 'GET&' + encodeURIComponent(url) + '&' + encodeURIComponent('oauth_consumer_key=' + ck + '&oauth_nonce=' + timeStamp + '&oauth_signature_method='+ method + '&oauth_timestamp=' + timeStamp);    
    var hmacsha1 = require('hmacsha1');    
    var hash = hmacsha1(cs + '&' , base_str);    
    let urlFetch = url + '?oauth_consumer_key=' + ck + '&oauth_signature_method=' + method + '&oauth_timestamp=' + timeStamp + '&oauth_nonce=' + timeStamp + '&oauth_signature=' + hash
    console.log('NUEVOS MONITORES ARKUS')
    console.log(base_str);


    fetch(urlFetch, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        //alert(JSON.stringify(response));
        console.log(JSON.stringify(response))  ;
        
      })
      .catch((error) => {
        alert(error);
      });

  }

  componentDidMount(){
    this.testFetch;
    //this.testFetch.bind(this);
  }
  
  render() {
    return (
      <View>
        <Text> NavigationTest23062020 </Text>
        <Button
            onPress={this.testFetch}  
            title= 'Fetch'
            color= 'brown'        
        >
        </Button>

      </View>
    );
  }
}
