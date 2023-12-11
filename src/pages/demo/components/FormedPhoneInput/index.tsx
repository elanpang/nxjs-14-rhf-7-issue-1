import React from 'react';
import { useController, UseControllerProps, FieldValues, Control, useFormContext } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/core';
import '../../styles.css';
import './styles.css';
import { useState } from 'react';

export class UsCountry {
    public static readonly countryName = 'United States';
    public static readonly iso3 = 'USA';
    public static readonly iso2 = 'US';
    public static readonly nationality = 'American';
    public static readonly numCode = 840;
    public static readonly phoneCode = 1;
    public static readonly phoneCodeString = '+1';
    public static readonly tld = '.us';
    public static readonly code = this.iso2;
}

export type FormedPhoneValues = {
    phoneFullNum: E164Number;
};

export type PhoneValues = {
    phoneFullNum: E164Number;
    phoneCountryNum: string;
    phoneLocalNum: string;
};

export interface FormedPhoneInputProps<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
    id?: string;
    placeholder?: string;
    onChange?: (valueObj: PhoneValues) => void;
}

function FormedPhoneInput<T extends FieldValues = FieldValues>(props: FormedPhoneInputProps<T>) {
    // const { control = {} as Control<FieldValues> } = useFormContext<T>() ?? {};
    // const { field, fieldState } = useController({ ...props, control } as FormedPhoneInputProps<T>);
    const uhfContext = useFormContext<T>();
    const { field, fieldState } = useController(props);
    const [phoneInputValue, setPhoneInputValue] = useState<E164Number | undefined>();

    return (
        <div>
            <PhoneInput
                {...field}
                id={props?.id}
                international
                initialValueFormat='national'
                countryCallingCodeEditable={true}
                defaultCountry={UsCountry.iso2}
                placeholder={props?.placeholder}
                value={phoneInputValue}
                onChange={phoneInput => {
                    const phoneNumObj = parsePhoneNumber(phoneInput || '');
                    // console.log('phoneNumObj:' + JSON.stringify(phoneNumObj));
                    // {
                    //     "countryCallingCode":"1",
                    //     "nationalNumber":"33",
                    //     "number":"+133",
                    //     "__countryCallingCodeSource":"FROM_NUMBER_WITH_PLUS_SIGN"
                    // }
                    field.onChange(phoneInput || ''); // data send back to hook form
                    setPhoneInputValue(phoneInput);
                    if (props?.onChange) {
                        props?.onChange({
                            phoneFullNum: phoneNumObj?.number || '',
                            phoneCountryNum: phoneNumObj?.countryCallingCode || '',
                            phoneLocalNum: phoneNumObj?.nationalNumber || '',
                        });
                    }
                }}
            />
        </div>
    );
}

export default FormedPhoneInput;
