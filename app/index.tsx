import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { getItem, StorageKeys } from '../hooks/useStorage';
import { Colors } from '../theme';

export default function Entry() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const done = await getItem<boolean>(StorageKeys.ONBOARDING_DONE, false);
      if (done) {
        router.replace('/(tabs)/today');
      } else {
        router.replace('/splash');
      }
    })();
  }, []);

  return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
}
