import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';
const Lp = () => {



          const [loading, setLoading] = useState(false);
      const rotateAnim = useRef(new Animated.Value(0)).current;
    
      const startLoading = () => {
        setLoading(true);
        // simulate async task
        setTimeout(() => setLoading(false), 3000);
      };
    
      // Rotate animation
      useEffect(() => {
        if (loading) {
          Animated.loop(
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            })
          ).start();
        } else {
          rotateAnim.stopAnimation();
          rotateAnim.setValue(0);
        }
      }, [loading]);
    
      const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      });


  return (
    <View style={{backgroundColor: "#0f172a", flex: 1, alignItems: "center"}}>
        <Text style={{color: "white", marginTop: "30%", alignSelf: "flex-start", marginLeft: 15, fontSize: 17, fontWeight: 700, letterSpacing: 1}}>Let's get back to the account</Text>
        <Text style={{color: "white", marginTop: 10, alignSelf: "flex-start", marginLeft: 15, fontSize: 13, fontWeight: 400, letterSpacing: 1}}>Please enter your details</Text>
       
        <View style={{backgroundColor: "rgba(0,0,0,0.5)", width: "90%", height: 50, borderRadius: 10, marginTop: "50%", paddingLeft: 10, justifyContent: "center"}}>
            <TextInput style={{color: "white", fontSize: 15, fontWeight: 400}} placeholder="phonenumber" placeholderTextColor="white" keyboardType="phone-pad" />
        </View>
        <View style={{backgroundColor: "rgba(0,0,0,0.5)", width: "90%", height: 50, borderRadius: 10, marginTop: "5%", paddingLeft: 10, justifyContent: "center"}}>
            <TextInput style={{color: "white", fontSize: 15, fontWeight: 400}} placeholder="password" placeholderTextColor="white" />
        </View>
        
        <TouchableOpacity onPress={() => {setLoading(true); setTimeout(() => {setLoading(false); }, 5000); }} style={{backgroundColor: "#22c55e", width: "90%", height: 50, borderRadius: 10, marginTop: "30%", justifyContent: "center", alignItems: "center"}}>
            {!loading && <Text style={{color: "white", fontSize: 15, fontWeight: 600}}>Sign In</Text>}
            {loading && (
            <Animated.View
                style={{
                width: 24,
                height: 24,
                borderWidth: 3,
                borderColor: "white",
                borderTopColor: "transparent",
                borderRadius: 12,
                transform: [{ rotate }],
                }}
            />
            
            )}
        </TouchableOpacity>

        <Text style={{color: "white", marginTop: 30}}>or</Text>
        <TouchableOpacity style={{backgroundColor: "white", flexDirection: "row", width: "90%", height: 50, borderRadius: 10, justifyContent: "center", marginTop: 30, alignItems: "center", gap: 10}}>
            <AntDesign name="google" size={30} color="black" style={{marginLeft: "0%"}}/>
            <Text style={{fontSize: 15, fontWeight: 700, marginLeft: "0%"}}>Google</Text>
        </TouchableOpacity>



    
    </View>
  )
}

export default Lp;