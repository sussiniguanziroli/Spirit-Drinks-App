import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colores } from '../global/colores'

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Icon name="photo-camera" size={24} color='#fff'/>
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colores.doradoApagado,
        width: 48,
        height: 48,
        borderRadius: 32,
    }
})