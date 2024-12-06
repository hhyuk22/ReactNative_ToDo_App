import { SafeAreaView, StyleSheet, Text, View, StatusBar, Platform, FlatList } from 'react-native'
import React from 'react'
import InputForm from '../componemts/InputForm'
import TodoItem from '../componemts/TodoItem'
import { useSelector } from 'react-redux'

const MainScreen = () => {
    const todos = useSelector(state => state.todo.todos);
    const todoTasks = todos.filter((item) => item.state === 'todo');
    const completedTasks = todos.filter((item) => item.state === 'done');
    
    return (
        <SafeAreaView style={styles.container}> {/*상단 상태표시줄 침범X 안드로이드에선 안될 수 있음*/}
            <StatusBar translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content" /> {/*상태표시줄 투명하게*/}
            <Text style={styles.pageTitle}>ToDo</Text>
            <View style={styles.listView}>
                <Text style={styles.listTitle}>할 일</Text>
                {todoTasks.length !== 0 ? (
                    <FlatList data={todoTasks}
                    renderItem={({ item }) => <TodoItem {...item}/>}
                    keyExtractor={(item) => item.id} />
                ) :
                (<Text style={styles.emptyListText}>할 일이 없습니다.</Text>)
                }
            </View>
            <View style={styles.separator} />
            <View style={styles.listView}>
                <Text style={styles.listTitle}>완료된 일</Text>
                {completedTasks.length !== 0 ? (
                    <FlatList data={completedTasks}
                    renderItem={({ item }) => <TodoItem {...item} />}
                    keyExtractor={(item) => item.id} />
                ) :
                (<Text style={styles.emptyListText}>완료된 일이 없습니다.</Text>)
                }
            </View>
            <InputForm></InputForm>
        </SafeAreaView>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 20 : 0, //안드로이드면 20
        //backgroundColor: '#f7f8fa',
    },
    pageTitle: {
        marginBottom: 35,
        paddingHorizontal: 15, //양옆 패딩
        fontSize: 54,
        fontWeight: '600',
    },
    listView: {
        flex: 1,
    },
    listTitle: {
        marginBottom: 25,
        paddingHorizontal: 15,
        fontSize: 41,
        fontWeight: '500',
    },
    separator: { //구분선
        marginHorizontal: 10,
        marginTop: 25,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)'
    },
    emptyListText: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        fontSize: 15,
        lineHeight: 20,
        color: '#737373'
    },
})