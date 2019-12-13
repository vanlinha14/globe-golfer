import React from 'react'
import {TouchableOpacity} from 'react-native'
import DGText from '../../../../components/DGText'

export default React.memo(({value, tint, fixSize, onPress}) => {
  return (
    <TouchableOpacity style={{
      width: fixSize ? 90 : null,
      height: fixSize ? 90 : 50,
      borderRadius: 45,
      borderColor: tint,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16
    }} onPress={onPress}>
      <DGText style={{
        color: tint,
        fontSize: 16,
        paddingHorizontal: 16,
        textAlign: 'center'
        }}>{value}</DGText>
    </TouchableOpacity>
  )
})