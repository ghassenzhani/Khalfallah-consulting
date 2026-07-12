import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import LeadForm from '@/app/components/LeadForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-50">
      <Navbar />

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">NOUS CONTACTER</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Prenez rendez-vous dès maintenant</h1>
            <p className="max-w-xl mx-auto mt-4 text-zinc-600">
              Sélectionnez la date et l'horaire qui vous conviennent. Notre équipe confirmera votre rendez-vous dans les plus brefs délais.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
                <h3 className="font-semibold text-xl mb-6">Nos coordonnées</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900">Adresse</div>
                      <div className="text-sm text-zinc-500 mt-1">Avenue de la Liberté<br />Tunis, Tunisie</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900">Téléphone / WhatsApp</div>
                      <a href="tel:+21698123456" className="text-sm text-zinc-500 mt-1 hover:text-rose-600 block">+216 98 123 456</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900">Email</div>
                      <a href="mailto:contact@khalfallahconsulting.com" className="text-sm text-zinc-500 mt-1 hover:text-rose-600 block">contact@khalfallahconsulting.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900">Horaires d'ouverture</div>
                      <div className="text-sm text-zinc-500 mt-1">Lundi - Vendredi<br />09:00 - 18:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-100 shadow-sm h-full flex flex-col justify-center">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
