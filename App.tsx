import React, { useEffect, useState } from 'react';
import { Button,View, FlatList, Text, ScrollView, TouchableOpacity, StatusBar, TextInput, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
//import {AdMobBanner} from 'expo-ads-admob';
import EStyleSheet from 'react-native-extended-stylesheet'
import {styles} from './styles/styles'

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


export default function Apps(){
        const [dice, setDice] = useState<string>('');
        const [totalDice, setTotalDice] = useState<number>(0);
        const [multplier, setMultplier] = useState<string>('1');
        const [modifier, setModifier] = useState<string>('+0');
        const [Data, setData] = useState<DataArray[]>([]);
        const [Id, setId] = useState<number>(0);

        function format(array:number[]){ //Formata dados do array valor para ser exibido no dado 
            let texto = '';
            for(var i=0;i<array.length;i++){
                texto += ' '+array[i]+ ' ';
            }
            return texto;
        }

        function remove(id:number){ //remove um item do Array Data apartir de um id e reordena redefinindo cada id 
            let newDate = Data.slice();
            newDate.splice(id,1);
            for(let i=id; i< newDate.length;i++){
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

        const Item = ({title}:{title: titleData}) => ( //Objeto correspondente a cada item no Array Data exibido na primeira caixa
        <View>
            <TouchableOpacity onLongPress={()=>{remove(title.id);}}  
            onPress={()=>{changeData(title.id, title.dice, title.multplier);}}>

                <View style={[EStyleSheet.create({backgroundColor:title.color}), styles.dice]}>
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
            <Item key={item.id} title={item} />
        );


        const renderTotal = ({ item }:{item: itemData}) => (
            <ItemTotal title={item} />
        );

        const ItemTotal = ({title}:{title: titleData}) => ( //Objeto correspondente a cada item no Array Data exibido na segunda caixa
            <View style={[EStyleSheet.create({backgroundColor:title.color}), styles.diceTotal]}>

                <Text>{somar(title.value)+title.modifier}</Text>

            </View>
        );
        
        function somar(array:number[]){ //Soma dos itens de um array de números  utilizando reduce
            if (array.length > 0){
                const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue;
                return array.reduce(reducer);
            }else{
                return 0;
            }
        }
        function somarTotal(){ //soma total de todos os vetores correspondente ao array valor do array Data 
            let total = 0;
            for(let i=0;i<Data.length;i++){
                total += somar(Data[i].value) + Data[i].modifier;
            }
            setTotalDice(total);
        }



        function addToList(diceValue:number, multplier=1, modifier=1) {//Adiciona novos itens ao array Data
            let cor = '#';
            for(let i=0;i<6;i++){
                cor = cor+(Math.floor(Number(Math.random()*16))).toString(16);
            }


            Data.push({
                id:Data.length, 
                dice:diceValue,
                multplier:multplier,
                modifier:modifier,
                color:cor,
                value:[]
            });

            setData([...Data]);
            setId(Id+1);
          }


        function getRandomIntInclusive(min=1, max:number) { // gera valores aleatórios de um intervalo definido
            min = Math.ceil(min);
            max = Math.floor(max);
            return(Math.floor(Math.random() * (max - min + 1)) + min);
        }


        function rollAll(){
            let newDate = Data.slice();
            for(let i =0 ; i < newDate.length; i++){
                let valor = [];
                for (let x=0; x< newDate[i].multplier; x++){
                    valor.push(getRandomIntInclusive(1,newDate[i].dice))
                }
                newDate[i] = {
                    id:newDate[i].id, 
                    dice:newDate[i].dice,
                    multplier:newDate[i].multplier,
                    modifier:newDate[i].modifier,
                    color:newDate[i].color, 
                    value:valor
                };  
            }
            setData(newDate);
        }


        function changeData(id:number, max:number, multplier:number){ //Altera os dados de um determinado item no Array
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

            useEffect(()=>{
                somarTotal()
            },[Data])

            
            function cleanAll(){
                    Alert.alert(
                    "Alert!",
                    "Do you really want to clean?",
                    [
                        {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "OK", onPress: () => setData([])}
                    ]
                    );
                }

    return(
        <View style={styles.container}>
            <StatusBar hidden/>
        
            {//<AdMobBanner
            //        bannerSize="smartBannerPortrait"
            //        adUnitID="ca-app-pub-3822540147173906/9612988686" //'ca-app-pub-3940256099942544/6300978111' Test ID, Replace with your-admob-unit-id
            //        servePersonalizedAds={true} // true or false
            //onDidFailToReceiveAdWithError={()=> Alert.alert("Turn on the Wi-Fi/Roaming for suport the creator plz! :(")}/>
            }
        <ScrollView>
            
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <Text style={styles.text}>Multiplier:</Text>
                    <Picker
                        style={styles.selectBox}
                        selectedValue={multplier}
                        onValueChange={(valor) => {setMultplier(String(valor))}}>
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
                    <Text style={styles.text}>Dice:</Text>
                    <TextInput style={styles.box} keyboardType='numeric' value={dice} 
                    onChangeText={(valor:string) => {setDice(valor)}}/>
                    <Text style={styles.text}>Modifier:</Text>
                    <TextInput style={styles.box} keyboardType='numeric' value={modifier} 
                    onChangeText={(valor:string) => {setModifier(valor)}}/>

                </View>
                <View style={styles.flatlist}>
                    <ScrollView >
                        <FlatList
                        data={Data}
                        renderItem={renderItem}
                        numColumns={4}
                        />
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button 
                            title="Clean All" 
                            onPress={()=>{ cleanAll()}
                        }/> 
                    </View>
                    <View style={styles.button && {width:130}}>
                    <Button 
                    title="Add Dice" 
                    onPress={()=>{
                        if(dice!=''){
                            addToList(parseInt(dice, 10),
                            parseInt(multplier, 10), 
                            parseInt(modifier,10))
                        }
                        else{
                            Alert.alert('Type at least one number!')
                            }
                        }
                    }/> 
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title="Roll All" 
                            onPress={()=>{
                                if(Data.length!= 0){
                                    rollAll()
                                }
                                else{
                                    Alert.alert('Add at least one dice!')
                                }
                            }
                        }/> 
                    </View>
                </View>
                <View style={styles.flatlistTotal}>
                <ScrollView >
                    <FlatList
                    data={Data}
                    renderItem={renderTotal}
                    numColumns={6}
                    />
                </ScrollView>
                </View>

                <Text>{'Total: ' + totalDice}</Text>
                <Text> </Text>
                <Text> Long press in dice for remove</Text>
            </View>
        </ScrollView>
        {//<AdMobBanner
        //            bannerSize="smartBannerPortrait"
        //            adUnitID="ca-app-pub-3822540147173906/8566951581" //'ca-app-pub-3940256099942544/6300978111' Test ID, Replace with your-admob-unit-id
        //            servePersonalizedAds={true} // true or false
        //onDidFailToReceiveAdWithError={()=> Alert.alert("Turn on the Wi-Fi/Roaming for suport the creator plz! :(")}/>
    }
        </View>
    );
}

