// 'use client';

// import { ReactNode } from 'react';
// import { FieldValues, DefaultValues, SubmitHandler } from 'react-hook-form';
// import z from 'zod';
// import {
//   MultiStepFormProvider,
//   useMultiStepForm,
//   useStepValidation,
// } from '../../context/MultiStepFormContext';
// import styles from './steps.module.css';
// import classNames from 'classnames';
// import { useFormContext } from 'react-hook-form';

// interface IStep<T extends FieldValues> {
//   formSchema: z.ZodTypeAny;
//   steps: {
//     label: string;
//     fields: (keyof T)[];
//     component: ReactNode;
//     schema: z.ZodTypeAny;
//   }[];
//   initialFormData: DefaultValues<T>;
//   labelAction: string;
//   saveFormData: SubmitHandler<T>;
// }

// export default function Steps<T extends FieldValues>({
//   formSchema,
//   steps,
//   initialFormData,
//   labelAction,
//   saveFormData,
// }: IStep<T>) {
//   const config = {
//     formSchema,
//     steps,
//     initialFormData,
//     labelAction,
//     saveFormData,
//   };

//   return (
//     <MultiStepFormProvider config={config}>
//       <StepsContent />
//     </MultiStepFormProvider>
//   );
// }

// function StepsContent<T extends FieldValues>() {
//   const { state, actions, config } = useMultiStepForm<T>();
//   const {
//     formState: { isSubmitting },
//   } = useFormContext();

//   const labels = config.steps.map(({ label }) => label);

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         actions.submitForm();
//       }}
//     >
//       <Labels
//         labels={labels}
//         toggleSteps={actions.toggleSteps}
//         isPreviousStepValid={actions.isPreviousStepValid}
//       />

//       {config.steps[state.currentStep].component}

//       <Button
//         labelAction={config.labelAction}
//         previousStep={actions.previousStep}
//         noPreviousStep={state.isFirstStep}
//         noNextStep={state.isLastStep}
//         isValidStep={actions.isValidStep}
//         isSubmitting={isSubmitting}
//       />
//     </form>
//   );
// }

// interface ILabels<T extends FieldValues> {
//   labels: string[];
//   toggleSteps: (targetStep: number, fieldValues: T) => void;
//   isPreviousStepValid: (step: number, fieldValues: T) => boolean;
// }

// function Labels<T extends FieldValues>({
//   labels,
//   toggleSteps,
//   isPreviousStepValid,
// }: ILabels<T>) {
//   const { formData } = useStepValidation<T>();

//   return (
//     <div className={styles.labels}>
//       {labels.map((label, i) => (
//         <button
//           type="button"
//           key={label}
//           className={styles.buttonLabel}
//           onClick={() => toggleSteps(i, formData)}
//           disabled={!isPreviousStepValid(i, formData)}
//         >
//           <span className={styles.number}>{i + 1}.</span>
//           <span className={styles.label}>{label}</span>
//         </button>
//       ))}
//     </div>
//   );
// }

// interface IButton<T extends FieldValues> {
//   labelAction: string;
//   previousStep: () => void;
//   noPreviousStep: boolean;
//   noNextStep: boolean;
//   isValidStep: (fieldValues: T) => boolean;
//   isSubmitting: boolean;
// }

// function Button<T extends FieldValues>({
//   labelAction,
//   previousStep,
//   noPreviousStep,
//   noNextStep,
//   isValidStep,
//   isSubmitting,
// }: IButton<T>) {
//   const { formData } = useStepValidation<T>();

//   return (
//     <div className={styles.buttonContainer}>
//       <button
//         type="button"
//         onClick={previousStep}
//         disabled={noPreviousStep}
//         className={classNames(styles.button, styles.prevButton)}
//       >
//         Anterior
//       </button>

//       <button
//         type="submit"
//         disabled={!isValidStep(formData) || isSubmitting}
//         className={classNames(styles.button, styles.nextButton)}
//         style={isSubmitting ? { cursor: 'wait' } : {}}
//       >
//         {noNextStep ? labelAction : 'Próximo'}
//       </button>
//     </div>
//   );
// }
