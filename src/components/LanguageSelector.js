import React from "react";
import {withTranslation} from "react-i18next";
import {changeLanguage} from "../api/apiCall";

const LanguageSelector = (props)=>{

   const  onChangeLanguage = language => {
        const {i18n} = props;
        i18n.changeLanguage(language)
        changeLanguage(language)

    }

    return(

        <div className="container" >
            <img  src="https://www.countryflags.io/tr/flat/24.png" alt="Turkish Flag"
                 onClick={() => onChangeLanguage('tr')}/>
            <img  src="https://www.countryflags.io/us/flat/24.png" alt="American Flag"
                 onClick={() => onChangeLanguage('en')}/>
        </div>
    )

}

export default withTranslation()(LanguageSelector)