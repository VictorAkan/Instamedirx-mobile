import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


const IndividualConsultation = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Individual Consultation</Text>
    </View>
  )
}

export default IndividualConsultation

const styles = StyleSheet.create({
    container :{
        marginTop: 30
    }
})