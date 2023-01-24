import { Alert, FlatList, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Screen from '../components/Screen'
import Avatar from '../components/Avatar'
import { Variables } from '../styles/theme'
import PrimaryButton from '../components/PrimaryButton'
import { Logout, Notification, ProfileCircle, Proplan } from '../components/svg'
import SettingsListItem from '../components/SettingsListItem'
import { AuthContext } from '../store/AuthContext'
import { ACCOUNT_DETAILS, LOGIN, ONBOARDING } from '../navigations/routes'

const ProfileScreen = ({ navigation }) => {
    const { logOut, currentUser, setCurrentUser } = useContext(AuthContext)

    const handleLogOut = async () => {
        try {
            await logOut()
            navigation.reset({ index: 1, routes: [{ name: ONBOARDING }, { name: LOGIN }] })
            setCurrentUser(null)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const renderSettingsItem = ({ item }) => (
        <SettingsListItem
            name={item.name}
            RightComponent={item?.RightComponent}
            onPress={item.onPress}
        />
    )

    return (
        <Screen style={{ paddingVertical: 20 }}>
            <Avatar style={styles.avatarStyle} textStyle={styles.avatarText} imageUri={currentUser?.photoURL} />
            <Text style={styles.title}>{currentUser?.displayName}</Text>
            <Text style={styles.roleText}>Free member</Text>
            <PrimaryButton
                text={'Upgrade Plan - Pro'}
                textStyle={styles.planButtonText}
                IconRight={<Proplan width={24} height={24} />}
            />
            <FlatList
                style={{ marginTop: 40 }}
                data={[
                    {
                        name: 'Account Details',
                        RightComponent: <ProfileCircle width={24} height={24} color={Variables.colors.black.light400} />,
                        onPress: () => navigation.navigate(ACCOUNT_DETAILS)
                    },
                    {
                        name: 'Notifications',
                        RightComponent: <Notification width={24} height={24} color={Variables.colors.black.light400} />
                    },
                    {
                        name: 'Dark Mode'
                    },
                    {
                        name: 'Logout',
                        RightComponent: <Logout width={24} height={24} color={Variables.colors.black.light400} />,
                        onPress: handleLogOut
                    },
                ]}
                renderItem={renderSettingsItem}
                keyExtractor={(item) => item.name}
                ItemSeparatorComponent={<View style={{ height: 1, backgroundColor: Variables.colors.black.light100 }} />}
            />
        </Screen>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    avatarStyle: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: Variables.colors.brand.default,
        alignSelf: 'center'
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Variables.colors.black.dark900,
        textAlign: 'center',
        marginTop: 30
    },
    roleText: {
        fontSize: 14,
        color: Variables.colors.black.light400,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    planButtonText: {
        fontWeight: 'bold'
    }
})