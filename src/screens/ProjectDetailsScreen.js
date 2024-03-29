import { Alert, FlatList, Color, Image, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Variables } from '../styles/theme';
import Avatar from '../components/Avatar';
import ProjectDetailStage from '../components/ProjectDetailStage';
import Screen from '../components/Screen';
import { Addsquare, Colorswatch, Editoption, Editproject, Gallery, Notasksplaceholder, Trash } from '../components/svg';
import { AuthContext } from '../store/AuthContext';
import ProjectOptionsModal from '../components/ProjectOptionsModal';
import ProjectDetailsHeaderRight from '../components/header/ProjectDetailsHeaderRight';
import BackButton from '../components/header/BackButton';
import ColorPickerModal from '../components/ColorPickerModal';
import { deleteProject, updateProjectsCollection } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import uploadProjectCover from '../utils/uploadProjectCover';
import { useHeaderHeight } from '@react-navigation/elements';
import color from 'color';
import ImageColors from 'react-native-image-colors';
import { manipulateAsync } from 'expo-image-manipulator';
import { StatusBar } from 'expo-status-bar';
import CONFIG from '../data/config';
import getImageDimensions from '../utils/getImageDimensions';
import getImageColors from '../utils/getImageColors';
import CachedImageBackground from '../components/CachedImageBackground';
import { GlobalContext } from '../store/GlobalContext';
import { EDIT_PROJECT } from '../navigations/routes';
import AvatarList from '../components/AvatarList';

const PROJECT_DETAILS_STAGES = [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Completed' }];

const ProjectDetailsScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [newProject, setNewProject] = useState(false);
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [team, setTeam] = useState([])

    const [statusBarColor, setStatusBarColor] = useState('dark');

    const { currentUser } = useContext(AuthContext);
    const { cacheImage } = useContext(GlobalContext)

    const { width } = useWindowDimensions();

    const headerIconsColor = statusBarColor === 'dark' ? Variables.colors.black.dark900 : Variables.colors.white

    const placeholderWidth = width > 350 ? 350 : width;
    const placeholderHeight = (placeholderWidth * 196) / 295;

    const headerHeight = useHeaderHeight();
    const topImageContainerHeight = 225 + headerHeight;

    useEffect(() => {

        const getStatusBarColor = async () => {
            try {
                if (project?.coverImage) {
                    const img = await cacheImage(project?.coverImage);
                    const base64img = img.replace('data:application/octet-stream', 'data:image/png');
                    const dim = await getImageDimensions(base64img);
                    const manipResult = await manipulateAsync(
                        base64img,
                        [{
                            crop: {
                                height: headerHeight,
                                originX: 0,
                                originY: 0,
                                width: dim.width
                            }
                        }]
                    );
                    const res = await getImageColors(manipResult.uri);
                    const imgColor = Platform.OS === 'android' ? res.dominant : res.background
                    const sbc = color(imgColor).isLight() ? 'dark' : 'light';
                    setStatusBarColor(sbc);
                }
            } catch (error) {
                Alert.alert(error.message);
            }
        };
        if (!CONFIG.EXPO) {
            console.log('GETTING STATUS BAR COLOR');
            getStatusBarColor();
        }

    }, [project?.coverImage]);

    useEffect(() => {
        if (route?.params?.project)
            setProject(route.params.project);
        if (route?.params?.newProject)
            setNewProject(route.params.newProject);
    }, [route?.params?.project, route?.params?.newProject]);

    useEffect(() => {
        if (route?.params?.teamUsers)
            setTeam(route.params.teamUsers)
    }, [route?.params?.teamUsers])

    const renderProjectDetailStage = ({ item }) => (<ProjectDetailStage projectTasks={project?.tasks} stage={item} />);

    const onOptionsPress = () => {
        setOptionsModalVisible(prev => (!prev));
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackButton iconColor={headerIconsColor} />,
            headerRight: () => <ProjectDetailsHeaderRight iconColor={headerIconsColor} onOptionsPress={onOptionsPress} />,
            headerTransparent: true
        });
    }, [navigation, statusBarColor]);

    // options functions
    const onSelectColor = async (color) => {
        setLoading(true);
        try {
            if (color !== project.color) {
                await updateProjectsCollection({ color }, project.id);
            }
            setShowColorPicker(false);
            setProject(prev => ({ ...prev, color }));
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onColorPickerModalDismiss = () => {
        setShowColorPicker(false);
    };

    const onChangeCoverPress = async () => {
        setOptionsModalVisible(false);
        const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('No access', 'Sorry we need camera roll permissions. Please enable the permission in settings.');
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.2,
        });

        if (!result.canceled) {
            try {
                const photoURL = await uploadProjectCover(result.assets[0].uri, project);
                await cacheImage(photoURL)
                // TODO: cache project cover images

                await updateProjectsCollection({ coverImage: photoURL }, project.id);
                setProject(prev => ({ ...prev, coverImage: photoURL }));
            } catch (error) {
                Alert.alert(error.message);
            }
        }
        setOptionsModalVisible(false);
    };

    const onEditProjectPress = () => {
        setOptionsModalVisible(false);
        navigation.navigate(EDIT_PROJECT, { project })
    }

    const onChangeColorPress = () => {
        setShowColorPicker(true);
        setOptionsModalVisible(false);
    }

    const onDeletePress = async () => {
        try {
            await deleteProject(project.id)
            navigation.goBack()
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const OPTION_ITEMS = [
        {
            name: 'Add Task',
            icon: <Addsquare width={24} color={Variables.colors.black.dark900} />
        },
        {
            name: 'Change Cover',
            icon: <Gallery width={24} />,
            onPress: onChangeCoverPress
        },
        {
            name: 'Edit Project',
            icon: <Editoption width={24} />,
            onPress: onEditProjectPress
        },
        {
            name: 'Color',
            icon: <Colorswatch width={24} />,
            onPress: onChangeColorPress
        },
        {
            name: 'Delete',
            icon: <Trash width={24} />,
            onPress: onDeletePress
        },
    ]


    return (
        <>
            <StatusBar style={statusBarColor} />
            <Screen style={styles.screenStyle}>
                {optionsModalVisible && <ProjectOptionsModal options={OPTION_ITEMS} />}
                <CachedImageBackground
                    source={{ uri: project?.coverImage }}
                    resizeMode={'cover'}
                    style={[
                        styles.topImageContainer,
                        { height: topImageContainerHeight },
                        { backgroundColor: project?.color ? project.color : Variables.colors.black.light100 }
                    ]}
                >
                    <Avatar style={styles.projectOwnerAvatar} imageUri={route?.params?.createdBy ? route.params.createdBy?.photoURL : null} />
                    {/* <View style={styles.teamContainer}>
                        {team?.map((user, index) => (<Avatar
                            imageUri={user?.photoURL}
                            key={index}
                            textStyle={styles.avatarTextStyle}
                            style={[styles.teamAvatarStyle, { marginLeft: index > 0 ? -5 : 0 }]}
                        />)
                        )}
                    </View> */}
                    <AvatarList data={team?.map(user => (user?.photoURL))} />
                </CachedImageBackground>
                <View style={styles.projectDetailsContainer}>
                    <View>
                        <Text style={styles.projectTitle}>{project?.name}</Text>
                        <Text style={styles.projectDescription}>{project?.description ? project.description : 'Add description'}</Text>
                    </View>
                    {tasks.length > 0
                        ?
                        <FlatList
                            data={PROJECT_DETAILS_STAGES}
                            renderItem={renderProjectDetailStage}
                            keyExtractor={(item, index) => index}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={<View style={{ padding: 10 }} />}
                            style={{ marginLeft: -10 }}
                            contentContainerStyle={{ padding: 10 }}
                        />
                        :
                        <View style={styles.noTasksPlaceholderContainer}>
                            <Notasksplaceholder width={placeholderWidth} height={placeholderHeight} />
                            <Text style={styles.noTasksPlaceholderTitle}>No tasks here yet</Text>
                            <Text style={styles.noTasksPlaceholderSubtitle}>Add task first</Text>
                        </View>
                    }
                </View>
                <ColorPickerModal
                    showModal={showColorPicker}
                    onSelectColor={onSelectColor}
                    value={project?.color}
                    loading={loading}
                    onDismiss={onColorPickerModalDismiss}
                />
            </Screen>
        </>
    );
};

export default ProjectDetailsScreen;

const styles = StyleSheet.create({
    screenStyle: {
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    topImageContainer: {
        height: 225,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    projectOwnerAvatar: {
        borderWidth: 2,
        borderColor: Variables.colors.brand.default
    },
    projectIconText: {
        fontSize: 15,
        color: Variables.colors.brand.default,
        fontWeight: 'bold'
    },
    teamContainer: {
        flexDirection: 'row'
    },
    projectDetailsContainer: {
        // borderWidth: 1,
        flex: 1,
        backgroundColor: Variables.colors.white,
        padding: 20,
    },
    projectTitle: {
        fontSize: 28,
        color: Variables.colors.black.dark900,
        fontWeight: 'bold'
    },
    projectDescription: {
        fontSize: 14,
        color: Variables.colors.black.light400,
        marginTop: 15,
        marginBottom: 20
    },
    avatarTextStyle: {
        fontSize: 10,
        color: Variables.colors.white
    },
    teamAvatarStyle: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: Variables.colors.white,
        backgroundColor: Variables.colors.brand.dark700
    },
    noTasksPlaceholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noTasksPlaceholderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Variables.colors.black.light400,
        marginTop: 30
    },
    noTasksPlaceholderSubtitle: {
        fontSize: 14,
        color: Variables.colors.black.light300,
        marginTop: 5
    }
});