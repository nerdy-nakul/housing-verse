import { Stack } from 'expo-router';

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: true, title: 'Houses' }} />
            <Stack.Screen name="details/[id]" options={{ headerShown: true, title: 'House Details' }} />
        </Stack>
    );
}
