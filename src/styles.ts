import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  input: {
    fontSize: 18,
    backgroundColor: '#f3f3f3',
    borderBottomColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderBottomWidth: 1,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 13,
    marginVertical: 8,
    marginHorizontal: 8,
    textAlign: 'center',
    color: '#777',
  },
  resultText: {
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    width: '90%',
    marginVertical: 8,
  },
  lightDivider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '90%',
    marginVertical: 16,
  },
});
