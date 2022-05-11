import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import bubbleSortJSIModule from './bubbleSortJSIModule';
import bubbleSortModule from './bubbleSortModule';
import styles from './styles';

const App = () => {
  const [numberOfArrays, setNumberOfArrays] = useState<number | null>(5);
  const [subArrayLength, setSubArrayLength] = useState<number | null>(5);
  const [numberOfArraysJSI, setNumberOfArraysJSI] = useState<number | null>(5);
  const [subArrayLengthJSI, setSubArrayLengthJSI] = useState<number | null>(5);
  const [numberOfArraysNM, setNumberOfArraysNM] = useState<number | null>(5);
  const [subArrayLengthNM, setSubArrayLengthNM] = useState<number | null>(5);
  const [randomSortedArrayJSI, setRandomSortedArrayJSI] = useState<
    number[] | null
  >(null);
  const [randomSortedArrayNM, setRandomSortedArrayNM] = useState<
    number[] | null
  >(null);
  const [jsiResult, setJsiResult] = useState<number | null>(null);
  const [nativeModuleResult, setNativeModuleResult] = useState<number | null>(
    null,
  );
  const [randomArrays, setRandomArrays] = useState<number[][]>([]);
  const [changedInput, setChangedInput] = useState(true);

  const displayArray = (arr: number[]) => {
    if (arr.length > 10) {
      return JSON.stringify(arr.slice(0, 10))
        .replace(/\,/g, ', ')
        .replace(']', ', ...]');
    }
    return JSON.stringify(arr).replace(/\,/g, ', ');
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Bubble Sort JSI vs Native Modules</Text>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <Text>Number of Arrays: </Text>
          <TextInput
            style={styles.input}
            value={numberOfArrays?.toString() ?? ''}
            onChangeText={val => {
              const newVal = parseInt(val);
              setChangedInput(true);
              if (newVal) setNumberOfArrays(newVal);
              else if (val === '') setNumberOfArrays(null);
            }}
          />
        </View>
        <View style={styles.inputRow}>
          <Text>Each Sub Array Length: </Text>
          <TextInput
            style={styles.input}
            value={subArrayLength?.toString() ?? ''}
            onChangeText={val => {
              const newVal = parseInt(val);
              setChangedInput(true);
              if (newVal) setSubArrayLength(newVal);
              else if (val === '') setSubArrayLength(null);
            }}
          />
        </View>
        <Text style={styles.subTitle}>
          {`${numberOfArrays ?? '0'} arrays with each array having ${
            subArrayLength ?? '0'
          } random unsorted elements`}
        </Text>
        <Button
          title="Generate Arrays"
          onPress={() => {
            if (subArrayLength && numberOfArrays) {
              const myRandomArrays: number[][] = Array.from(
                { length: numberOfArrays },
                () =>
                  Array.from({ length: subArrayLength }, () =>
                    Math.floor(Math.random() * 99999),
                  ),
              );
              setRandomArrays(myRandomArrays);
              setChangedInput(false);
            }
          }}
        />
        <Button
          title={`Sort all subarrays using JSI Bubble Sort`}
          disabled={changedInput}
          onPress={async () => {
            if (subArrayLength && numberOfArrays) {
              const sortedArrays: number[][] = [];
              // @ts-ignore
              const start = performance.now();
              for (const arr of randomArrays) {
                const sortedArray = bubbleSortJSIModule.bubbleSort(arr);
                sortedArrays.push(sortedArray);
              }
              // @ts-ignore
              const end = performance.now();
              setRandomSortedArrayJSI(
                sortedArrays[
                  Math.floor(
                    (Math.random() * sortedArrays.length) % sortedArrays.length,
                  )
                ],
              );
              setJsiResult(end - start);
              setNumberOfArraysJSI(numberOfArrays);
              setSubArrayLengthJSI(subArrayLength);
            }
          }}
        />
        <Button
          title={`Sort all subarrays Native Modules Bubble Sort`}
          disabled={changedInput}
          onPress={async () => {
            if (subArrayLength && numberOfArrays) {
              const randomArrays: number[][] = Array.from(
                { length: numberOfArrays },
                () =>
                  Array.from({ length: subArrayLength }, () =>
                    Math.floor(Math.random() * 99999),
                  ),
              );
              const sortedArrays: number[][] = [];
              // @ts-ignore
              const start = performance.now();
              for (const arr of randomArrays) {
                const sortedArray = await bubbleSortModule.bubbleSort(arr);
                sortedArrays.push(sortedArray);
              }
              // @ts-ignore
              const end = performance.now();
              setRandomSortedArrayNM(
                sortedArrays[
                  Math.floor(
                    (Math.random() * sortedArrays.length) % sortedArrays.length,
                  )
                ],
              );
              setNativeModuleResult(end - start);
              setNumberOfArraysNM(numberOfArrays);
              setSubArrayLengthNM(subArrayLength);
            }
          }}
        />
        <View style={styles.divider} />
        {jsiResult !== null && !!randomSortedArrayJSI && (
          <Text style={styles.resultText}>
            Sorted {numberOfArraysJSI ?? '0'} arrays with each array having
            {' ' + subArrayLengthJSI ?? '0'} elements using JSI{'\n\n'}
            Random Sorted JSI Array:{'\n'}
            {displayArray(randomSortedArrayJSI)}
            {'\n\n'}JSI: {jsiResult}ms
          </Text>
        )}
        {jsiResult !== null && nativeModuleResult !== null && (
          <View style={styles.lightDivider} />
        )}
        {nativeModuleResult !== null && !!randomSortedArrayNM && (
          <Text style={styles.resultText}>
            Sorted {numberOfArraysNM ?? '0'} arrays with each array having
            {' ' + subArrayLengthNM ?? '0'} elements using Native Modules
            {'\n\n'}
            Random Sorted Native Modules Array:{'\n'}
            {displayArray(randomSortedArrayNM)}
            {'\n\n'}Native Modules: {nativeModuleResult}ms
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
