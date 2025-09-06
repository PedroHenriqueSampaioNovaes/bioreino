'use client';

import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import styles from './steps.module.css';
import classNames from 'classnames';

import { ReactNode, useState } from 'react';
import z, { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface IStep<T extends FieldValues> {
  formSchema: ZodSchema<T>;
  steps: {
    label: string;
    fields: (keyof T)[];
    component: ReactNode;
    schema: ZodSchema;
  }[];
  initialFormData: DefaultValues<T>;
  labelAction: string;
  saveFormData: SubmitHandler<T>;
}

export default function Steps<T extends FieldValues>({
  formSchema,
  steps,
  initialFormData,
  labelAction,
  saveFormData,
}: IStep<T>) {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: initialFormData,
  });

  function noPreviousStep() {
    return currentStep === 0;
  }

  function noNextStep() {
    return currentStep === steps.length - 1;
  }

  function previousStep() {
    if (noPreviousStep()) return;
    setCurrentStep((step) => step - 1);
  }

  function nextStep() {
    if (noNextStep()) return;
    setCurrentStep((step) => step + 1);
  }

  function isValidStep(fieldValues: T, step: number = currentStep) {
    const stepFields = steps[step].fields;
    const stepSchema = steps[step].schema;

    const isValid = stepSchema.safeParse(
      stepFields.reduce((obj, field) => {
        const target = fieldValues[field];
        if (target) obj[field] = target;

        return obj;
      }, {} as T)
    );

    return isValid.success;
  }

  function isPreviousStepValid(step: number, fieldValues: T) {
    if (step === 0) return true;

    let previousStepIsComplete = false;
    for (let i = 0; i < steps.length; i++) {
      if (i === step) break;
      if (isValidStep(fieldValues, i) === false) {
        previousStepIsComplete = false;
        break;
      }
      previousStepIsComplete = true;
    }
    return previousStepIsComplete;
  }

  function toggleSteps(targetStep: number, fieldValues: T) {
    if (targetStep === currentStep) return;
    if (isPreviousStepValid(targetStep, fieldValues))
      setCurrentStep(targetStep);
  }

  const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (errors) => {
    const stepFields = steps[currentStep].fields;
    const errorFields = new Set(Object.keys(errors));

    let hasErrorInStep = false;
    stepFields.forEach((field) => {
      if (errorFields.has(field as string)) hasErrorInStep = true;
    });

    if (!hasErrorInStep) {
      methods.clearErrors();
      nextStep();
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values
  ) => {
    if (noNextStep()) await saveFormData(values);
    nextStep();
  };

  const labels = steps.map(({ label }) => label);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <Labels
          labels={labels}
          toggleSteps={toggleSteps}
          isPreviousStepValid={isPreviousStepValid}
        />

        {steps[currentStep].component}

        <Button
          labelAction={labelAction}
          previousStep={previousStep}
          noPreviousStep={noPreviousStep}
          noNextStep={noNextStep}
          isValidStep={isValidStep}
        />
      </form>
    </FormProvider>
  );
}

interface ILabels<T extends FieldValues> {
  labels: string[];
  toggleSteps: (targetStep: number, fieldValues: T) => void;
  isPreviousStepValid: (step: number, fieldValues: T) => boolean;
}

function Labels<T extends FieldValues>({
  labels,
  toggleSteps,
  isPreviousStepValid,
}: ILabels<T>) {
  const watch = useWatch() as T;

  return (
    <div className={styles.labels}>
      {labels.map((label, i) => (
        <button
          type="button"
          key={label}
          className={styles.buttonLabel}
          onClick={() => toggleSteps(i, watch)}
          disabled={!isPreviousStepValid(i, watch)}
        >
          <span className={styles.number}>{i + 1}.</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
}

interface IButton<T extends FieldValues> {
  labelAction: string;
  previousStep: () => void;
  noPreviousStep: () => boolean;
  noNextStep: () => boolean;
  isValidStep: (fieldValues: T) => boolean;
}

function Button<T extends FieldValues>({
  labelAction,
  previousStep,
  noPreviousStep,
  noNextStep,
  isValidStep,
}: IButton<T>) {
  const watch = useWatch() as T;
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        onClick={previousStep}
        disabled={noPreviousStep()}
        className={classNames(styles.button, styles.prevButton)}
      >
        Anterior
      </button>

      <button
        type="submit"
        disabled={!isValidStep(watch) || isSubmitting}
        className={classNames(styles.button, styles.nextButton)}
        style={isSubmitting ? { cursor: 'wait' } : {}}
      >
        {noNextStep() ? labelAction : 'Próximo'}
      </button>
    </div>
  );
}
