import React from 'react'
import {View, ScrollView, Text, StyleSheet, Alert} from 'react-native'
import {Button} from 'react-native-paper'
import Moment from 'moment'

function Details(props) {
    const data = props.route.params.data;

    const editData = () => {
        props.navigation.navigate("Editar",{data:data})
    }

    const deleteData = (data) => {
        
        Alert.alert(
            "O artigo será excluido!",
            'Tem certeza que deseja exluir o artigo?',
            [{
                text: "Cancelar",
                onPress: () => "",
                style:"cancel"
            },
            {
                text:"Excluir",
                onPress: () => 
                    fetch(`http://192.168.1.12:3000/delete/${data.id}/`, {
                        method: 'DELETE',
                        headers: {
                            'content-Type':'application/json'
                        },
                    })
                    .then(data => {
                    props.navigation.navigate('Início')
                })
                .catch(error => console.log("Deu esse erro: ",error))
            }]
        ) 
    }

  return (
    <ScrollView >
        <View style = {styles.viewStyle}> 
            <View style = {styles.viewBtnStyle}>
                <Button 
                theme = {{roundness:10}}
                color = '#D18700'
                style = {{margin:10, padding:0}}
                icon = "arrow-left-bold"
                mode = "contained"   
                onPress={() => props.navigation.navigate('Início')}
                >Voltar</Button>
                <Button 
                theme = {{roundness:10}}
                color = '#DF362D'
                style = {{margin:10, padding:0}}
                icon = "delete"
                mode = "contained"   
                onPress={() => deleteData(data)}
                >Excluir</Button> 

                <Button 
                theme = {{roundness:10}}
                color = '#6495ed'
                style = {{margin:10, padding:0}}
                icon = "update"
                mode = "contained"
                onPress={() => editData()}
                >Editar</Button>   
            </View>
            <View style = {styles.viewContentStyle}>
                <Text style = {styles.tituloStyle}>
                    {data.titulo}
                </Text>
                <Text style = {styles.dataStyle}>
                    {Moment(data.data).format('DD-MMM-YY HH:mm')}
                </Text>
                <Text style = {styles.conteudoStyle}>
                    {data.conteudo}
                </Text>
            </View>  
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create ({
    viewStyle: {
        padding:10,
        paddingTop:0,
        margin:10,
        marginHorizontal:10,
        marginTop:0,
    },
    viewContentStyle: {
        backgroundColor:'#ffffff',
        borderRadius:10,
        padding:10,
    },
    tituloStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    conteudoStyle: {
        fontSize: 20,
        textAlign: 'left',
        marginTop: 10,
    },
    dataStyle: {
        fontSize: 10,
        color: '#888888',
        textAlign: 'left',
        margin: 10,
    },
    viewBtnStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 0,
        marginBottom:0,
        marginTop:0,
        padding: 0,
    },
})

export default Details
