// 'use client';

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   ReactNode,
// } from 'react';
// import {
//   DefaultValues,
//   FieldValues,
//   FormProvider,
//   SubmitHandler,
//   useForm,
//   useWatch,
// } from 'react-hook-form';
// import z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

// // Tipos para o context
// export interface StepConfig<T extends FieldValues> {
//   label: string;
//   fields: (keyof T)[];
//   component: ReactNode;
//   schema: z.ZodType<Record<string, unknown>>;
// }

// export interface MultiStepFormConfig<T extends FieldValues> {
//   formSchema: z.ZodType<T>;
//   steps: StepConfig<T>[];
//   initialFormData: DefaultValues<T>;
//   labelAction: string;
//   saveFormData: SubmitHandler<T>;
// }

// export interface MultiStepFormState<T extends FieldValues> {
//   currentStep: number;
//   totalSteps: number;
//   isFirstStep: boolean;
//   isLastStep: boolean;
//   isSubmitting: boolean;
//   formData: T;
// }

// export interface MultiStepFormActions<T extends FieldValues> {
//   nextStep: () => void;
//   previousStep: () => void;
//   goToStep: (step: number) => void;
//   isValidStep: (fieldValues: T, step?: number) => boolean;
//   isPreviousStepValid: (step: number, fieldValues: T) => boolean;
//   toggleSteps: (targetStep: number, fieldValues: T) => void;
//   submitForm: () => void;
// }

// export interface MultiStepFormContextValue<T extends FieldValues> {
//   state: MultiStepFormState<T>;
//   actions: MultiStepFormActions<T>;
//   methods: ReturnType<typeof useForm<T>>;
//   config: MultiStepFormConfig<T>;
// }

// // Context
// const MultiStepFormContext =
//   createContext<MultiStepFormContextValue<FieldValues> | null>(null);

// // Provider
// export function MultiStepFormProvider<T extends FieldValues>({
//   children,
//   config,
// }: {
//   children: ReactNode;
//   config: MultiStepFormConfig<T>;
// }) {
//   const [currentStep, setCurrentStep] = useState(0);

//   const methods = useForm<T>({
//     resolver: zodResolver(config.formSchema),
//     mode: 'onBlur',
//     reValidateMode: 'onBlur',
//     defaultValues: config.initialFormData,
//   });

//   const watch = useWatch({ control: methods.control }) as T;
//   const { isSubmitting } = methods.formState;

//   // Estado
//   const state: MultiStepFormState<T> = {
//     currentStep,
//     totalSteps: config.steps.length,
//     isFirstStep: currentStep === 0,
//     isLastStep: currentStep === config.steps.length - 1,
//     isSubmitting,
//     formData: watch,
//   };

//   // Ações
//   const nextStep = useCallback(() => {
//     if (currentStep < config.steps.length - 1) {
//       setCurrentStep((step) => step + 1);
//     }
//   }, [currentStep, config.steps.length]);

//   const previousStep = useCallback(() => {
//     if (currentStep > 0) {
//       setCurrentStep((step) => step - 1);
//     }
//   }, [currentStep]);

//   const goToStep = useCallback(
//     (step: number) => {
//       if (step >= 0 && step < config.steps.length) {
//         setCurrentStep(step);
//       }
//     },
//     [config.steps.length]
//   );

//   const isValidStep = useCallback(
//     (fieldValues: T, step: number = currentStep) => {
//       const stepFields = config.steps[step].fields;
//       const stepSchema = config.steps[step].schema;

//       const isValid = stepSchema.safeParse(
//         stepFields.reduce((obj, field) => {
//           const target = fieldValues[field];
//           if (target) obj[field] = target;
//           return obj;
//         }, {} as T)
//       );

//       return isValid.success;
//     },
//     [currentStep, config.steps]
//   );

//   const isPreviousStepValid = useCallback(
//     (step: number, fieldValues: T) => {
//       if (step === 0) return true;

//       let previousStepIsComplete = false;
//       for (let i = 0; i < config.steps.length; i++) {
//         if (i === step) break;
//         if (isValidStep(fieldValues, i) === false) {
//           previousStepIsComplete = false;
//           break;
//         }
//         previousStepIsComplete = true;
//       }
//       return previousStepIsComplete;
//     },
//     [config.steps.length, isValidStep]
//   );

//   const toggleSteps = useCallback(
//     (targetStep: number, fieldValues: T) => {
//       if (targetStep === currentStep) return;
//       if (isPreviousStepValid(targetStep, fieldValues)) {
//         setCurrentStep(targetStep);
//       }
//     },
//     [currentStep, isPreviousStepValid]
//   );

//   const submitForm = useCallback(() => {
//     methods.handleSubmit(
//       async (values) => {
//         if (state.isLastStep) {
//           await config.saveFormData(values);
//         }
//         nextStep();
//       },
//       (errors) => {
//         const stepFields = config.steps[currentStep].fields;
//         const errorFields = new Set(Object.keys(errors));

//         let hasErrorInStep = false;
//         stepFields.forEach((field) => {
//           if (errorFields.has(field as string)) hasErrorInStep = true;
//         });

//         if (!hasErrorInStep) {
//           methods.clearErrors();
//           nextStep();
//         }
//       }
//     )();
//   }, [methods, state.isLastStep, config, currentStep, nextStep]);

//   const actions: MultiStepFormActions<T> = {
//     nextStep,
//     previousStep,
//     goToStep,
//     isValidStep,
//     isPreviousStepValid,
//     toggleSteps,
//     submitForm,
//   };

//   const contextValue: MultiStepFormContextValue<T> = {
//     state,
//     actions,
//     methods,
//     config,
//   };

//   return (
//     <MultiStepFormContext.Provider
//       value={contextValue as MultiStepFormContextValue<FieldValues>}
//     >
//       <FormProvider {...methods}>{children}</FormProvider>
//     </MultiStepFormContext.Provider>
//   );
// }

// // Hook para usar o context
// export function useMultiStepForm<
//   T extends FieldValues
// >(): MultiStepFormContextValue<T> {
//   const context = useContext(MultiStepFormContext);
//   if (!context) {
//     throw new Error(
//       'useMultiStepForm must be used within a MultiStepFormProvider'
//     );
//   }
//   return context as MultiStepFormContextValue<T>;
// }

// // Hook específico para navegação entre steps
// export function useStepNavigation<T extends FieldValues>() {
//   const { state, actions } = useMultiStepForm<T>();
//   return {
//     currentStep: state.currentStep,
//     totalSteps: state.totalSteps,
//     isFirstStep: state.isFirstStep,
//     isLastStep: state.isLastStep,
//     nextStep: actions.nextStep,
//     previousStep: actions.previousStep,
//     goToStep: actions.goToStep,
//     toggleSteps: actions.toggleSteps,
//     isPreviousStepValid: actions.isPreviousStepValid,
//   };
// }

// // Hook específico para validação
// export function useStepValidation<T extends FieldValues>() {
//   const { actions, methods } = useMultiStepForm<T>();
//   const watch = useWatch({ control: methods.control }) as T;

//   return {
//     isValidStep: (step?: number) => actions.isValidStep(watch, step),
//     isCurrentStepValid: actions.isValidStep(watch),
//     formData: watch,
//     errors: methods.formState.errors,
//   };
// }
