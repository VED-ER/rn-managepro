import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import InputPrimary from '../components/InputPrimary'
import Screen from '../components/Screen'
import PrimaryButton from '../components/PrimaryButton'
import { Variables } from '../styles/theme'
import { Addsquare, Search, Trash } from '../components/svg'
import { collection, getDocs } from 'firebase/firestore'
import { getUsers, searchUsers, updateProjectsCollection } from '../../firebase'
import debounce from '../utils/debounce'
import TeamItem from '../components/TeamItem'
import { EDIT_PROJECT } from '../navigations/routes'

const TeamScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState({})
    const [team, setTeam] = useState([])
    const [users, setUsers] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [lastVisible, setLastVisible] = useState()
    const [loadMore, setLoadMore] = useState(true)

    useEffect(() => {
        if (route?.params?.project) {
            setProject(route.params.project)
            setTeam(route.params.project?.team ? route.params.project.team : [])
        }
    }, [route?.params?.project])

    useEffect(() => {
        getUsers().then(snapshot => {
            const usersData = []
            snapshot.docs.forEach(doc => {
                usersData.push({ ...doc.data(), id: doc.id })
            })
            setLastVisible(snapshot.docs[snapshot.docs.length - 1])
            setUsers(usersData)
        }).catch(err => {
            Alert.alert(err.message)
        })
            .finally(() => setLoading(false))
    }, [])

    const performSearch = (searchText) => {
        if (!searchText) {
            setUsers([]);
            return;
        }
        setLoading(true)
        console.log('SEARCHING');
        searchUsers(searchText)
            .then(snapshot => {
                const usersData = []
                snapshot.docs.forEach(doc => {
                    usersData.push({ ...doc.data(), id: doc.id })
                })
                console.log('ud ', usersData);
                setSearchResult(usersData)
            })
            .catch(err => {
                Alert.alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    const optimizedSearch = useCallback(debounce(performSearch), []);

    useEffect(() => {
        if (searchValue)
            optimizedSearch(searchValue)
    }, [searchValue])

    const renderItem = ({ item }) => {
        const isInTeam = team.find(userId => userId === item.id)
        const Icon = isInTeam ?
            <Trash width={24} height={24} />
            :
            <Addsquare width={24} height={24} color={Variables.colors.brand.default} />

        const onIconPress = (id) => {
            if (isInTeam) {
                setTeam(prevTeam => prevTeam.filter(userId => userId !== id))
            } else {
                const u = users.find(user => user.id === id)
                setTeam(prevTeam => ([...prevTeam, u.id]))
            }
        }

        return (<TeamItem onIconPress={onIconPress} name={item.name} id={item.id} photoUri={item.photoURL} IconRight={Icon} />)
    }

    const onEndReached = () => {
        if (loadMore) {
            getUsers(lastVisible).then(snapshot => {
                if (snapshot.empty) {
                    setLoadMore(false)
                    return
                }
                const usersData = []
                snapshot.docs.forEach(doc => {
                    usersData.push({ ...doc.data(), id: doc.id })
                })
                setLastVisible(snapshot.docs[snapshot.docs.length - 1])
                setUsers(prevUsers => [...prevUsers, ...usersData])
            }).catch(err => {
                Alert.alert(err.message)
            })
                .finally(() => setLoading(false))
        }
    }

    const onDonePress = async () => {
        let teamNotChanged = true
        if (project?.team?.length !== team.length) {
            teamNotChanged = false
        } else {
            project?.team?.forEach(userId => {
                if (!team.includes(userId))
                    teamNotChanged = false
            })
        }
        if (teamNotChanged) {
            navigation.goBack()
            return
        }
        navigation.navigate(EDIT_PROJECT, { team })
    }
    console.log(project?.team);
    console.log(team);
    return (
        <Screen style={styles.screen}>
            <View>
                <Text style={styles.title}>Team</Text>
                <InputPrimary
                    placeholder={'Search name...'}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    style={{ marginBottom: 30 }}
                    IconRight={<Search width={24} height={24} color={Variables.colors.black.dark900} />}
                />
            </View>
            <FlatList
                data={searchValue ? searchResult : users}
                renderItem={renderItem}
                keyExtractor={(item, index) => item?.id ? item.id : index}
                ItemSeparatorComponent={<View style={{ height: 1, backgroundColor: Variables.colors.black.light100 }} />}
                onEndReached={onEndReached}
            />
            <PrimaryButton
                text={'Done'}
                onPress={onDonePress}
                loading={loading}
            />
        </Screen>
    )
}

export default TeamScreen

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 30,
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Variables.colors.black.dark900,
        marginBottom: 30
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Variables.colors.black.dark900
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    }
})