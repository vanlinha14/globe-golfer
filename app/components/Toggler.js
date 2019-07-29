import React from 'react'
import { Switch } from 'react-native'

const Toggler = React.memo(({isOn, onChanged}) => (
  <Switch 
    tintColor='gray' 
    thumbColor={'white'} 
    onTintColor={Theme.buttonPrimary} 
    value={isOn}
    onValueChange={onChanged}
    />
))

export default Toggler