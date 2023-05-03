import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { DATA } from '../../QuestionData'

export const DataContext = React.createContext({});

export const ContextProvider = ({ children }) => {

    const [questionData, setQuestionData] = useState();

    useEffect(() => {
        let questionData = DATA.category[0].forms[0].questions;
        let newData = questionData.map((item) => {
            let options = item.Options.map((optionItem) => {
                optionItem.selected = false
                return optionItem
            })
            item.Options = options;
            return item;
        })
        setQuestionData(newData)
    }, [])

    const handleOptionSelect = (question, selectedItem) => {
        setQuestionData(preState => preState.map((item) => {
            if (item.title == question) {
                var options = item.Options.map((optionItem, index) => {
                    if (index == selectedItem) {
                        optionItem.selected = !optionItem.selected
                    }else{
                        optionItem.selected = false
                    }
                    return optionItem
                })
                item.Options = options;
            }
            return item;
        }))
    }

    const contextValue = {
        Questions: questionData,
        handleOptionSelect
    }

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);