import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { Variables } from '../styles/theme'

const BottomSheet = ({ isVisible, onDismiss, children, contentContainerStyle, propagateSwipe }) => {
    return (
        <Modal
            propagateSwipe={propagateSwipe ? propagateSwipe : false}
            animationInTiming={250}
            animationOutTiming={250}
            backdropTransitionInTiming={250}
            backdropTransitionOutTiming={250}
            backdropOpacity={0.5}
            isVisible={isVisible}
            onBackButtonPress={onDismiss}
            onBackdropPress={onDismiss}
            onSwipeComplete={onDismiss}
            style={styles.modal}
            swipeDirection={['down']}
            hideModalContentWhileAnimating={true}
            // hardwareAccelerated={true}
            useNativeDriver={false}
        >
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={[styles.contentContainer, contentContainerStyle]}>
                <View style={styles.handle} />
                {children}
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    contentContainer: {
        // height: '100%',
        maxHeight: 600,
        borderTopLeftRadius: Variables.borderRadius,
        borderTopRightRadius: Variables.borderRadius,
        paddingBottom: 15,
        backgroundColor: Variables.colors.white
    },
    handle: {
        alignSelf: 'center',
        backgroundColor: '#ddd',
        borderRadius: 4,
        height: 5,
        marginVertical: 10,
        width: 45
    },
    item: {
        paddingHorizontal: 20
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    }
})