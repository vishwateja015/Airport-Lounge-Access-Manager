import React from 'react';
import { Check, Crown, Award, Zap } from 'lucide-react';
import { toast } from 'sonner';

export const Memberships: React.FC = () => {
  const tiers = [
    {
      name: 'Silver',
      icon: Award,
      price: 0,
      color: 'from-slate-400 to-slate-600',
      bgColor: 'bg-slate-50 dark:bg-slate-800',
      borderColor: 'border-slate-300 dark:border-slate-600',
      features: [
        'Access to 50+ airport lounges',
        '1 guest per visit',
        'Basic amenities',
        'Email support',
        'Earn 1 point per $1 spent',
        'Mobile app access'
      ]
    },
    {
      name: 'Gold',
      icon: Crown,
      price: 199,
      color: 'from-amber-400 to-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-400 dark:border-amber-600',
      popular: true,
      features: [
        'Access to 150+ premium lounges',
        'Up to 2 guests per visit',
        'Priority booking',
        'Premium amenities',
        '24/7 phone support',
        'Earn 1.5 points per $1 spent',
        'Free cancellations',
        'Spa access at select lounges'
      ]
    },
    {
      name: 'Platinum',
      icon: Zap,
      price: 399,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-400 dark:border-purple-600',
      features: [
        'Unlimited access to 300+ luxury lounges',
        'Unlimited guests',
        'Instant booking confirmation',
        'VIP amenities & services',
        'Dedicated concierge',
        'Earn 2 points per $1 spent',
        'Free upgrades when available',
        'Complimentary spa treatments',
        'Private sleeping suites',
        'Fine dining experiences'
      ]
    }
  ];

  const supportedPrograms = [
    { name: 'Priority Pass', members: '5M+', logo: '🎫' },
    { name: 'LoungeKey', members: '3M+', logo: '🔑' },
    { name: 'DragonPass', members: '2M+', logo: '🐉' },
    { name: 'American Express', members: '10M+', logo: '💳' },
    { name: 'Diners Club', members: '1M+', logo: '🍽️' },
    { name: 'Mastercard', members: '8M+', logo: '💎' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Membership Plans
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Choose the perfect plan for your travel needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`${tier.bgColor} rounded-2xl p-8 border-2 ${tier.borderColor} relative ${
                tier.popular ? 'shadow-2xl scale-105 z-10' : 'shadow-lg'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center mb-6`}>
                <tier.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                  ${tier.price}
                </span>
                <span className="text-slate-600 dark:text-slate-400">/year</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => tier.price === 0
                  ? toast.info('You are already on the Silver plan.')
                  : toast.success(`Upgrading to ${tier.name}! Redirecting to checkout…`)
                }
                className={`w-full py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {tier.price === 0 ? 'Current Plan' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Supported Membership Programs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {supportedPrograms.map((program) => (
              <div
                key={program.name}
                className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-md transition"
              >
                <div className="text-4xl mb-2">{program.logo}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  {program.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{program.members} members</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure which plan to choose?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Our team can help you find the perfect membership for your travel style
          </p>
          <button onClick={() => toast.success('Our team will reach out within 24 hours!')} className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};
