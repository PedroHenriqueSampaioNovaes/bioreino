# MultiStepFormContext

Este context abstrai todas as funcionalidades do componente de formulário multi-steps, permitindo reutilização e flexibilidade.

## Funcionalidades

- ✅ Gerenciamento de estado do formulário multi-steps
- ✅ Navegação entre steps (anterior, próximo, ir para step específico)
- ✅ Validação de steps individuais e validação de steps anteriores
- ✅ Controle de submissão do formulário
- ✅ Hooks customizados para diferentes necessidades
- ✅ TypeScript com tipagem completa

## Como usar

### 1. Configuração básica

```tsx
import { MultiStepFormProvider } from './context/MultiStepFormContext';

const config = {
  formSchema: myFormSchema,
  steps: [
    {
      label: 'Dados Pessoais',
      fields: ['name', 'email'],
      component: <PersonalDataForm />,
      schema: personalDataSchema,
    },
    {
      label: 'Pagamento',
      fields: ['cardNumber', 'cvv'],
      component: <PaymentForm />,
      schema: paymentSchema,
    },
  ],
  initialFormData: {},
  labelAction: 'Finalizar',
  saveFormData: async (data) => {
    // Lógica para salvar os dados
  },
};

function MyForm() {
  return (
    <MultiStepFormProvider config={config}>
      <MyFormContent />
    </MultiStepFormProvider>
  );
}
```

### 2. Hooks disponíveis

#### `useMultiStepForm<T>()`

Hook principal que retorna o context completo:

```tsx
function MyComponent() {
  const { state, actions, methods, config } = useMultiStepForm<MyFormData>();

  // state: informações do estado atual
  // actions: funções para manipular o formulário
  // methods: métodos do react-hook-form
  // config: configuração do formulário
}
```

#### `useStepNavigation<T>()`

Hook específico para navegação:

```tsx
function NavigationComponent() {
  const {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    goToStep,
    toggleSteps,
    isPreviousStepValid,
  } = useStepNavigation<MyFormData>();
}
```

#### `useStepValidation<T>()`

Hook específico para validação:

```tsx
function ValidationComponent() {
  const { isValidStep, isCurrentStepValid, formData, errors } =
    useStepValidation<MyFormData>();
}
```

### 3. Exemplos de uso

#### Navegação customizada

```tsx
function CustomNavigation() {
  const { currentStep, totalSteps, nextStep, previousStep } =
    useStepNavigation<MyFormData>();
  const { isCurrentStepValid } = useStepValidation<MyFormData>();

  return (
    <div>
      <button onClick={previousStep} disabled={currentStep === 0}>
        Anterior
      </button>
      <span>
        {currentStep + 1} de {totalSteps}
      </span>
      <button onClick={nextStep} disabled={!isCurrentStepValid}>
        Próximo
      </button>
    </div>
  );
}
```

#### Indicador de progresso

```tsx
function ProgressBar() {
  const { currentStep, totalSteps } = useStepNavigation<MyFormData>();

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}
```

#### Validação em tempo real

```tsx
function StepValidator() {
  const { isCurrentStepValid, errors } = useStepValidation<MyFormData>();

  return (
    <div>
      {!isCurrentStepValid && (
        <div className="error-message">Corrija os erros antes de continuar</div>
      )}
      {Object.keys(errors).length > 0 && (
        <ul>
          {Object.entries(errors).map(([field, error]) => (
            <li key={field}>{error?.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

#### Controle de submissão

```tsx
function SubmitButton() {
  const { state, actions } = useMultiStepForm<MyFormData>();
  const { isCurrentStepValid } = useStepValidation<MyFormData>();

  return (
    <button
      onClick={actions.submitForm}
      disabled={!isCurrentStepValid || state.isSubmitting}
    >
      {state.isSubmitting
        ? 'Salvando...'
        : state.isLastStep
        ? 'Finalizar'
        : 'Próximo'}
    </button>
  );
}
```

## Vantagens da abstração

1. **Reutilização**: O context pode ser usado em qualquer componente
2. **Flexibilidade**: Diferentes componentes podem usar diferentes aspectos do context
3. **Manutenibilidade**: Lógica centralizada em um local
4. **Testabilidade**: Fácil de testar isoladamente
5. **TypeScript**: Tipagem completa para melhor DX
6. **Performance**: Hooks específicos evitam re-renders desnecessários

## Migração do componente Steps

O componente `Steps` original foi refatorado para usar o context, mantendo a mesma API externa. Isso significa que:

- ✅ Não há breaking changes na API
- ✅ O componente continua funcionando como antes
- ✅ Agora você pode usar o context em outros lugares
- ✅ Melhor separação de responsabilidades
