import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    console.log("####### useEffect #######");
    api.get("projects").then(({ data }) => {
      console.log("##############", data);
      setProjects(data);
    });
  }, []);

  async function handleAddProject() {
    console.log("$$$$$$$$$$ handleAddProject");
    const response = await api.post("projects", {
      title: `Projeto ${Date.now()}`,
      owner: "Joana Silva",
    });
    console.log("$$$$$$$$$$ DATa", data);
    const project = response.data;
    setProjects([...projects, project]);
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddProject()}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 32,
    color: "#EEE",
  },
  button: {
    margin: 20,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default App;
