import React, { useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {TextInput, Button} from 'react-native-paper'

function Edit(props) {

    const data = props.route.params.data;

    const [titulo, setTitulo] = useState(data.titulo)
    const [conteudo, setConteudo] = useState(data.conteudo)

    const editData = () => {
        fetch(`http://192.168.1.12:3000/update/${data.id}`, {
            method: 'PUT',
            headers: {
                'content-Type':'application/json'
            },
            body: JSON.stringify({titulo:titulo, conteudo:conteudo})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Início', {data:data})
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
            onPress={() => props.navigation.navigate('Detalhes',{data:data})}
            >Cancelar</Button>
            <Button 
            theme = {{roundness:10}}
            color = '#6495ed'
            style = {{margin:20, padding:10}}
            icon = "pencil"
            mode = "contained"
            onPress={() => editData()}
            >Alterar</Button>    
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
export default Edit
