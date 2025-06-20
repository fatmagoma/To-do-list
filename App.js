import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [newTask, setNewTask] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    if (editId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editId ? { ...task, text: newTask } : task
        )
      );
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask }]);
    }
    setNewTask('');
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks(tasks.filter((task) => task.id !== id));
        },
      },
    ]);
  };

  const handleEdit = (task) => {
    setNewTask(task.text);
    setEditId(task.id);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.text.toLowerCase() === searchText.toLowerCase() || !searchText.trim()
  );

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>📋 {item.text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={[styles.actionIcon, { color: '#FFC107' }]}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={[styles.actionIcon, { color: '#F44336' }]}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 My Tasks</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="🔍 Search exact task name..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        ListEmptyComponent={
          <Text style={styles.noTask}>No tasks found</Text>
        }
        style={{ flex: 1 }}
      />

      <View style={styles.addSection}>
        <TextInput
          placeholder="➕ Add new task..."
          style={styles.taskInput}
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>
            {editId ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    fontSize: 16,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  actionIcon: {
    fontSize: 20,
    marginLeft: 15,
  },
  addSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noTask: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#888',
  },
});
