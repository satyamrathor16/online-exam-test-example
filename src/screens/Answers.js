import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { useData } from '../context/DataContext'

export default function Answers() {

    const data = useData()

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.listItemMainView}>
                <Text style={styles.title}>{`(${index + 1}) ${item.title}`}<Text style={styles.requireText}> {item.validations.required ? '*' : ''}</Text></Text>
                <View style={styles.optionsView}>
                    {item.Options.length > 0 && item.Options.map((OptionsItem, index) => {
                        return (
                            <TouchableOpacity
                                disabled={true}
                                style={[styles.listOptions, { backgroundColor: OptionsItem.selected ? 'green' : '#FFFFFF' }]}
                                key={index.toString()}
                            >
                                <Text style={{ color: OptionsItem.selected ? '#FFF' : '#000' }}>{OptionsItem.option}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }

    const _ItemSeparatorComponent = () =>
        <View style={styles.itemSeparator} />

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={data.Questions}
                keyExtractor={key => key.title}
                renderItem={_renderItem}
                ItemSeparatorComponent={_ItemSeparatorComponent}
                contentContainerStyle={styles.flatlistComponent}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    listItemMainView: {
        paddingVertical: 10,
        paddingHorizontal: 3
    },
    title: {
        color: '#000000',
        fontSize: 15
    },
    optionsView: {
        flexDirection: 'row',
        marginTop: 10,
    },
    itemSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: '#000000',
    },
    flatlistComponent: {
        paddingHorizontal: 20
    },
    listOptions: {
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    listImage: {
        height: 25,
        width: 25,
    },
    ruleView: {
        marginTop: 10
    },
    commentBox: {
        borderWidth: 1,
        paddingVertical: 0,
        borderRadius: 5,
    },
    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        marginBottom: 10,
        paddingVertical: 8,
        marginTop: 10
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 15
    },
    requireText: {
        color: 'red'
    }

})