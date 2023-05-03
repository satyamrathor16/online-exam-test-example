import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Questions from '../screens/Questions';
import Answers from '../screens/Answers';

const STACK = createStackNavigator();

export default MainStack = () => {
    return (
        <STACK.Navigator>
            <STACK.Screen name='Questions' component={Questions} />
            <STACK.Screen name='Answers' component={Answers} />
        </STACK.Navigator>
    );
}
