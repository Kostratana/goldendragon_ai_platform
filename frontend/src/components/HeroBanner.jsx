import { useState } from "react";

import murzikMain from "../assets/murzik/murzik-main.png";
import svetlanaAvatar from "../assets/murzik/svetlana-avatar.png";
import murzikChat from "../assets/murzik/murzik-chat.png";

export default function HeroBanner() {

  const [language, setLanguage] = useState("en");

  const voiceTexts = {

    en: `
      Greetings.
      I am Murzik.

      I am here to guide you through the world of artificial intelligence
      and introduce you to implemented systems,
      AI architectures,
      multimodal technologies
      and investment projects created by Svetlana.

      Please proceed to the AI chat and project pages.

      Access to private project presentations,
      investment systems
      and protected AI platforms
      requires authorization from Svetlana.

      Please send an email to Svetlana
      to request investor access.

      Svetlana will provide you with
      an activation token
      or unlock access to the protected systems.

      Welcome to Golden Dragon AI Systems.
    `,

    ru: `
      Приветствую вас.
      Я Мурзик.

      Я здесь чтобы провести вам экскурсию
      в мир искусственного интеллекта
      и познакомить с уже реализованными проектами,
      AI архитектурами,
      мультимодальными технологиями
      и инвестиционными системами Светланы.

      Прошу пройти на страницу чата и проектов.

      Доступ к закрытым презентациям проектов,
      инвестиционным системам
      и защищённым AI платформам
      требует авторизации у Светланы.

      Пожалуйста напишите Светлане на электронную почту
      чтобы получить доступ к инвестиционным проектам.

      Светлана предоставит вам
      токен активации
      или откроет доступ к защищённым системам.

      Добро пожаловать в Golden Dragon AI Systems.
    `,

    fr: `
      Salutations.
      Je suis Murzik.

      Je suis ici pour vous guider dans le monde
      de l’intelligence artificielle
      et vous présenter des projets réalisés,
      des architectures IA,
      des technologies multimodales
      et des systèmes d’investissement créés par Svetlana.

      Veuillez accéder à la page du chat IA et des projets.

      L’accès aux présentations privées,
      aux systèmes d’investissement
      et aux plateformes IA protégées
      nécessite une autorisation de Svetlana.

      Veuillez envoyer un email à Svetlana
      pour demander un accès investisseur.

      Svetlana vous fournira
      un jeton d’activation
      ou débloquera l’accès aux systèmes protégés.

      Bienvenue dans Golden Dragon AI Systems.
    `,

    es: `
      Saludos.
      Soy Murzik.

      Estoy aquí para guiarte por el mundo
      de la inteligencia artificial
      y presentarte proyectos implementados,
      arquitecturas IA,
      tecnologías multimodales
      y sistemas de inversión creados por Svetlana.

      Por favor entra en la página del chat y proyectos.

      El acceso a presentaciones privadas,
      sistemas de inversión
      y plataformas IA protegidas
      requiere autorización de Svetlana.

      Por favor envía un correo electrónico a Svetlana
      para solicitar acceso a los proyectos de inversión.

      Svetlana te proporcionará
      un token de activación
      o desbloqueará el acceso a los sistemas protegidos.

      Bienvenido a Golden Dragon AI Systems.
    `,

    de: `
      Grüße.
      Ich bin Murzik.

      Ich bin hier, um Sie durch die Welt
      der künstlichen Intelligenz zu führen
      und Ihnen entwickelte Projekte,
      KI-Architekturen,
      multimodale Technologien
      und Investitionssysteme von Svetlana vorzustellen.

      Bitte betreten Sie die Chat- und Projektseite.

      Der Zugang zu privaten Projektpräsentationen,
      Investitionssystemen
      und geschützten KI-Plattformen
      erfordert eine Autorisierung von Svetlana.

      Bitte senden Sie Svetlana eine E-Mail,
      um Zugang zu den Investitionsprojekten zu erhalten.

      Svetlana wird Ihnen
      ein Aktivierungstoken bereitstellen
      oder den Zugang zu den geschützten Systemen freischalten.

      Willkommen bei Golden Dragon AI Systems.
    `,
  };

  const speakMurzik = () => {

    const speech = new SpeechSynthesisUtterance(
      voiceTexts[language]
    );

    const languageMap = {
      en: "en-US",
      ru: "ru-RU",
      fr: "fr-FR",
      es: "es-ES",
      de: "de-DE",
    };

    speech.lang = languageMap[language];

    speech.rate = 0.82;

    speech.pitch = 0.65;

    speech.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    const selectedVoice =
      voices.find(
        (voice) =>
          voice.lang.includes(language)
      );

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);
  };

  return (
    <section className="hero-section">

      <div className="hero-overlay"></div>

      <div className="hero-navbar">

        <div className="hero-logo">
          GOLDEN DRAGON AI
        </div>

        <div className="hero-nav-center">

          <button className="hero-nav-btn">
            Chat
          </button>

          <button className="hero-nav-btn">
            Projects
          </button>

          <button className="hero-nav-btn">
            Presentations
          </button>

          <button className="hero-nav-btn">
            Investor Access
          </button>

        </div>

        <div className="hero-nav-right">

          <button
            className="voice-toggle-btn"
            onClick={speakMurzik}
          >
            Voice
          </button>

          <div className="hero-language-switcher">

            <button onClick={() => setLanguage("en")}>
              EN
            </button>

            <button onClick={() => setLanguage("ru")}>
              RU
            </button>

            <button onClick={() => setLanguage("fr")}>
              FR
            </button>

            <button onClick={() => setLanguage("es")}>
              ES
            </button>

            <button onClick={() => setLanguage("de")}>
              DE
            </button>

          </div>

        </div>

      </div>

      <div className="hero-container">

        <div className="hero-left">

          <div className="hero-top-avatar">

            <img
              src={murzikChat}
              alt="Murzik Avatar"
              className="hero-chat-avatar"
            />

            <div>

              <h1 className="hero-title">
                Ask Murzik
              </h1>

              <h2 className="hero-subtitle">
                AI Business Assistant • AI Entity • Platform Guide
              </h2>

            </div>

          </div>

          <p className="hero-description">
            Welcome to Golden Dragon AI Systems.
            Murzik will guide you through advanced AI systems,
            orchestration architectures,
            multimodal technologies
            and intelligent platforms.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={speakMurzik}
            >
              Talk With Murzik
            </button>

            <button className="secondary-btn">
              Enter AI Chat
            </button>

          </div>

          <div className="hero-founder-mini">

            <img
              src={svetlanaAvatar}
              alt="Svetlana"
              className="hero-founder-avatar"
            />

            <p className="hero-founder-text">
              AI systems architect and creator of Golden Dragon AI.
            </p>

          </div>

        </div>

        <div className="hero-right">

          <div className="murzik-glow"></div>

          <div className="smoke-layer"></div>

          <div className="fire-particles"></div>

          <div className="cinematic-shadow"></div>

          <div className="murzik-image-wrapper">

            <img
              src={murzikMain}
              alt="Murzik AI"
              className="murzik-main"
            />

          </div>

        </div>

      </div>

    </section>
  );
}