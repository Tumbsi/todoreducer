import React, { useReducer, useState } from 'react';
import { SafeAreaView, TextInput, Button, FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

// Initial state
const initialState = [];

// Reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: Date.now(), text: action.payload }];
        case 'REMOVE':
            return state.filter((item) => item.id !== action.payload);
        default:
            return state;
    }
}

export default function TodoApp() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [task, setTask] = useState('');

    // Function to handle adding tasks
    const handleAddTask = () => {
        if (task.trim()) {
            dispatch({ type: 'ADD', payload: task });
            setTask(''); // Clear input after adding
        }
    };

    // Function to handle removing tasks
    const handleRemoveTask = (id) => {
        dispatch({ type: 'REMOVE', payload: id });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={task}
                    placeholder="Add new..."
                    onChangeText={setTask}
                />
                <Button title="Save" onPress={handleAddTask} />
            </View>

            <FlatList
                data={state}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
                        <Text style={styles.task}>{item.text}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginRight: 8,
    },
    task: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
});
