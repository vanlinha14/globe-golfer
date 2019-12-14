import React from 'react'
import {TouchableOpacity} from 'react-native'
import DGText from '../../../../components/DGText'

export default React.memo(({value, tint, fixSize, size = 90, onPress}) => {
  return (
    <TouchableOpacity style={{
      width: fixSize ? size : null,
      height: fixSize ? size : 50,
      borderRadius: size/2,
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