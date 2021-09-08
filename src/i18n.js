import i18n from 'i18next';

import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password mismatch': 'Password mismatch',
                'Username': 'Username',
                'DisplayName': 'DisplayName',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Login': 'Login'
            }
        },
        tr: {
            translations: {

                'Sign Up': 'Kayit ol',
                'Password mismatch': 'Ayni sifreyi giriniz',
                'Username': 'Kullanici adi',
                'DisplayName': 'Tercih edilen isim',
                'Password': 'Parola',
                'Password Repeat': 'Parola tekrarla',
                'Login': 'Sisteme gir'

            }
        }


    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
})
export default i18n;