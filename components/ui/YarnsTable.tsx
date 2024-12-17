import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {Yarn} from "@/app/(tabs)/(materials)/(yarn)/yarn";



interface TableProps {
  data: Yarn[];
}


const YarnsTable: React.FC<TableProps> = ({ data }) => {
  const renderHeader = () => (
    <View style={[styles.row, styles.header]}>
      <Text style={[styles.cell, styles.color_cell, styles.headerText]}>Цвет</Text>
      <Text style={[styles.cell, styles.thickness_cell, styles.headerText]}>Толщина</Text>
      <Text style={[styles.cell, styles.maker_cell, styles.headerText]}>Производитель</Text>
      <Text style={[styles.cell, styles.composition_cell, styles.headerText]}>Состав</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Yarn }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.color_cell]}>{item.color}</Text>
      <Text style={[styles.cell, styles.thickness_cell]}>{item.thickness}</Text>
      <Text style={[styles.cell, styles.maker_cell]}>{item.maker}</Text>
      <Text style={[styles.cell, styles.composition_cell]}>{item.composition}</Text>
    </View>
  );

  return (
    <View style={styles.tableContainer}>
      {renderHeader()}
      {data.length > 0
        ? <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            showsVerticalScrollIndicator={false}
          />
        : <Text style={{ textAlign: 'center', padding: 8 }}>Пряжа не найдена</Text>
      }
    </View>
  );
};

export default YarnsTable;


const styles = StyleSheet.create({
  tableContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: 'stretch'
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontWeight: "bold",
  },
  cell: {
    // flex: 1,
    padding: 8,
    textAlign: "left",
  },
  maker_cell: {
    width: '20%',
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  thickness_cell: {
    width: '25%',
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  color_cell: {
    width: '15%',
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  composition_cell: {
    width: '40%'
  }
});
