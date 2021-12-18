
//was trying to get names from file system automatically using expo-file-system but only seem to be ab le to read files
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
  
  