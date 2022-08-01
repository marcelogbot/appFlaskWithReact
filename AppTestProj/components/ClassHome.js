import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

export class ClassHome extends Component {

    state = {
        name:"Marcelo G Botelho"
    }

  render() {
    return (
        <View>
            <Text>Olá da Classe!</Text>
            <Text>{this.state.name}</Text>
            <Button title = "Clique aqui!" onPress={() => this.setState({name:"This is changed!"})}/>
        </View>

    )
  }
}

export default ClassHome
