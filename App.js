/**
* @format* @flow strict-local
*/
import React,{useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import colors from './src/utils/colors';
import Form from './src/components/Forms';
import Footer from './src/components/Footer';
import Result from './src/components/Result';


export default function App(){
  const [nombre, setNombre] = useState(null);
  const [salario, setSalario] = useState(null);
  const [iss, setIss] = useState(null);
  const [afp, setAfp] = useState(null);
  const [renta, setRenta] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (nombre && salario ) calculate();
    else reset();
  },[nombre, salario]);
  
  const calculate = () => {
    reset();
    if (!nombre) {
 setErrorMessage('Completar el cuadro de texto empleado');
 } else if (!salario) {
 setErrorMessage('Completar el cuadro de texto salario');
 } else {

 const iss = salario*0.03;
 const afp = salario*0.04;
 const renta = salario*0.05;
 
 setIss({iss});
 setAfp({afp});
 setRenta({renta});
 setTotal({
 
 totalPayable: (salario - iss - afp - renta).toFixed(2).replace('.', ','),
 });
 }
 };
  
  const reset = () => {
 setErrorMessage('');
 setTotal(null);
 };


 return(
 <>
 <StatusBar barStyle="light-content"/>
 <SafeAreaView style={styles.Header}>
   <Text style={styles.HeadApp}>Salario neto de empleados</Text>
     <Form 
       setNombre={setNombre}
       setSalario={setSalario}
      
      />
 </SafeAreaView>
 <Result
 nombre={nombre}
 salario={salario}
 iss={iss}
 afp={afp}
 renta={renta}

 total={total}
 errorMessage={errorMessage}
 />
  <Footer calculate={calculate}/>
 </>
 );
}
const styles = StyleSheet.create({
 Header:{
    backgroundColor:colors.PRIMARY_COLOR,
    height:200,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
   alignItems:'center'
 },
 HeadApp:{
   fontSize:25,
   fontWeight:'bold',
   color:'#fff',
   marginTop:10,
 },
})