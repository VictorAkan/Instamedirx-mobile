import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ModalProps,
} from 'react-native'


interface CancelUploadModalProps extends Pick<ModalProps, 'visible'> {
  onCancel: () => void
  onReturn: () => void
}

const CancelUploadModal: React.FC<CancelUploadModalProps> = ({
  visible,
  onCancel,
  onReturn,
}) => (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={onReturn}
  >
    <View style={styles.overlay}>
      <View style={styles.container}>
       <View style={styles.header}>
  <Text style={styles.title}>Cancel Upload?</Text>
  <Text style={{color: '#FF0000', fontSize: 24}}>✗</Text>
</View>

        <Text style={styles.subtitle}>
          Don't worry your progress will be saved when you cancel upload
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Yes, Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.returnButton}
            onPress={onReturn}
            activeOpacity={0.8}
          >
            <Text style={styles.returnButtonText}>Return</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 344,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    rowGap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    columnGap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#04337F',
    fontFamily: 'Montserrat',
    letterSpacing: 0.04 * 16,
    lineHeight: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(4, 51, 127, 0.60)',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.04 * 16,
  },
  buttons: {
    flexDirection: 'row',
    columnGap: 24,
    justifyContent: 'center',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#0866FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Open Sans',
    lineHeight: 28,
    letterSpacing: 0.04 * 14,
  },
  returnButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnButtonText: {
    color: '#7F55AA',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Open Sans',
    lineHeight: 28,
    letterSpacing: 0.04 * 14,
  },
})

export default CancelUploadModal