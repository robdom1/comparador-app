import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function InputField({
    label,
    icon,
    inputType,
    keyboardType,
    fieldButtonLabel,
    fieldButtonFunction,
    onChangeText,
    value,
    returnKeyType,
    innerRef,
    onSubmitEditing,
    blurOnSubmit,
}) {
    return (
        <View
            style={{
                flexDirection: 'row',
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
            }}>
            {icon}
            {inputType == 'password' ? (
                <TextInput
                    placeholder={label}
                    value={value}
                    onChangeText={(input) => onChangeText(input)}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0 }}
                    secureTextEntry={true}
                    returnKeyType={returnKeyType}
                    ref={innerRef}
                    onSubmitEditing={() => onSubmitEditing()}
                    blurOnSubmit={blurOnSubmit}
                />
            ) : (
                <TextInput
                    placeholder={label}
                    value={value}
                    onChangeText={(input) => onChangeText(input)}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0 }}
                    returnKeyType={returnKeyType}
                    ref={innerRef}
                    onSubmitEditing={() => onSubmitEditing()}
                    blurOnSubmit={blurOnSubmit}
                />
            )}
            <TouchableOpacity onPress={fieldButtonFunction}>
                <Text style={{ color: '#AD40AF', fontWeight: '700' }}>{fieldButtonLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}