'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import './styles.css';
import { isPossiblePhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { useForm, FormProvider } from 'react-hook-form';
import FormedPhoneInput from './components/FormedPhoneInput';

export interface PhoneNum {
    phoneFullNum?: string; //E164Number;
    phoneCountryNum: string;
    phoneLocalNum: string;
}

export default function DemoPage(props: any) {
    const rhfMethods = useForm<PhoneNum>({
        defaultValues: {} as PhoneNum,
    });
    const {
        register,
        formState: { isDirty, dirtyFields, errors },
        setValue,
        control,
        reset,
        handleSubmit,
        watch,
    } = rhfMethods;
    const onSubmitTest = () => {
        console.log('onSubmitTest');
    };
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div className={styles.body}>
            <FormProvider {...rhfMethods}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmitTest)}>
                    <div>
                        <label className={`${styles.label} ${styles.required}`} htmlFor='select-phone-number'>{`What's your phone number?`}</label>
                        {
                            <FormedPhoneInput<PhoneNum>
                                control={control}
                                name={'phoneFullNum'}
                                rules={{
                                    required: 'please enter your phone number',
                                    validate: (value, formValues) => isPossiblePhoneNumber(`${value}`) || 'the phone number looks not available',
                                }}
                                id={'select-phone-number'}
                                placeholder='Enter your phone number'
                                onChange={phoneNumObj => {
                                    console.log('onChange-phoneNumObj:' + JSON.stringify(phoneNumObj));
                                    // unsafe here
                                    setValue('phoneCountryNum', phoneNumObj.phoneCountryNum);
                                    setValue('phoneLocalNum', phoneNumObj.phoneLocalNum);
                                }}
                            />
                        }
                        {errors.phoneFullNum && (
                            <p className={styles.validateAlert} role='alert'>
                                {errors.phoneFullNum.message}
                            </p>
                        )}
                    </div>
                    <div className={styles.btnSubmitBox}>
                        <input className={styles.btnSubmit} type='submit' value='Submit' />
                    </div>
                    <div className={styles.footerBox} />
                    <br />
                </form>
            </FormProvider>
        </div>
    );
}
