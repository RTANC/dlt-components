export function validator (rules) {
    let err = null
    for (let i = 0; i < rules.length; i++) {
        err = rules[i]
        if (err !== true) {
          break
        }
    }
    if (err === true) {
        return false
    } else {
        return err
    }
}

export default function formValidator (formValues, setFormValues) {
    let pass = true
    const keys = Object.keys(formValues)
    const newValue = {...formValues}
    for (let i = 0; i < keys.length; i++) {
        try {
            const key = keys[i]
            if (formValues[key].rules) {
                newValue[key] = { ...formValues[key], 'error': validator(formValues[key].rules) }
                pass = pass && (newValue[key].error === false)
            }
          } catch (error) {
            
          }
    }
    setFormValues(newValue)
    return pass
}