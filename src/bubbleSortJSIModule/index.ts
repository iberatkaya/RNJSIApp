import { NativeModules } from 'react-native';

//@ts-ignore
const bubbleSortJSIModule: {
  bubbleSort(arr: number[]): number[];
} = global;

function isLoaded() {
  return typeof bubbleSortJSIModule.bubbleSort === 'function';
}

console.log('run');

if (!isLoaded()) {
  console.log('install');
  const result = NativeModules.BubbleSortModule?.install();
  if (!result && !isLoaded())
    throw new Error('JSI bindings were not installed for: SimpleJsi Module');

  if (!isLoaded()) {
    throw new Error('JSI bindings were not installed for: SimpleJsi Module');
  }
}

export default bubbleSortJSIModule;
