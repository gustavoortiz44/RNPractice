import React, { Component } from 'react';
import { View, Text, FlatList, ToastAndroid } from 'react-native';

export default class NavigationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }

  fetchData = async() => {
    
    fetch("http://itluma.com/wp-json/wc/v3/products",{
          method:'post',
          header: {
            'Accept':'application/json',            
            'Content-type':'application/json; charset=UTF-8'
          },
          body:JSON.stringify({
            'Consumer Key': 'ck_0dc52c14d952b11413af77c6b969149cc97f866e',
            'Consumer Secret': 'cs_7475adc4da4711639669c2d1fd3d875d64bf7169',
          })          
        })
        .then((response) => response.json())       
        .then((responseJson) => {
          console.log(JSON.stringify(responseJson)) 
          this.setState({
            data: responseJson
          })        
        })
        .catch((error) => {          
                ToastAndroid.showWithGravity(
                  "catch Error",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
          
        });  

        
  }

  componentDidMount(){
    this.fetchData();
  }

  render() {
    return (
      <View>
        <Text> NavigationTest </Text>
        <FlatList
        data={this.state.data}
        keyExtractor={(x,i)=>i}
        renderItem={({item}) => 
        <View>
          <Text>{item.name.rendered}</Text>
          </View>
        }
        />

      </View>
    );
  }
}
