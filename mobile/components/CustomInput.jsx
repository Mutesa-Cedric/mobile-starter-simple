import React from 'react';
import { Text, TextInput, View } from 'react-native';

const CustomInput = ({ label, containerStyles="", inputStyles="", ...props }) => {
    return (
        <View className={`${containerStyles}`}>
            <Text className='text-lg font-medium text-gray-800 pb-1'>{label}</Text>
            <TextInput
                className={`border py-2 px-2 text-base rounded-md border-gray-500 focus:border-cyan-600 ${inputStyles}`}
                autoCapitalize='none'
                {...props}

            />
        </View>
    )
}

export default CustomInput