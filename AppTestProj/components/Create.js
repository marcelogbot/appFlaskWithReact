import React, { useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {TextInput, Button} from 'react-native-paper'

function Create(props) {
    const [titulo, setTitulo] = useState("")
    const [conteudo, setConteudo] = useState("")

    const insertData = () => {
        fetch('http://192.168.1.12:3000/add', {
            method: 'POST',
            headers: {
                'content-Type':'application/json'
            },
            body: JSON.stringify({titulo:titulo, conteudo:conteudo})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Início')
        })
        .catch(error => console.log("Deu esse erro: ",error))
    }

  return (
    <View>
        <TextInput style = {styles.inputStyle}
        label = "Titulo"
        value = {titulo}
        mode = "outlined"
        onChangeText={text => setTitulo(text)}
        />
        <TextInput style = {{margin:15}}
        label = "Conteudo"
        value = {conteudo}
        mode = "outlined"
        multiline
        numberOfLines={10}
        onChangeText={text => setConteudo(text)}
        />
        <View style = {styles.viewBtnStyle}> 
            <Button 
            theme = {{roundness:10}}
            color = '#D18700'
            style = {{margin:20, padding:10}}
            icon = "cancel"
            mode = "contained"   
            onPress={() => props.navigation.navigate('Início')}
            >Cancelar</Button>
            <Button 
            theme = {{roundness:10}}
            color = '#6495ed'
            style = {{margin:20, padding:10}}
            icon = "pencil"
            mode = "contained"
            onPress={() => insertData()}
            >Incluir</Button>  
        </View>  
    </View>
  )
}

const styles = StyleSheet.create ({
    inputStyle: {
        margin:15,
        marginTop:30,
    },
    viewBtnStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 15,
        padding: 10,
    },
})

export default Create
