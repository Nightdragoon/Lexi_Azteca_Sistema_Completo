'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Header } from '@/components/Header';
import { WhatsAppCallout } from '@/components/notifications/WhatsAppCallout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { 
  ChevronLeft, 
  Send, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  Loader2,
  ExternalLink
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, setNotificationConfig } = useAppStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendCode = () => {
    setIsValidating(true);
    // Simulate Twilio API call
    setTimeout(() => {
      setIsValidating(false);
      setShowOtpInput(true);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setNotificationConfig({ phoneValidated: true, sms: true });
      setShowOtpInput(false);
    }, 1500);
  };

  const toggleTelegram = () => {
    if (!notifications.telegramLinked) {
      // Simulate linking telegram
      window.open('https://t.me/LexiFinanciaBot', '_blank');
      setNotificationConfig({ telegramLinked: true, telegram: true });
    } else {
      setNotificationConfig({ telegram: !notifications.telegram });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-[800px] mx-auto min-h-screen relative shadow-2xl flex flex-col bg-background">
        <Header />
        
        <main className="p-6 flex-1 overflow-y-auto pb-28">
          <div className="mb-8 flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Alertas y Notificaciones</h1>
              <p className="text-muted-foreground text-sm">Configura cómo quieres recibir tus actualizaciones.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Telegram Section */}
            <section className="p-6 rounded-3xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0088cc]/10 flex items-center justify-center">
                    <Send className="w-5 h-5 text-[#0088cc]" />
                  </div>
                  <div>
                    <h3 className="font-bold">Telegram</h3>
                    <p className="text-xs text-muted-foreground">Alertas instantáneas y seguras</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.telegram} 
                  onCheckedChange={toggleTelegram}
                />
              </div>
              
              {!notifications.telegramLinked ? (
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl border-[#0088cc]/20 text-[#0088cc] hover:bg-[#0088cc]/5"
                  onClick={toggleTelegram}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Vincular con @LexiFinanciaBot
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                  <CheckCircle2 className="w-4 h-4" />
                  Cuenta de Telegram vinculada correctamente
                </div>
              )}
            </section>

            {/* SMS Section */}
            <section className="p-6 rounded-3xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Mensajes SMS</h3>
                    <p className="text-xs text-muted-foreground">Validación vía Twilio</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.sms} 
                  disabled={!notifications.phoneValidated}
                  onCheckedChange={(val) => setNotificationConfig({ sms: val })}
                />
              </div>

              {!notifications.phoneValidated ? (
                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {!showOtpInput ? (
                      <motion.div 
                        key="phone"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-2"
                      >
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            placeholder="Número a 10 dígitos" 
                            className="pl-10 rounded-xl"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <Button 
                          onClick={handleSendCode}
                          disabled={phoneNumber.length < 10 || isValidating}
                          className="rounded-xl px-6"
                        >
                          {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Validar'}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="otp"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <p className="text-xs text-muted-foreground">Introduce el código enviado de 6 dígitos</p>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="000000" 
                            className="text-center tracking-[1em] font-bold text-lg rounded-xl"
                            value={otp}
                            maxLength={6}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                          <Button 
                            onClick={handleVerifyOtp}
                            disabled={otp.length < 6 || isValidating}
                            className="rounded-xl px-6 bg-primary"
                          >
                            {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirmar'}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                  <CheckCircle2 className="w-4 h-4" />
                  Teléfono verificado vía Twilio SMS
                </div>
              )}
            </section>

            <WhatsAppCallout />
          </div>
        </main>
      </div>
    </div>
  );
}
