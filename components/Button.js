import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export const Button =({title,color,onPress}) => { 
    return ( 
        <TouchableOpacity onBlur={10} onPress={onPress} style= {[styles.button,{backgroundColor : color},] }>
                <Text style = {[styles.textline] } >{title} </Text>
        </TouchableOpacity>
             );
}
const styles = StyleSheet.create({
    textline: {
      color: 'black',
      textAlign: 'center',
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        width: "100%",
        marginVertical: 5,
        borderRadius: 25
      },
  });