import { View, ScrollView, SafeAreaView} from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome 
} from '../components';


import React, { useState } from 'react'

export default function Home() {
    const router = useRouter();
  return (
    <SafeAreaView style={{ felx: 1, backgroundColor: COLORS.lightWhite}}>
        <Text>Home</Text>
    </SafeAreaView>
  )
}
