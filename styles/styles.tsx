import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

EStyleSheet.build();


export  const styles = EStyleSheet.create({
    dice:{
        marginVertical: '0.25rem',
        marginHorizontal: '0.25rem',
        width:'5.625rem',
        height:'5.625rem',
        flexBasis: 0,
        flexGrow: 1,
    },

    diceTotal:{
        marginVertical: '0.25rem',
        marginHorizontal: '0.25rem',
        width:Dimensions.get('window').width/7.0,
        height:Dimensions.get('window').width/12

    },

    flatlist:{
        minWidth:'100%',
        height:(Dimensions.get('window').width/1.02),
        borderColor:'black',
        borderStyle:'solid',
        borderWidth: 1,
        alignItems:'center'
        
    },
    flatlistTotal:{
        minWidth:'100%',
        height: ((Dimensions.get('window').width/12)*2)+18,
        borderColor:'black',
        borderStyle:'solid',
        borderWidth: '0.0625rem',
        alignItems:'center'
    },

    button:{
        paddingLeft:10,
        paddingRight:10
    }
    ,
    buttonContainer:{
        paddingTop:'0.625rem',
        paddingBottom:'0.625rem',
        flexDirection:'row',
    },

    container:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    itemModifier:{
        position:'absolute',
        bottom:'0.625rem',
        right:'0.625rem',
    },
    title: {
        fontSize: '1.5625rem',
    },
    box:{
        borderBottomWidth:1,
        width:'1.875rem',
        height:'1.25rem',
    },
    selectBox:{
        width:'5.625rem',
        height:'1.875rem'
    },
    boxContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    textContainer:{
        flexDirection:'row'
    },
    text:{
      paddingRight:'0.3125rem',
      paddingLeft:'0.3125rem',
      fontSize: '1rem'
    }
    });