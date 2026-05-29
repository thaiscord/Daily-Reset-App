import { View, Text } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F2EA',
      }}
    >
      <Text style={{ fontSize: 24 }}>
        Daily Reset
      </Text>
    </View>
  );
}