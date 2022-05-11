import { NativeModules } from 'react-native';

export default {
  bubbleSort: async (arr: number[]): Promise<number[]> =>
    await NativeModules.BubbleSortModule.bubbleSort(arr),
};
