import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

const Index = () => {


    const router = useRouter();


    const fullText = "weko is a planner platform that can orginaize your study then see your achivments grow up like a plant 🌱";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
        if (index === fullText.length-1) clearInterval(interval);
        }, 100); // 100ms per letter
        return () => clearInterval(interval);
    }, [fullText === displayedText]);

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

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5, // grow
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // shrink
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
  }, []);

  return (
    <View className="bg-gray-500 flex-1 justify-center items-center w-full p-1" style={{
        backgroundColor: '#0f172a',
        height: '100%',
        alignItems: 'center',
      
    }}>
        <Text style={{color: "white", fontSize: 30, fontWeight: 700, letterSpacing: 1, marginTop: "30%"}}>weko_</Text>
        <View style={{padding: 1, backgroundColor: "white", width: "70%", marginTop: 30, shadowColor: "white", shadowRadius: 3, shadowOpacity: 1, shadowOffset: {width: 0, height: 5}, }}></View>

        <Text style={{color: "white", fontSize: 16, fontWeight: 400, marginTop: 40, letterSpacing: 1, lineHeight: 30, paddingHorizontal: 15}}>{displayedText} <View style={{padding: 5, borderRadius: 15, marginTop: "100%", backgroundColor: "white"}}></View></Text> 

        <TouchableOpacity onPress={() => {setLoading(true); setTimeout(() => {setLoading(false); router.push("/(start)/lp"); }, 5000); }} style={{ bottom: 50, position: "absolute", padding: 15, flexDirection: "row", justifyContent: "center", gap: 15, width: "87%", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)", borderRadius: 10}}>
            {!loading && <Text style={{color: "white", fontSize: 20, fontWeight: 600,}}>Get Started</Text>}
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
            {!loading &&
            <Animated.View
                style={{
                width: 15,
                height: 15,
                borderRadius: 10,
                backgroundColor: "white",
                shadowColor: "#22c55e",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 5,
                transform: [{ scale: scaleAnim }],
                elevation: 10, // for Android shadow
                }}
            />}
        </TouchableOpacity>
    </View>
  )
}

export default Index;