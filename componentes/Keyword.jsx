import {
 Text,
 StyleSheet
} from 'react-native';

export default function KeyWord({keyw}){
  return <Text style={styles.chip}>{keyw}</Text>
}


const styles = StyleSheet.create({
  chip:{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bolder',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 20
  }
})