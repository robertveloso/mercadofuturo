import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Container, Section } from '../../styles/dstyles';

import { SignUpContainer } from './styles';

import CreateUser from './createUser';
import CreateClient from './createClient';
import CreateCompany from './createCompany';

export default function SingUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [provider, setProvider] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getSteps() {
    return ['Criando seu usuário', 'Finalizando'];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <CreateUser
            dispatch={dispatch}
            loading={loading}
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            provider={provider}
            setProvider={setProvider}
          />
        );
      case 1:
        return !provider ? (
          <CreateClient dispatch={dispatch} loading={loading} />
        ) : (
          <CreateCompany dispatch={dispatch} loading={loading} />
        );
    }
  }

  return (
    <Container>
      <SignUpContainer>
        <Section>
          <div style={{ textAlign: 'center' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Typography>{getStepContent(activeStep)}</Typography>
          </div>
        </Section>
      </SignUpContainer>
    </Container>
  );
}
