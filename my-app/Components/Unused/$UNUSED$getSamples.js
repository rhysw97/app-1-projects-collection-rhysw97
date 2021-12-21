
//was trying to get names from file system automatically using expo-file-system but only seem to be able to read files and not get the file names (or atleast from the documentation I 
//couldn't figure out how that was done so I opted to hard code them by using node js and then printing out all the names of the samples to the console and then copying and pasting 
//them into 2D arrays)
import * as FileSystem from 'expo-file-system';

const cScale = FileSystem.cacheDirectory +  'c-scale';

async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(cScale);
    if (!dirInfo.exists) {
      console.log("directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(cScale, { intermediates: true });
    }
}

export async function getSample(fileSystem) {
    await ensureDirExists();
  
    const fileUri = gifFileUri(gifId);
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
  
    if (!fileInfo.exists) {
      console.log("Gif isn't cached locally. Downloading...");
      await FileSystem.downloadAsync(gifUrl(gifId), fileUri);
    }
    
    return fileUri;
  }
  
  