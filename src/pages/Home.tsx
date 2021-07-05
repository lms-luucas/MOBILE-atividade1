import React, { useCallback } from "react";
import { useState } from "react";
import { StyleSheet, Text, StatusBar, View, SafeAreaView} from "react-native";
import { RectButton, TextInput } from "react-native-gesture-handler";

const baseColor = "#801EBE"; 
const Home = () => {

  interface Dados {
    altura?: number;
    peso?: number;
    imc?: number;
    classeImc?:
      | "MAGREZA"
      | "NORMAL"
      | "SOBREPESO"
      | "OBESIDADE"
      | "OBESIDADE GRAVE";
  }

  const [dadosState, setDadosState] = useState<Dados>({})

  const Calcular = useCallback(() => {
    const { altura, peso } = dadosState;

    if (!altura) return;
    if (!peso) return;

    const imc = Number(peso) / Math.pow(Number(altura), 2);
    const classeImc =
      imc < 18.5
        ? "MAGREZA"
        : imc < 24.9
        ? "NORMAL"
        : imc < 29.9
        ? "SOBREPESO"
        : imc < 39.9
        ? "OBESIDADE"
        : "OBESIDADE GRAVE";

    setDadosState((prev) => ({ ...prev, imc, classeImc }));
  }, [dadosState, setDadosState]);

  const alterValor = useCallback(
    (name: keyof Dados, value: string) => {
      setDadosState((prev) => ({
        ...prev,
        [name]: value.replace(",", "."),
      }));
    },
    [setDadosState]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Calculador IMC</Text>
      </View>

      <View>
        <Text style={styles.subTitle}>Medidas</Text>
      </View>

      <View style={styles.dataContainer}>
        <View>
          <Text style={styles.label}>Altura</Text>
          <TextInput
            style={styles.inputMedidas}
            value={dadosState.altura?.toString() || ""}
            onChangeText={(resultado) => alterValor("altura", resultado)}
            placeholder="Altura"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Peso</Text>
          <TextInput
            value={dadosState.peso?.toString() || ""}
            onChangeText={(text) => alterValor("peso", text)}
            style={styles.inputMedidas}
            placeholder="Peso"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
      </View>

      <View>
        <Text style={styles.subTitle}>Resultado</Text>
      </View>

      <View style={styles.dataContainerResultado}>
        <View>
          <Text style={styles.label}>IMC</Text>
          <TextInput 
          style={styles.inputResultado}
          value={dadosState.imc?.toFixed(2) || ""}
          editable={false}
          />
        </View>
        <View>
          <Text style={styles.label}>Classificação</Text>
          <TextInput style={styles.inputResultado} 
          value={dadosState.classeImc?.toString() || ""}
          editable={false}
          />
        </View>
      </View>

      <View style={styles.dataContainer}>
        <RectButton style={styles.button} onPress={Calcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </RectButton>
      </View>
    </SafeAreaView>
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#FFFEFF",
  },
  title: {
    height: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#801EBE",
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
  },
  dataContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  dataContainerResultado: {
    display: "flex",
    flexDirection: "row",
  },

  inputMedidas: {
    backgroundColor: "#f0f0f7",
    width: 350,
    height: 45,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 15,
  },
  inputResultado: {
    backgroundColor: "#f0f0f7",
    width: 175,
    height: 45,
    paddingHorizontal: 20,
    margin: 8,
    borderRadius: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    marginLeft: 12,
    color: "#383838",
  },
  button: {
    width: 150,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 52,
    backgroundColor: "#801EBE",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFF",
  },
  subTitle: {
    color: "#801EBE",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    marginTop: 30,
    marginLeft: 20,
  },
  lineContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: 1.5,
    width: 350,
    backgroundColor: "#B4B4B4",
    marginTop: 35,
  },
});

export { Home };
