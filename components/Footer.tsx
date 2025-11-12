
import React from 'react';
import { TwitterIcon, LinkedInIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

const Footer: React.FC = () => {
  const { t, isLoaded } = useTranslations();

  const socialLinks = [
    { name: 'Twitter', icon: <TwitterIcon />, href: 'https://x.com/mubser0' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/company/mubser-%D9%85%D9%8F%D8%A8%D8%B5%D8%B1/about/?viewAsMember=true' },
  ];
  
  const navLinks = [
      { page: '#home', key: 'home' },
      { page: '#sign-to-text', key: 'signToText' },
      { page: '#text-to-sign', key: 'textToSign' },
      { page: '#faq', key: 'faq' }
  ];

  if (!isLoaded) return <footer className="bg-primary py-12 sm:py-16" />;

  return (
    <footer className="bg-primary text-accent py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-center lg:text-right">
          
          <div className="flex flex-col items-center lg:items-start">
            <a href="#home" className="mb-4">
              <img src="https://i.postimg.cc/SsZ3p19W/logo-bsr.png" alt={t('header.logoAlt')} className="h-16 object-contain" />
            </a>
            <p className="max-w-xs text-accent/70 leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">{t('footer.quickLinksTitle')}</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.key}>
                  <a href={link.page} className="text-accent/70 hover:text-secondary transition-colors">{t(`header.nav.${link.key}`)}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{t('footer.followUsTitle')}</h3>
            <div className="flex justify-center lg:justify-end gap-5">
              {socialLinks.map(social => (
                <a key={social.name} href={social.href} aria-label={social.name} className="text-accent/70 hover:text-secondary transition-colors">
                  {React.cloneElement(social.icon, { className: 'w-7 h-7' })}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-accent/20 mt-10 pt-6 text-center text-accent/60">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
