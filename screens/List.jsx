import {
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator
 } from 'react-native';
 import { Picker } from '@react-native-picker/picker';
 import {useState, useEffect} from 'react'
 import {getDataPaginated} from "../api/api.js";
 import itemsMock from "../api/mock.js";
 
 import ListComponent from "../componentes/List.jsx"
 import ProgressBarComponent from "../componentes/ProgressBar.jsx";
 
 export default function ListScreen({navigation, route}){
   const [data,setData] = useState([]);
   const [page, setPage] = useState(1);
   const [planet, setPlanet] = useState("earth");
   const [isLoading, setIsLoading] = useState(false);
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [error, setError] = useState(null);
   const [progress, setProgress] = useState(0);
 
   useEffect( () => {
     console.log("useEffect", planet);    
     load(planet,1,[]); 
   },[planet]);
 
 
   const loadNext = async () => {
     if(!isLoading){
       const nextP = page+1;    
       console.log("loadNext", nextP);
       const clone = [...data];
       await load(planet,nextP,clone);
     }
   }
 
 
   const reload = async () => {
     console.log("reload");
     setIsRefreshing(true);        
     await  load(planet,1,[]);
     setIsRefreshing(false);
   }
 
   const load = async (f, p, d) =>{
     console.log("load",f,p,d);
     setIsLoading(true);
     const response = await getDataPaginated(f, p);
 
     if(response.error){
       setError(response.error.message ?? response.error);
     }else{          
       const items = response?.data?.collection?.items;
       if(items){
         const total = items.length;
         let progress = 0;
         items.forEach((item, index) => {
             d.push(item);
             progress = (index + 1) / total;
             setProgress(progress);
         });
         setData(d);
         setPage(p);
       }
       setError(null);     
     }
 
     setIsLoading(false);
   }
 
 
 
     return (
     <View style={[styles.container, {paddingTop: StatusBar.height}]}>
     { isLoading && <ActivityIndicator />}
      <ProgressBarComponent progress={progress} isLoading={isLoading} />
     { error && <Text style={[styles.text, {color: 'red'}]}>{error}</Text>}
       <Picker
         style={styles.select}
         selectedValue={planet}
         onValueChange={ (text) => setPlanet(text)}
       >        
         <Picker.Item label='Terra' value='earth'/>
         <Picker.Item label='Lua' value='moon'/>
         <Picker.Item label='Marte' value='mars'/>
         <Picker.Item label='Saturno' value='saturn'/>
         <Picker.Item label='Vênus' value='venus'/>
         <Picker.Item label='Mercurio' value='mercury'/>
         </Picker>
        
         <ListComponent
           navigation={navigation}
           data={data}      
           onEndReached={loadNext}
           onRefresh={reload}
           isRefreshing={isRefreshing}
         />
      
     </View>
   )
 }
 
 const styles = StyleSheet.create({
   container:{
     flex: 1,    
     width: '100%',
     justifyContent: 'flex-start',
     alignItems: 'stretch',
     gap:10,
     padding:10
   },
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
   input:{
     padding: 10,
     borderWidth: 2,    
     borderColor: "black",
     borderRadius: 10
   },  
   select:{
     padding: 10, 
     backgroundColor: "ice",    
     borderWidth: 2,    
     borderColor: "black",
     borderRadius: 10
   },
 })