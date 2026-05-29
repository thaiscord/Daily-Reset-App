import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const tabs = [
  { name: 'today', label: 'Today', icon: 'sunny' },
  { name: 'habits', label: 'Habits', icon: 'checkmark-circle' },
  { name: 'progress', label: 'Progress', icon: 'stats-chart' },
  { name: 'mindset', label: 'Mindset', icon: 'bulb' },
  { name: 'profile', label: 'Profile', icon: 'person' },
] as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.backgroundSecondary,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: Spacing.sm,
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          marginTop: 2,
        },
      }}
    >
      {tabs.map(tab => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? tab.icon as IoniconsName : `${tab.icon}-outline` as IoniconsName}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
