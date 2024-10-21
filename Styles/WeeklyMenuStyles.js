import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  arrowText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dateBox: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateBox: {
    backgroundColor: '#90EE90',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  mealContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  mealColumn: {
    marginBottom: 30,
  },
  mealText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  mealBox: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 6,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  mealBoxText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#90EE90',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default styles;
