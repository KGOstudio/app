import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

const Index = () => {








    const [newTask, setNewTask] = useState("");

    const motivationalMessages = [
        "You're on fire! Keep it up 🔥",
        "Small steps every day lead to big results 🌱",
        "Your consistency is your superpower 💪",
        "Stay focused, you’re closer than you think 🎯",
        "Each task you finish is a seed you plant 🌿",
        "Discipline today, success tomorrow 🌟",
        "Don’t stop now, your future self will thank you 🙌",
        "Progress, not perfection 🚀",
        "Great things are done by a series of small steps 🧩",
        "You're building habits that last a lifetime ⏳",
        "One more task = one step closer 🪴",
        "Keep going, the streak is growing stronger 🔥",
        "Your plant is blooming because of your effort 🌸",
        "Consistency beats motivation every time ⚡",
        "You’re unstoppable when you stay consistent 🌍",
    ];


      const [tasks, setTasks] = useState([
    { id: 1, task: "Meditate for 10 minutes", completed: true },
    { id: 2, task: "Read 20 pages of a book", completed: false },
    { id: 3, task: "Exercise for 30 minutes", completed: false },
    { id: 4, task: "Write in journal", completed: true },
    { id: 5, task: "Plan tomorrow's tasks", completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<typeof tasks[0]>) => {
    return (
      <TouchableOpacity
        onLongPress={drag} // hold to drag
        onPress={() => toggleTask(item.id)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          backgroundColor: isActive ? "#1e293b" : "transparent",
          padding: 5,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: item.completed ? "#22c55e" : "white",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: item.completed ? "#22c55e" : "transparent",
          }}
        >
          {item.completed && (
            <MaterialIcons name="check" size={16} color="white" />
          )}
        </View>
        
        <TextInput 
            value={item.task}
            onChangeText={(prev) => {
                setTasks(tasks.map(t =>
                    t.id === item.id ? { ...t, task: prev } : t
                ));
            }}
            style={{
                color: "white",
                marginLeft: 15,
                fontSize: 16,
                fontWeight: item.completed ? "700" : "400",
                textDecorationLine: item.completed ? "line-through" : "none",
            }}        
          />
      </TouchableOpacity>
    );
  };

  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  // translate for each action
  const planStyle = {
    transform: [
      { scale: animation },
      { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -70] }) },
    ],
    opacity: animation,
  };

  const focusStyle = {
    transform: [
      { scale: animation },
      { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -140] }) },
    ],
    opacity: animation,
  };

  const progressStyle = {
    transform: [
      { scale: animation },
      { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -210] }) },
    ],
    opacity: animation,
  };


  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * motivationalMessages.length));

  return (
    <View 
    onLayout={() => {    
        let randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    }}
    style={{
        backgroundColor: '#0f172a',
        height: '100%',
      
    }}>
        <ScrollView>
        {/* header */}
        <View style={{width: "100%", marginTop: "15%", paddingBottom: 15, justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.1)"}}>
            <Text style={{color: "white", alignSelf: "flex-start", marginLeft: 15, fontSize: 17, fontWeight: 700, letterSpacing: 1}}>Good after noon,
                {"\n"}<Text style={{fontWeight: 500}}> Mustafa</Text>
            </Text>
            
            <TouchableOpacity style={{position: "absolute", right: 15}}><Ionicons name="notifications" size={24} color="white" /> <View style={{backgroundColor: "red", position: "absolute", right: 15, width: 20, height: 20, alignItems: "center", justifyContent: "center", borderRadius: 30}}><Text style={{color: "white", fontWeight: 700}}>0</Text></View></TouchableOpacity>
            
            <View style={{position: "absolute", top: 30, zIndex: 1, backgroundColor: "#1e293b", padding: 10, borderRadius: 10, alignItems: "center", gap: 10, width: "90%", justifyContent: "center"}}>
                
                <Text style={{color: "white", fontWeight: "700", borderBottomColor: "rgba(255,255,255,0.3)", borderBottomWidth: 1, width: "90%", padding: 5}}>you have <Text style={{color: "#22c55e"}}>{tasks.length}</Text> of tasks that not completed yet!</Text>
                <Text style={{color: "white", fontWeight: "700", borderBottomColor: "rgba(255,255,255,0.3)", borderBottomWidth: 1, width: "90%", padding: 5}}>you have <Text style={{color: "#22c55e"}}>{tasks.length}</Text> of tasks that not completed yet!</Text>
                <Text style={{color: "white", fontWeight: "700", borderBottomColor: "rgba(255,255,255,0.3)", borderBottomWidth: 1, width: "90%", padding: 5}}>you have <Text style={{color: "#22c55e"}}>{tasks.length}</Text> of tasks that not completed yet!</Text>

            </View>

            {/* notification
            <View style={{position: "absolute", bottom: -15, backgroundColor: "#1e293b", padding: 10, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 10}}>
                <MaterialIcons name="info" size={20} color="white" />
                <Text style={{color: "white", fontSize: 13, fontWeight: 500}}>You have completed 5 tasks today! 🎉</Text>

            </View> */}


        </View>

        <View style={{padding: 15, marginTop: 20, alignItems: "center"}}>
            <Text style={{color: "white", fontSize: 30, fontWeight: 700, letterSpacing: 1, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                7 <MaterialIcons name="local-fire-department" size={30} color="orange" />
            </Text>

            <Text style={{color: "white", fontSize: 15, height: 57, fontWeight: 500, marginTop: 10, letterSpacing: 1, textAlign: "center", paddingHorizontal: 3}}>
                {motivationalMessages[randomIndex]}
            </Text>

            
            <View style={{marginTop: 30, backgroundColor: "rgba(255,255,255,0.05)", padding: 15, borderRadius: 10}}>
                <Text style={{color: "white", fontWeight: "500", marginTop: 5}}>progress</Text>

                <View style={{backgroundColor: "rgba(255,255,255,0.1)", alignSelf: "center", width: 300, height: 10, borderRadius: 10, marginTop: 10}}>
                    <View style={{backgroundColor: "#22c55e", width: `${(tasks.filter(prev => prev.completed).length / tasks.length) * 100}%`, height: 10, borderRadius: 10}}></View>
                </View>

            </View>

        </View>




        <View style={{padding: 15, marginTop: 30}}>
            <Text style={{color: "white", fontWeight: "700", fontSize: 20}}>Today Task's</Text>

            <DraggableFlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                onDragEnd={({ data }) => setTasks(data)} // update tasks order
            />

            <View style={{flexDirection: "row", alignItems: "center", marginTop: 20, marginLeft: 7}}>
                <View style={{width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor:  "white", justifyContent: "center", alignItems: "center", backgroundColor: "transparent"}}>
                </View>
                <TextInput 
                    placeholder="Add a new task"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    value={newTask}
                    onChangeText={(prev) => { setNewTask(prev); }}
                    style={{color: "white", marginLeft: 15, fontSize: 16, fontWeight:  "400", textDecorationLine:  "none", flex: 1}} 
                />
                
                {newTask.length > 0 &&
                <TouchableOpacity onPress={() => {
                    setTasks([...tasks, { id: tasks.length+1, task: newTask, completed: false }]);
                    setNewTask("");
                }}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>}
            </View>

                
            </View>


            <View style={{padding: 1, marginTop: "30%"}}></View>

        </ScrollView>

        {/* Floating Action Button and action buttons */}
        <View style={styles.container}>
            <Animated.View style={[styles.actionBtn, { backgroundColor: "#3b82f6" }, planStyle]}>
            <MaterialIcons name="event-note" size={22} color="white" />
            <Text style={styles.actionText}>Plan</Text>
            </Animated.View>

            <Animated.View style={[styles.actionBtn, { backgroundColor: "#f97316" }, focusStyle]}>
            <MaterialIcons name="timer" size={22} color="white" />
            <Text style={styles.actionText}>Focus</Text>
            </Animated.View>

            <Animated.View style={[styles.actionBtn, { backgroundColor: "#22c55e" }, progressStyle]}>
            <MaterialIcons name="insights" size={22} color="white" />
            <Text style={styles.actionText}>Progress</Text>
            </Animated.View>

            {/* FAB button */}
            <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
                <MaterialIcons name={open ? "close" : "access-time-filled"} size={28} color="white" />
            </TouchableOpacity>
        </View>

        {/* navigation menu */}
        <View style={{position: "absolute", bottom: 37, gap: 15, left: 15, justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: "#1e293b", padding: 15, borderRadius: 10}}>
            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}>
                <Ionicons name="home" size={22} color="white" />
                <Text style={{color: "white", marginLeft: 10, fontWeight: "600", fontSize: 16}}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}>
                <Ionicons name="stats-chart" size={22} color="white" />
                <Text style={{color: "white", marginLeft: 10, fontWeight: "600", fontSize: 16}}>Statistics</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}>
                <Ionicons name="person-circle" size={22} color="white" />
                <Text style={{color: "white", marginLeft: 10, fontWeight: "600", fontSize: 16}}>Profile</Text>
            </TouchableOpacity>
        </View>




    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 7,
    alignItems: "center",
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  actionBtn: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  actionText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 14,
  },
});


export default Index