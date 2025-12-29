import { StyleSheet } from 'react-native';
import { colors } from './colors';


export const commonStyles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        color: colors.subText,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    link: {
        color: colors.primary,
        textAlign: 'center',
        marginTop: 16,
        fontWeight: '500',
    },
    error: {
        color: colors.error,
        fontSize: 13,
        marginBottom: 8,
        textAlign: 'center'
    },
});
