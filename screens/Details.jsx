import {
 Text,
 View,
 StyleSheet,
 useWindowDimensions,
 Image,
 ScrollView
} from 'react-native';

import defaultIMG from "../assets/snack-icon.png";
import KeyWord from "../componentes/Keyword.jsx"

export default function DetailsScreen({navigation, route}){  
  const {height, width} = useWindowDimensions();
  const isPortrait = height > width;

  const main = isPortrait ? styles.main_container : styles.main_container_landscape;

  const params = route.params;
  const item = params.item;

  const fData = item.data.find(d => d != null);  

  let img = defaultIMG;

  if(item.links != null && item.links.length > 0){
    const image = item.links.find(i => i.href != null && i.href.length > 0 && i.render === "image");

    if(image)
      img = {uri: image.href};
  }  


  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={main}>
        <Image style={styles.image} source={img}/>
        <View style={styles.info_container}>
          <Text style={styles.highlight}>{fData?.title ?? "Sem Título"}</Text>
          <Text style={styles.text}>{fData?.description ?? "Sem Descrição"}</Text>
          <Text style={styles.text}>{fData?.location ?? "Sem Localização"}</Text>
          <Text style={styles.text}>{fData?.photographer ?? "Sem Fotografo"}</Text>
          <Text style={styles.text}>{fData?.date_created ? new Date(fData?.date_created).toLocaleString('pt-BR') : "Sem data"}</Text>          
        </View>
      </View>
      <View style={styles.row}>
          {
            fData?.keywords.map((k,idx) => <KeyWord key={idx} keyw={k}/>  )
          }
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container:{

    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    padding: 10
  },
  main_container:{  
    flex:1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    padding: 10
  },
  main_container_landscape:{ 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    padding: 10
  },
  info_container:{  
    flex:1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    padding: 10
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  highlight:{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bolder'
  },
  image:{
    height: 200,
    aspectRatio: 4/3,
    borderRadius: 10,
  },
  row:{
    flexDirection: 'row',
     flexWrap: 'wrap',
     alignContent: 'center',
     justifyContent: 'center',
     gap: 10
  }
})