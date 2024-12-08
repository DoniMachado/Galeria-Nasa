import { View, Text, StyleSheet} from "react-native";
import {useEffect, useState} from 'react';


export default function ProgressBar({ isLoading, progress }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
      if(isLoading){
        setValue(progress);
      }else{
        setValue(0);
      }
    },[isLoading, progress]);


    return isLoading ? 
          (
            <View style={styles.progressBarContainer}>
              <Text style={styles.progressBarLabel}>{`${(value * 100).toFixed(0)}%`}</Text>
              <View style={styles.progressBar}>
                 <View style={[StyleSheet.absoluteFill, {backgroundColor: "#8BED4F", width: `${(value * 100).toFixed(0)}%`}]}/>
              </View>
            </View>  
          )
          : (null)
       
}

const styles = StyleSheet.create({
    progressBarContainer: {
        marginHorizontal: 10,
    },
    progressBarLabel: {
        textAlign: 'center',
        fontSize: 20,
    },
    progressBar: {
      height: 20,
      flexDirection: "row",
      width: '100%',
      backgroundColor: 'white',
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 5
    }
});