import {
StyleSheet,
FlatList,
View,
Text
} from 'react-native';

import ItemComponent from "./Item.jsx"

export default function ListComponent({navigation, data, onEndReached,onRefresh, isRefreshing }){

const renderItem = ({item}) => {
  return <ItemComponent item={item} navigation={navigation} />
}

    return <FlatList 
          contentContainerStyle={styles.flatlist_container}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.data.nasa_id}          
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={() => <View style={styles.center}><Text style={styles.text}>Lista Vázia</Text></View>}
        />
}

const styles = StyleSheet.create({
  center:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    color:'black' ,
    textAlign: 'center'
  },
  flatlist_container:{  
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
    padding: 10
  },
});