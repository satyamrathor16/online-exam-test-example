import React, { useState, useEffect } from 'react';
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
import { Icons } from '../assests/index'

const Questions = ({ navigation }) => {
    const data = useData()
    const [errorText, setErrorText] = useState('')
    useEffect(() => {
        // console.log(JSON.stringify(data.Questions));
    }, [])

    const handleSave = () => {
        var isAllValid = true;
        data.Questions.map((item) => {
            if (item.validations.required) {
                if (!item.Options.some((optionData) => optionData.selected)) {
                    isAllValid = false
                }
            }
        })
        if (isAllValid) {
            setErrorText('')
            navigation.navigate('Answers')
        } else {
            setErrorText('Please answer all required(*) questions')
            console.error('Please answer all required(*) questions')
        }
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.listItemMainView}>
                <Text style={styles.title}>{`(${index + 1}) ${item.title}`}<Text style={styles.requireText}> {item.validations.required ? '*' : ''}</Text></Text>
                <View style={styles.optionsView}>
                    {item.Options.length > 0 && item.Options.map((OptionsItem, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => data.handleOptionSelect(item.title, index)}
                                style={[styles.listOptions, { backgroundColor: OptionsItem.selected ? 'green' : '#FFFFFF' }]}
                                key={index.toString()}
                            >
                                <Text style={{ color: OptionsItem.selected ? '#FFF' : '#000' }}>{OptionsItem.option}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                {item.Options.length > 0 && item.rules.length > 0 && item.Options.map((OptionsItem, index) => {
                    return (
                        <View key={index.toString()}>
                            {OptionsItem.selected && item.rules.map((ruleItem, index) =>
                                <View style={styles.ruleView} key={index.toString()}>
                                    {OptionsItem.option == ruleItem.rule &&
                                        <View>
                                            {ruleItem.action == 'Image' ?
                                                <Image
                                                    source={Icons.camera}
                                                    resizeMode='contain'
                                                    style={styles.listImage}
                                                />
                                                :
                                                <TextInput
                                                    placeholder='Comment box'
                                                    style={styles.commentBox}
                                                />
                                            }
                                        </View>
                                    }
                                </View>
                            )}
                        </View>
                    )
                })}
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
                ListFooterComponent={
                    <View>
                        <Text style={styles.requireText}>{errorText}</Text>
                        <TouchableOpacity
                            onPress={handleSave}
                            style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                }
            />

        </View>
    );
};

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
    },


});

export default Questions;
