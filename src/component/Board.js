import { View, Text, StyleSheet } from "react-native";


export const Board = ({ steps }) => {
  return (
    <View style={styles.board}>
      {steps.map((s, i) => (
        <View style={styles.box} key={i}>
          <Text style={styles.chess}>{s}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    marginTop:50,
    width: 300,
    height: 300, 
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "red",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignContent: 'center'

  },

  box: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "green",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  chess: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Board;