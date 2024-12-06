import {
  Pressable,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import defaultIMG from "../assets/snack-icon.png";

export default function ItemComponent({item, navigation}){

  let img = defaultIMG;
  let image;

  if(item.links != null && item.links.length > 0){
    image = item.links.find(i => i.href != null && i.href.length > 0 && i.render === "image");

    if(image)
      img = {uri: image.href};
  }  
  
  return (    
    <Pressable      
      onPress={() => {
        navigation.navigate('details', {item: item})
      }}>
      <Image style={styles.image} 
        source={
          img
        } 
      />
    </Pressable>
  )
}


const styles = StyleSheet.create({
  image: {    
    height: 200,
    aspectRatio: 4/3,
    borderRadius: 10,
  }
})

