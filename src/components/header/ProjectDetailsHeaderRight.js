import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { More, Search } from '../svg'
import { Variables } from '../../styles/theme'

const ProjectDetailsHeaderRight = ({ onOptionsPress }) => {
    return (
        <View style={styles.container}>
            <Pressable style={({ pressed }) => ([{ marginRight: 20 }, pressed && { opacity: 0.5 }])} >
                <Search width={24} height={24} color={Variables.colors.black.dark900} />
            </Pressable>
            <Pressable onPress={onOptionsPress} style={({ pressed }) => ([pressed && { opacity: 0.5 }])} >
                <More width={24} height={24} color={Variables.colors.black.dark900} />
            </Pressable>
        </View>
    )
}

export default ProjectDetailsHeaderRight

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})