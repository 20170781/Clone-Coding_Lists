import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { theme } from './colors';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');

  const showOthers = () => setWorking(false);
  const showWork = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addTodo = () => {
    if (text === '') return;

    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={showWork}>
          <Text
            style={{
              ...styles.header_btn,
              color: working ? 'white' : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showOthers}>
          <Text
            style={{
              ...styles.header_btn,
              color: !working ? 'white' : theme.grey,
            }}
          >
            Others
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onChangeText={onChangeText}
        onSubmitEditing={addTodo}
        placeholder="Add a To Do"
        value={text}
        returnKeyType="done"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  header_btn: {
    fontSize: 32,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 16,
  },
});
