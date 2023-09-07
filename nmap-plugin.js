const { AndroidConfig, ConfigPlugin, withAndroidManifest, withProjectBuildGradle, withInfoPlist } = require('expo/config-plugins');
const {
    createGeneratedHeaderComment,
    MergeResults,
    removeGeneratedContents,
} = require('@expo/config-plugins/build/utils/generateCode');
const { ExpoConfig } = require('expo/config');

// Using helpers keeps error messages unified and helps cut down on XML format changes.
const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } = AndroidConfig.Manifest;

// Splitting this function out of the mod makes it easier to test.
async function setCustomConfigAsync(
    config,
    clientId,
    androidManifest
) {
    // Get the <application /> tag and assert if it doesn't exist.
    const mainApplication = getMainApplicationOrThrow(androidManifest);
    
    addMetaDataItemToMainApplication(
        mainApplication,
        // value for `android:name`
        'com.naver.maps.map.CLIENT_ID',
        // value for `android:value`
        clientId
    );
    
    return androidManifest;
}

const gradleMaven = [
    `allprojects { repositories { maven { url('https://naver.jfrog.io/artifactory/maven/') } } }`,
].join('\n');

const appendContents = ({
                            src,
                            newSrc,
                            tag,
                            comment,
                        }) => {
    const header = createGeneratedHeaderComment(newSrc, tag, comment);
    if (!src.includes(header)) {
        // Ensure the old generated contents are removed.
        const sanitizedTarget = removeGeneratedContents(src, tag);
        const contentsToAdd = [
            // @something
            header,
            // contents
            newSrc,
            // @end
            `${comment} @generated end ${tag}`,
        ].join('\n');
        
        return {
            contents: sanitizedTarget ?? src + contentsToAdd,
            didMerge: true,
            didClear: !!sanitizedTarget,
        };
    }
    return { contents: src, didClear: false, didMerge: false };
}

const addNmapImport = (src) => {
    return appendContents({
        tag: 'react-native-naver-map',
        src,
        newSrc: gradleMaven,
        comment: '//',
    });
}

const withNaverMap = (config, { clientId }) => {
    // add Manifest
    const config1 = withAndroidManifest(config, async config => {
        // Modifiers can be async, but try to keep them fast.
        config.modResults = await setCustomConfigAsync(config, clientId, config.modResults);
        return config;
    });
    
    // add maven repository to build.gradle
    const config2 = withProjectBuildGradle(config1, config => {
        if (config.modResults.language === 'groovy') {
            config.modResults.contents = addNmapImport(config.modResults.contents).contents;
        } else {
            throw new Error('Cannot add camera maven gradle because the build.gradle is not groovy');
        }
        return config;
    });
    
    // add to info.Plist
    const config3 = withInfoPlist(config2, config => {
        config.modResults.NMFClientId = clientId;
        return config;
    });
    
    return config3;
}

module.exports = withNaverMap;