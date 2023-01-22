import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Addsquare, Addtask, Colorswatch, Editoption, Gallery, Trash } from './svg'
import { Variables } from '../styles/theme'



const ProjectOptionsModal = ({ options, style }) => {

    const OptionItem = ({ item }) => (
        <Pressable
            onPress={item?.onPress}
            style={({ pressed }) => ([styles.optionItem, pressed && { opacity: 0.5, backgroundColor: '#dddddd' }])}
        >
            {item.icon}
            <Text style={styles.optionText}>{item.name}</Text>
        </Pressable>
    )

    return (
        <View style={[styles.container, style]}>
            <View style={{ overflow: 'hidden', borderRadius: 20, borderTopRightRadius: 0 }}>
                {options?.map(item => <OptionItem key={item.name} item={item} />)}
            </View>
        </View>
    )
}

export default ProjectOptionsModal

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: Variables.colors.white,
        borderRadius: 20,
        borderTopRightRadius: 0,
        ...Variables.shadow,
        right: 20,
        top: Platform.OS === 'android' ? 0 : 10
    },
    optionItem: {
        padding: 20,
        flexDirection: 'row'
    },
    optionText: {
        fontSize: 16,
        color: Variables.colors.black.dark900,
        fontWeight: '500',
        marginLeft: 15
    }
})