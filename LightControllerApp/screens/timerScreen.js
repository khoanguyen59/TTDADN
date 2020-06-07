import React from 'react';
import ScreenTemplate from './screenTemplate';
import TimerItem from '../components/timerItem';

const screenIdx = 4;

export default function timerScreen({ navigation }) {
  const timerItem = (
    <TimerItem
      deviceName={'Light 69'}
      setTime={'9:00'}
      setDates={[true, true, false, true, true, true, false]}
    />
  )

  return (
    <ScreenTemplate
      screenIndex={ screenIdx }
      navigation={ navigation }
      bodyComponents={ timerItem }
    />
  )
}
