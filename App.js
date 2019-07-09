import React from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props){ //Se prvi ocitava
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {  //Se ocitava poslednji
    return fetch('https://facebook.github.io/react-native/movies.json').then((response) => response.json()).then((responseJson) => {  
        this.setState({  
            isLoading: false,  
            dataSource: responseJson.movies,  
        }, function() {});  
    }).catch((error) => {  
        console.error(error);  //Kada dobavljamo podatke iz APIa treba uvek da hvatamo greske
    });  
}  

  _renderItem = ({
    item
  }) => ( 
          <MyListItem 
            id = {item.id}
            title = {item.title}
            description = {item.releaseYear}
          />
        );

  render() {
      if(this.state.isLoading){//If isLoading = true
        return ( 
                <View style = {{flex: 1, padding: 20}} >
                    <Text style = {styles.welcome}>
                      Loading
                    </Text>
                    <ActivityIndicator /> 
                </View>
               );
      }

      return( 
              <View>
                <Text style = {styles.welcome}>
                  Welcome
                </Text>
                <FlatList data = {this.state.dataSource}
                          renderItem = {this._renderItem}
                />
              </View>
           );   
  }
}

class MyListItem extends React.PureComponent{
  state = { counter : 1}

  updateState = () => 
    this.setState({counter: this.state.counter + 1})

  _onPress = () => 
    this.props.onPressItem(this.props.id);
  



  render(){
    return (
              <TouchableOpacity onPress = {this.updateState} >
                <View style = {styles.listItemView}>
                  <Text style = {styles.headerText}>
                    {this.props.title}
                  </Text>
                  <Text style = {{color: 'black'}}>
                    {this.props.description}
                  </Text>
                  <Text style = {{color: 'black'}}>
                    Counter: {this.state.counter}
                  </Text>
                  <View style = {styles.dividerView} />
                </View>
              </TouchableOpacity>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'green'
  },
  listItemView: {
    padding: 5,
    flexDirection: 'column'
  },
  headerText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 20
  },
  dividerView: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
});
