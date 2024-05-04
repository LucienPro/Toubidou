import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from '../tools/Color'
import TodoList from "../component/TodoList";
import AddListModal from "../modal/AddListModal";
import { db, auth } from '../firebase/configfire';
import { collection, setDoc, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
  };

  componentDidMount() {
    this.fetchLists();
  }

  fetchLists = () => {
    const user = auth.currentUser;
    if (user) {
      const colRef = collection(db, "users", user.uid, "lists");
      getDocs(colRef)
        .then((querySnapshot) => {
          const lists = querySnapshot.docs.map(docSnap => ({
            id: docSnap.id, 
            ...docSnap.data()
          }));
          this.setState({ lists });
        })
        .catch((error) => {
          console.log("Erreur avec les documents:", error);
        });
    }
  };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return (
        <TodoList list={list} updateList={this.updateList} deleteList={this.deleteList} />
    );
  }; 

  addList = async (list) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = await addDoc(collection(db, "users", user.uid, "lists"), {
          ...list,
          todos: [],
        });
        console.log("Document ecrit avec l'ID: ", docRef.id);
        
        this.fetchLists();
      } catch (e) {
        console.error("Erreur lors de l'ajout du docuement: ", e);
      }
    }
  };

  updateList = async (list) => {
    const user = auth.currentUser;
    if (user && list.id) {
      try {
        const docRef = doc(db, "users", user.uid, "lists", list.id);
        await setDoc(docRef, list, { merge: true });
        console.log("Document mis a jour avec l'ID: ", list.id);
        
        this.fetchLists();
      } catch (e) {
        console.error("Erreur lors de la mise a jour du document: ", e);
      }
    }
  };

  deleteList = async (listId) => {
    const user = auth.currentUser;
    if (user) {
      Alert.alert(
        "Supprimer la liste",
        "Êtes-vous sûr de vouloir supprimer cette liste ?",
        [
          {
            text: "Annuler",
            onPress: () => console.log("Suppression annulée"),
            style: "cancel"
          },
          { text: "Supprimer", onPress: () => this.confirmDelete(listId), style: "destructive" }
        ],
        { cancelable: false }
      );
    }
  };
  
  confirmDelete = async (listId) => {
    const user = auth.currentUser;
    try {
      await deleteDoc(doc(db, "users", user.uid, "lists", listId));
      console.log("Document supprimé avec l'ID: ", listId);
      this.fetchLists();
    } catch (e) {
      console.error("Erreur lors de la suppression du document: ", e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>TOUBIDOU</Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}>Ajouter</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
