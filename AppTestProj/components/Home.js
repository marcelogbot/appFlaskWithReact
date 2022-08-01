

import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Button, FlatList} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import {Card, FAB} from 'react-native-paper'


function Home(props) {

  const [data, setData] = useState([])
  const [loading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)

  const loadData = () => {
    fetch('http://192.168.0.102:3000/get', {
        method:'GET'
    })
    .then(resp => resp.json())
    .then(artigo => {
        setData(artigo)
        console.log(artigo)
        setIsLoading(false)
        setCount(artigo.length)
    })
    .catch(error => console.log(error))
  }

 /* useFocusEffect(
      useCallback(() => {
          loadData()
      })
  )
  */
  useEffect(() => {
    loadData()

  }, [])

  const clickedItem = (data) => {
      props.navigation.navigate('Detalhes',{data:data})
  }

  const renderData = (item) => {
      console.log('Dados: '+item)
      return (
          <Card style = {styles.cardStyle}
          theme = {{roundness:10, colors:{surface:'#fff8dc'}}}
           onPress = {() => clickedItem(item)}>
            <Text numberOfLines={1} style = {{fontSize:22}} >{item.titulo}</Text>
            <Text numberOfLines={1}>{item.conteudo}</Text>
          </Card>
      )
  }


    useFocusEffect(
        React.useCallback(() => {
        //alert('Screen was focused');
        loadData()
        
        return () => {
            //alert('Screen was unfocused');
            // Do something when the screen is unfocused
            // Useful for cleanup functions
        };
        }, [])
    );

  return (
      <View style = {{flex:1}}>
          <View style = {{alignItems:'center', backgroundColor:'#cccccc'}}>
              <Text style = {{fontSize:20, fontWeight:'bold',padding:5, color:'#222222'}}>Total de artigos = {count}</Text>
          </View>
          <FlatList
              data = {data}
              renderItem = {({item}) => {
                  return renderData(item)
              }}
              onRefresh = {() => loadData()}
              refreshing = {loading}
              keyExtractor = {item => `${item.id}`}
          />
          
          <FAB 
          style = {styles.fab} 
          small={false}
          icon="plus"
          color='#333333'
          iconMode = 'dynamic'
          theme = {{colors:{accent:'#6495ed'}}}
          onPress = {() => props.navigation.navigate('Novo')} />
      </View>
  )
}

const styles = StyleSheet.create({
    cardStyle: {
        marginTop:10,
        marginHorizontal:20,
        padding:20,
        alignContent:"space-around",
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});

export default Home
