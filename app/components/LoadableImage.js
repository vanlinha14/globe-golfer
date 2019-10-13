import React from 'react'
import { ActivityIndicator, ImageBackground } from 'react-native'

export default React.memo((props) => {
  const [state, setState] = React.useState({loading: true})

  const onLoadEnd = () => {
    setState({loading: false})
  }

  return (
    <ImageBackground
      {...props}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center'
        },
        props.style,
      ]}
      imageStyle={props.style}
      onLoadEnd={onLoadEnd}
    >
        <ActivityIndicator animating={ state.loading } size='large' />
    </ImageBackground>
  )
  
})