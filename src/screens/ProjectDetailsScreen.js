import { Alert, FlatList, Color, Image, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Variables } from '../styles/theme';
import Avatar from '../components/Avatar';
import ProjectDetailStage from '../components/ProjectDetailStage';
import Screen from '../components/Screen';
import { Addsquare, Colorswatch, Editoption, Editproject, Gallery, Notasksplaceholder, Trash } from '../components/svg';
import { AuthContext } from '../store/AuthContext';
import ProjectOptionsModal from '../components/ProjectOptionsModal';
import ProjectDetailsHeaderRight from '../components/header/ProjectDetailsHeaderRight';
import ColorPickerModal from '../components/ColorPickerModal';
import { updateProjectsCollection } from '../../firebase';
import downloadImage from '../utils/downloadImage';
import * as ImagePicker from 'expo-image-picker';
import uploadProjectCover from '../utils/uploadProjectCover';
import { useHeaderHeight } from '@react-navigation/elements';
import color from 'color';
import ImageColors from 'react-native-image-colors';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { StatusBar } from 'expo-status-bar';
import CONFIG from '../data/config';
import getImageDimensions from '../utils/getImageDimensions';
import getImageColors from '../utils/getImageColors';

const PROJECT_DETAILS_STAGES = [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Completed' }];

const ProjectDetailsScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [newProject, setNewProject] = useState(false);
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const [statusBarColor, setStatusBarColor] = useState('light');

    const { currentUser, avatarUrl } = useContext(AuthContext);

    const { width } = useWindowDimensions();

    const placeholderWidth = width > 350 ? 350 : width;
    const placeholderHeight = (placeholderWidth * 196) / 295;

    const headerHeight = useHeaderHeight();
    const topImageContainerHeight = 225 + headerHeight;

    useEffect(() => {

        const prepareCover = async () => {
            try {
                if (project?.coverImage) {
                    const img = await downloadImage(project?.coverImage);
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
                        }],
                        { base64: true }
                    );
                    const res = await getImageColors(manipResult.uri);
                    const sbc = color(res.dominant).isLight() ? 'dark' : 'light';
                    setStatusBarColor(sbc);
                }
            } catch (error) {
                Alert.alert(error.message);
            }
        };
        if (!CONFIG.EXPO)
            prepareCover();

    }, [project?.coverImage]);

    useEffect(() => {
        if (route?.params?.project)
            setProject(route.params.project);
        if (route?.params?.newProject)
            setNewProject(route.params.newProject);
    }, [route?.params?.project, route?.params?.newProject]);

    const renderProjectDetailStage = ({ item }) => (<ProjectDetailStage projectTasks={project?.tasks} stage={item} />);

    const onOptionsPress = () => {
        setOptionsModalVisible(prev => (!prev));
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <ProjectDetailsHeaderRight onOptionsPress={onOptionsPress} />,
            headerTransparent: true
        });
    }, [navigation]);

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
                // const img = await downloadImage(photoURL)
                // TODO: cache project cover images

                await updateProjectsCollection({ coverImage: photoURL }, project.id);
                setProject(prev => ({ ...prev, coverImage: photoURL }));
            } catch (error) {
                Alert.alert(error.message);
            }
        }
        setOptionsModalVisible(false);
    };

    const OPTION_ITEMS = useMemo(() => (
        [
            {
                name: 'Add Task',
                icon: <Addsquare width={24} />
            },
            {
                name: 'Change Cover',
                icon: <Gallery width={24} />,
                onPress: onChangeCoverPress
            },
            {
                name: 'Edit Project',
                icon: <Editoption width={24} />
            },
            {
                name: 'Color',
                icon: <Colorswatch width={24} />,
                onPress: () => {
                    setShowColorPicker(true);
                    setOptionsModalVisible(false);
                }
            },
            {
                name: 'Delete',
                icon: <Trash width={24} />
            },
        ]
    ), []);

    return (
        <>
            <StatusBar style={statusBarColor} />
            <Screen style={styles.screenStyle}>
                {optionsModalVisible && <ProjectOptionsModal options={OPTION_ITEMS} />}
                <ImageBackground
                    source={{ uri: project?.coverImage }}
                    resizeMode={'cover'}
                    style={[
                        styles.topImageContainer,
                        { height: topImageContainerHeight },
                        { backgroundColor: project?.color ? project.color : Variables.colors.black.light100 }
                    ]}
                >
                    <Avatar style={styles.projectOwnerAvatar} imageUri={newProject ? avatarUrl : null} />
                    <View style={styles.teamContainer}>
                        {project?.team?.map((i, index) => (<Avatar
                            key={index}
                            textStyle={styles.avatarTextStyle}
                            style={[styles.teamAvatarStyle, { marginLeft: index > 0 ? -5 : 0 }]}
                        />)
                        )}
                    </View>
                </ImageBackground>
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