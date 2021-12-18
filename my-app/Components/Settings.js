import * as React from 'react';
import { View, Modal, Button } from 'react-native';

export default function Settings() {

    return(
        <View>
            <Modal visible={modalVisible} animationType="slide" transparent={false}>
                <View style={styles.modalView}>
                    <Text>This is my modal</Text>
                    <Button title="Done" onPress={() => setModalVisible(false)}></Button>
                </View>
            </Modal>
        </View>
    ); 
}

const styles = StyleSheet.create({
    modalView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#7777ffee",
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
    },
    button: {
      borderWidth: 1,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      margin: 20,
      borderRadius: 20,
      borderColor: "#0000ff",
      alignSelf: "flex-end",
      margin: 50,
    },
  })