// 'use client';

// import { ReactNode } from 'react';
// import { FieldValues, DefaultValues, SubmitHandler } from 'react-hook-form';
// import z from 'zod';
// import {
//   MultiStepFormProvider,
//   useMultiStepForm,
//   useStepNavigation,
//   useStepValidation,
// } from '../../context/MultiStepFormContext';

// // Exemplo de como usar o context em outros componentes

// // 1. Componente que usa o context completo
// export function MultiStepFormExample<T extends FieldValues>({
//   formSchema,
//   steps,
//   initialFormData,
//   labelAction,
//   saveFormData,
// }: {
//   formSchema: z.ZodTypeAny;
//   steps: Array<{
//     label: string;
//     fields: (keyof T)[];
//     component: ReactNode;
//     schema: z.ZodTypeAny;
//   }>;
//   initialFormData: DefaultValues<T>;
//   labelAction: string;
//   saveFormData: SubmitHandler<T>;
// }) {
//   const config = {
//     formSchema,
//     steps,
//     initialFormData,
//     labelAction,
//     saveFormData,
//   };

//   return (
//     <MultiStepFormProvider config={config}>
//       <CustomStepNavigation />
//       <CustomStepContent />
//       <CustomStepControls />
//     </MultiStepFormProvider>
//   );
// }

// // 2. Componente que usa apenas navegação
// function CustomStepNavigation<T extends FieldValues>() {
//   const {
//     currentStep,
//     totalSteps,
//     isFirstStep,
//     isLastStep,
//     nextStep,
//     previousStep,
//     goToStep,
//   } = useStepNavigation<T>();
//   const { isCurrentStepValid } = useStepValidation<T>();

//   return (
//     <div>
//       <h3>
//         Step {currentStep + 1} of {totalSteps}
//       </h3>
//       <div>
//         <button onClick={previousStep} disabled={isFirstStep}>
//           Previous
//         </button>
//         <button onClick={nextStep} disabled={isLastStep || !isCurrentStepValid}>
//           Next
//         </button>
//       </div>
//       <div>
//         {Array.from({ length: totalSteps }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => goToStep(i)}
//             disabled={i > currentStep}
//             style={{
//               backgroundColor: i === currentStep ? 'blue' : 'gray',
//               color: 'white',
//               margin: '5px',
//               padding: '10px',
//             }}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // 3. Componente que usa apenas o conteúdo do step
// function CustomStepContent<T extends FieldValues>() {
//   const { state, config } = useMultiStepForm<T>();

//   return (
//     <div>
//       <h2>{config.steps[state.currentStep].label}</h2>
//       {config.steps[state.currentStep].component}
//     </div>
//   );
// }

// // 4. Componente que usa apenas controles
// function CustomStepControls<T extends FieldValues>() {
//   const { state, actions, config } = useMultiStepForm<T>();
//   const { isCurrentStepValid } = useStepValidation<T>();

//   return (
//     <div>
//       <button onClick={actions.previousStep} disabled={state.isFirstStep}>
//         ← Previous
//       </button>

//       <button
//         onClick={actions.submitForm}
//         disabled={!isCurrentStepValid || state.isSubmitting}
//       >
//         {state.isLastStep ? config.labelAction : 'Next →'}
//       </button>

//       {state.isSubmitting && <span>Submitting...</span>}
//     </div>
//   );
// }

// // 5. Componente que usa validação específica
// export function StepValidationIndicator<T extends FieldValues>() {
//   const { isCurrentStepValid, errors } = useStepValidation<T>();

//   return (
//     <div>
//       <div style={{ color: isCurrentStepValid ? 'green' : 'red' }}>
//         {isCurrentStepValid ? '✓ Step is valid' : '✗ Step has errors'}
//       </div>
//       {Object.keys(errors).length > 0 && (
//         <div>
//           <h4>Errors:</h4>
//           <ul>
//             {Object.keys(errors).map((field) => (
//               <li key={field}>{field}: Invalid field</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// // 6. Componente que monitora o progresso
// export function ProgressTracker<T extends FieldValues>() {
//   const { state } = useMultiStepForm<T>();

//   const progress = ((state.currentStep + 1) / state.totalSteps) * 100;

//   return (
//     <div>
//       <div
//         style={{
//           width: '100%',
//           backgroundColor: '#f0f0f0',
//           borderRadius: '10px',
//           overflow: 'hidden',
//         }}
//       >
//         <div
//           style={{
//             width: `${progress}%`,
//             height: '20px',
//             backgroundColor: '#4CAF50',
//             transition: 'width 0.3s ease',
//           }}
//         />
//       </div>
//       <p>{Math.round(progress)}% Complete</p>
//     </div>
//   );
// }
