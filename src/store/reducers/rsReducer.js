const initialState = {
  termsAccepted: false,
  selectedDateAndTime: '',
  rsInfo: {
    firstName: '',
    lastName: '',
    email: '',
    semester: 1,
    abschluss: 'bachelor',
    fach: '',
    firstLanguage: '',
    secondLanguage: '',
    foreignLanguage: '',
    terminReasons: {
      ideenEntwickeln: false,
      unwohlBeimSchreiben: false,
      dozEmpfehlung: false,
      wissenschaftlichkeitLernen: false,
      feedback: false
    },
    otherTerminReason: '',
    reachedBy: {
      flyer: false,
      dozierende: false,
      socialMedia: false,
      ov: false,
      kommilitonen: false
    }
  }
};

const rsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_TERMS':
      return {
        ...state,
        termsAccepted: !state.termsAccepted
      };
      break;
    case 'SELECT_SLOT':
      return {
        ...state,
        selectedDateAndTime: action.selectedDateAndTime
      };
      break;
    default:
      return state;
  }
}

export default rsReducer;
