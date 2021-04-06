import React, { useState } from 'react';
import { Button,View, FlatList, StyleSheet, Text, ScrollView, TouchableOpacity, StatusBar, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';


interface DataArray {
    id:number;
    dice:number;
    multplier:number;
    modifier:number;
    color:string;
    value:number[];
}

interface itemData {
    id:number;
    dice:number;
    multplier:number;
    modifier:number;
    color:string;
    value:number[];
}

interface titleData{
        id:number;
        dice:number;
        multplier:number;
        modifier:number;
        color:string;
        value:number[];
        
}

export default function Dados(){
        const [dice, setDice] = useState<string>('');
        const [totalDice, setTotalDice] = useState<number>(0);
        const [multplier, setMultplier] = useState<string>('1');
        const [modifier, setModifier] = useState<string>('+0');
        const [Data, setData] = useState<DataArray[]>([]);
        const [Tamanho, setTamanho] = useState<number>(100);
        const [TamanhoTotal, setTamanhoTotal] = useState<number>(40);
        const [Id, setId] = useState<number>(0);
        
        
        
        function changeData(id:any, max:number, multplier:number){
            let newDate = Data.slice();
            let valor = [];
            for (let i=0; i<multplier; i++){
                valor.push(getRandomIntInclusive(1,max));
            }
            newDate[id] = {
                id:newDate[id].id, 
                dice:newDate[id].dice,
                multplier:newDate[id].multplier,
                modifier:newDate[id].modifier,
                color:newDate[id].color, 
                value:valor
            }; 
            setData(newDate);
        }

        function format(array:number[]){
            let texto = '';
            for(var i=0;i<array.length;i++){
                texto += ' '+array[i]+ ' ';
            }
            return texto;
        }

        function remove(id:number){
            let newDate = Data.slice();
            newDate.splice(id,1);
            for(let i=0; i< newDate.length;i++){
                newDate[i] = {
                    id:i, 
                    dice:newDate[i].dice,
                    multplier:newDate[i].multplier,
                    modifier:newDate[i].modifier, 
                    color:newDate[i].color,
                    value:newDate[i].value
                };
            }
            setData(newDate);
        }

        const Item = ({title}:{title: titleData}) => (
        <View>
            <TouchableOpacity onLongPress={()=>{remove(title.id); chargeBoxLenght(); somarTotal();}}  
            onPress={()=>{changeData(title.id, title.dice, title.multplier); somarTotal();}}>

                <View style={
                    {
                    backgroundColor:title.color, 
                    marginVertical: 4,
                    marginHorizontal: 4,
                    width:90,
                    height:90
                    }
                }>
                    <Text style={styles.title}>{title.multplier+'d'+ title.dice}</Text>
                    <Text>{format(title.value)}</Text>
                </View >

                <View style={styles.itemModifier}>
                    <Text>{title.modifier < 0?(''+title.modifier) : ('+'+title.modifier)}</Text>
                </View>

            </TouchableOpacity>
        </View>
        );

        const renderItem = ({ item }:{item: itemData}) => (
            <Item title={item} />
        );


        const renderTotal = ({ item }:{item: itemData}) => (
            <ItemTotal title={item} />
        );

        const ItemTotal = ({title}:{title: titleData}) => (
            <View style={
                {
                backgroundColor:title.color, 
                marginVertical: 4,
                marginHorizontal: 4,
                width:40,
                height:30
                }
            }>
                <Text>{somar(title.value)+title.modifier}</Text>
            </View>
        );
        
        function somar(array:number[]){
            if (array.length > 0){
                const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue;
                return array.reduce(reducer);
            }else{
                return 0;
            }
        }
        function somarTotal(){
            let total = 0;
            for(let i=0;i<Data.length;i++){
                total += somar(Data[i].value) + Data[i].modifier;
            }
            setTotalDice(total);
        }



        let addToListCount = 0
        function addToList(diceValue:number, multplier=1, modifier=1) {
            addToListCount++;
            var color = require('randomcolor');
            Data.push({
                id:Data.length, 
                dice:diceValue,
                multplier:multplier,
                modifier:modifier,
                color:color(),
                value:[]
            });
            setData([...Data]);
            chargeBoxLenght();
            setId(Id+1);
          }

        function chargeBoxLenght(){
                setTamanho((Math.ceil(Data.length/4))*100);
                setTamanhoTotal((Math.ceil(Data.length/8))*40)
        }


        function getRandomIntInclusive(min=1, max:number) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        const styles = StyleSheet.create({
            flatlist:{
                minWidth:390,
                minHeight:100,
                height: Tamanho,
                borderColor:'black',
                borderStyle:'solid',
                borderWidth: 1
            },
            flatlistTotal:{
                minWidth:390,
                minHeight:31,
                height: TamanhoTotal,
                borderColor:'black',
                borderStyle:'solid',
                borderWidth: 1
            },
            buttomContainer:{
                paddingTop:10,
                paddingBottom:10
            },
            container: {
                paddingTop:20,
                alignItems:'center'
            },
            itemModifier:{
                position:'absolute',
                bottom:10,
                right:10,
            },
            title: {
                fontSize: 25,
            },
            box:{
                borderBottomWidth:1,
                width:30,
                height:20,
            },
            selectBox:{

                width:90,
                height:30
            },
            boxContainer:{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                resizeMode:'center'
            },
            textContainer:{
                flexDirection:'row'
            },
            text:{
              paddingRight:5,
              paddingLeft:5
            }
            });

    return(
        <ScrollView>
            <StatusBar backgroundColor={"#000000"}/>
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <Text style={styles.text}>Multiplicador:</Text>
                    <Picker
                        style={styles.selectBox}
                        selectedValue={multplier}
                        onValueChange={(valor) => {setMultplier(valor)}}>
                        <Picker.Item label="x1" value="1" />
                        <Picker.Item label="x2" value="2" />
                        <Picker.Item label="x3" value="3" />
                        <Picker.Item label="x4" value="4" />
                        <Picker.Item label="x5" value="5" />
                        <Picker.Item label="x6" value="6" />
                        <Picker.Item label="x7" value="7" />
                        <Picker.Item label="x8" value="8" />
                        <Picker.Item label="x9" value="9" />
                        <Picker.Item label="x10" value="10" />
                    </Picker>
                    <Text style={styles.text}>Dado:</Text>
                    <TextInput style={styles.box} keyboardType='numeric' value={dice} 
                    onChangeText={(valor) => {setDice(valor)}}/>
                    <Text style={styles.text}>Modificador:</Text>
                    <TextInput style={styles.box} keyboardType='numeric' value={modifier} 
                    onChangeText={(valor) => {setModifier(valor)}}/>

                </View>
                
                <View style={styles.flatlist}>
                    <FlatList
                    data={Data}
                    renderItem={renderItem}
                    keyExtractor={(item)=>{item.id}}
                    numColumns={4}
                    />
                </View>
                <View style={styles.buttomContainer}>
                    <Button title="Adicionar dado" 
                    onPress={()=>{
                        if(dice!=''){
                            addToList(parseInt(dice, 10),
                            parseInt(multplier, 10), 
                            parseInt(modifier,10))
                        }
                        else{
                            alert('Digite ao menos um número!')
                            }
                        }
                    }/>
                </View>

                <View style={styles.flatlistTotal}>
                    <FlatList
                    data={Data}
                    renderItem={renderTotal}
                    keyExtractor={(item)=>{item.id}}
                    numColumns={8}
                    />
                </View>

                <Text>{'Total: ' + totalDice}</Text>

            </View>
        </ScrollView>
    );
}

