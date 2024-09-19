import ReactNative from 'react-native'
import I18n from 'react-native-i18n'

import en from './en.json'
import hi from './hi.json'
import mr from './mr.json'
import gu from './gu.json'

I18n.fallbacks = false;

I18n.translations = {
    en,
    hi,
    mr,
    gu
}

export default I18n

export function translator(name, language='en') {
    I18n.locale = language;
    return I18n.t(name);
}