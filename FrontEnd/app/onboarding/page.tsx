'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { QuestionCard } from '@/components/onboarding/QuestionCard';
import { PrivacyNoticeModal } from '@/components/onboarding/PrivacyNoticeModal';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type LearningRoute = 'basico' | 'intermedio' | 'inversion' | 'ahorro' | 'deuda';
type LearningLevel = 'basico' | 'intermedio' | 'intermedio-avanzado';

type StepOption = {
  id: string;
  label: string;
  value: string;
  route: LearningRoute;
  level: LearningLevel;
};

type StepConfig = {
  id: string;
  title: string;
  description: string;
  options: StepOption[];
};

const steps = [
  {
    id: 'mainGoal',
    title: '¿Cuál es tu objetivo principal ahora mismo?',
    description: 'Elegiremos una ruta inicial en función de lo que más te importa.',
    options: [
      {
        id: 'saveCalm',
        label: 'Ahorrar para tener tranquilidad y no llegar justo a fin de mes',
        value: 'saveCalm',
        route: 'ahorro',
        level: 'basico',
      },
      {
        id: 'orderExpenses',
        label: 'Ordenar mis gastos y dejar de improvisar',
        value: 'orderExpenses',
        route: 'basico',
        level: 'basico',
      },
      {
        id: 'debtControl',
        label: 'Salir de deudas o aprender a manejarlas mejor',
        value: 'debtControl',
        route: 'deuda',
        level: 'basico',
      },
      {
        id: 'startInvesting',
        label: 'Empezar a invertir, aunque sea poco',
        value: 'startInvesting',
        route: 'inversion',
        level: 'intermedio',
      },
    ],
  },
  {
    id: 'confidence',
    title: '¿Qué tan cómodo te sientes con presupuesto, interés e inflación?',
    description: 'Esto define el nivel de complejidad con el que empezarás.',
    options: [
      {
        id: 'newbie',
        label: 'Casi nada, soy principiante',
        value: 'newbie',
        route: 'basico',
        level: 'basico',
      },
      {
        id: 'someKnowledge',
        label: 'Conozco lo esencial, pero me cuesta aplicarlo',
        value: 'someKnowledge',
        route: 'intermedio',
        level: 'intermedio',
      },
      {
        id: 'strongKnowledge',
        label: 'Los entiendo bien y quiero avanzar',
        value: 'strongKnowledge',
        route: 'inversion',
        level: 'intermedio-avanzado',
      },
    ],
  },
  {
    id: 'emergency',
    title: 'Si tuvieras un gasto imprevisto hoy, ¿qué harías?',
    description: 'Con esto definimos si conviene fortalecer primero tu estabilidad.',
    options: [
      {
        id: 'needDebt',
        label: 'No podría cubrirlo sin endeudarme',
        value: 'needDebt',
        route: 'deuda',
        level: 'basico',
      },
      {
        id: 'partialCover',
        label: 'Podría cubrir una parte, pero me costaría',
        value: 'partialCover',
        route: 'ahorro',
        level: 'basico',
      },
      {
        id: 'fullCover',
        label: 'Podría cubrirlo completo con mis ahorros',
        value: 'fullCover',
        route: 'inversion',
        level: 'intermedio',
      },
    ],
  },
  {
    id: 'moneyManagement',
    title: '¿Cómo sueles gestionar tu dinero cada mes?',
    description: 'Esto nos dice qué tan estructurado debe ser tu plan inicial.',
    options: [
      {
        id: 'noControl',
        label: 'No llevo control',
        value: 'noControl',
        route: 'basico',
        level: 'basico',
      },
      {
        id: 'partialControl',
        label: 'Anoto gastos a veces, pero no soy constante',
        value: 'partialControl',
        route: 'intermedio',
        level: 'intermedio',
      },
      {
        id: 'solidControl',
        label: 'Ya tengo presupuesto y lo sigo casi siempre',
        value: 'solidControl',
        route: 'inversion',
        level: 'intermedio-avanzado',
      },
    ],
  },
  {
    id: 'learningFormat',
    title: '¿Qué formato prefieres para aprender?',
    description: 'Personalizamos el tipo de contenido para que avances con constancia.',
    options: [
      {
        id: 'microlearning',
        label: 'Lecciones cortas y simples (2-5 min)',
        value: 'microlearning',
        route: 'basico',
        level: 'basico',
      },
      {
        id: 'weeklyChallenges',
        label: 'Retos prácticos semanales',
        value: 'weeklyChallenges',
        route: 'intermedio',
        level: 'intermedio',
      },
      {
        id: 'simulations',
        label: 'Casos reales y simulaciones',
        value: 'simulations',
        route: 'inversion',
        level: 'intermedio-avanzado',
      },
      {
        id: 'hybrid',
        label: 'Mezcla de teoría corta + práctica',
        value: 'hybrid',
        route: 'ahorro',
        level: 'intermedio',
      },
    ],
  },
] as const satisfies StepConfig[];

function getRouteHint(route: LearningRoute, level: LearningLevel) {
  const routeLabel: Record<LearningRoute, string> = {
    basico: 'Ruta: Presupuesto y fundamentos',
    intermedio: 'Ruta: Hábitos financieros prácticos',
    inversion: 'Ruta: Inversión y optimización',
    ahorro: 'Ruta: Ahorro y fondo de emergencia',
    deuda: 'Ruta: Deuda y control financiero',
  };

  const levelLabel: Record<LearningLevel, string> = {
    basico: 'Nivel básico',
    intermedio: 'Nivel intermedio',
    'intermedio-avanzado': 'Nivel intermedio-avanzado',
  };

  return `${routeLabel[route]} · ${levelLabel[level]}`;
}

function resolveLearningPath(answers: Record<string, string>) {
  const routeScore: Record<LearningRoute, number> = {
    basico: 0,
    intermedio: 0,
    inversion: 0,
    ahorro: 0,
    deuda: 0,
  };

  const levelScore: Record<LearningLevel, number> = {
    basico: 0,
    intermedio: 0,
    'intermedio-avanzado': 0,
  };

  steps.forEach((step) => {
    const selectedValue = answers[step.id];
    const selectedOption = step.options.find((option) => option.value === selectedValue);
    if (!selectedOption) return;
    routeScore[selectedOption.route] += 1;
    levelScore[selectedOption.level] += 1;
  });

  const learningRoute = (Object.entries(routeScore).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    'basico') as LearningRoute;
  const learningLevel = (Object.entries(levelScore).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    'basico') as LearningLevel;

  return { learningRoute, learningLevel };
}

export default function OnboardingPage() {
  const router = useRouter();
  const { onboarding, setOnboarding, isAuthenticated } = useAppStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const learningAnswers = onboarding.learningAnswers ?? {};

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (onboarding.hasCompletedOnboarding) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, onboarding.hasCompletedOnboarding, router]);

  const handlePrivacyAccept = () => {
    setOnboarding({ privacyAccepted: true });
  };

  const handleOptionSelect = (value: string) => {
    const stepId = steps[currentStepIndex].id;
    setOnboarding({
      learningAnswers: {
        ...learningAnswers,
        [stepId]: value,
      },
    });
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      const answers = learningAnswers;
      const { learningRoute, learningLevel } = resolveLearningPath(answers);
      const mainGoal = answers.mainGoal ?? '';
      setOnboarding({
        goals: mainGoal ? [mainGoal] : [],
        learningRoute,
        learningLevel,
        hasCompletedOnboarding: true,
        currentStep: 0,
      });
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const currentStep = steps[currentStepIndex];
  const currentValue = learningAnswers[currentStep.id];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <PrivacyNoticeModal 
        isOpen={!onboarding.privacyAccepted} 
        onAccept={handlePrivacyAccept} 
      />

      <div className="w-full max-w-md">
        <StepIndicator 
          totalSteps={steps.length} 
          currentStep={currentStepIndex} 
        />

        <div className="relative overflow-hidden min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                title={currentStep.title}
                description={currentStep.description}
                options={currentStep.options.map((option) => ({
                  ...option,
                  routeHint: getRouteHint(option.route, option.level),
                }))}
                selectedValue={currentValue}
                onSelect={handleOptionSelect}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className="rounded-xl px-6 h-12"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Atrás
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!currentValue}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 font-semibold shadow-lg shadow-primary/20 transition-all duration-300 active:scale-95"
          >
            {currentStepIndex === steps.length - 1 ? (
              <>
                Finalizar
                <CheckCircle2 className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      <p className="mt-12 text-muted-foreground text-sm flex items-center gap-2">
        Paso {currentStepIndex + 1} de {steps.length}
      </p>
    </div>
  );
}
