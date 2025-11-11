
import { useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const arTranslations = {
  "header": {
    "nav": {
      "home": "الرئيسية",
      "signToText": "إشارة إلى نص",
      "textToSign": "نص إلى إشارة",
      "faq": "الأسئلة الشائعة"
    },
    "logoAlt": "شعار مُبصِر",
    "homeAria": "الصفحة الرئيسية لـ مُبصِر",
    "darkModeAria": "تفعيل الوضع الداكن",
    "lightModeAria": "تفعيل الوضع الفاتح",
    "toggleLanguageAria": "تبديل اللغة",
    "openMenuAria": "فتح القائمة",
    "closeMenuAria": "إغلاق القائمة"
  },
  "hero": {
    "title": "ترجمة لغة الإشارة لحظيًا",
    "subtitle": {
      "line1": "مُبصِر يساعدك على تواصل ثنائي متكامل",
      "line2": "يحوّل لغة الإشارة إلى كلمات منطوقة،",
      "line3": "والكلمات إلى إشارة — بسلاسة وفي اللحظة نفسها."
    },
    "ctaButton": "ابدأ الآن"
  },
  "whyMubsir": {
    "title": "لماذا مُبصِر؟",
    "features": [
      {
        "icon": "fast",
        "title": "سريع",
        "description": "معالجة فورية ومباشرة داخل المتصفح لضمان استجابة لحظية دون تأخير."
      },
      {
        "icon": "accurate",
        "title": "دقيق",
        "description": "نستخدم نماذج ذكاء اصطناعي متطورة ومُدرّبة للتعرّف على الإشارات الشائعة بكفاءة عالية."
      },
      {
        "icon": "private",
        "title": "خاص",
        "description": "خصوصيتك هي أولويتنا. لا نُخزّن أو نشارك صورك أو فيديوهاتك على الإطلاق."
      },
      {
        "icon": "bilingual",
        "title": "ترجمة ثنائية",
        "description": "يحوّل لغة الإشارة إلى كلمات منطوقة، والكلمات إلى إشارة — بسلاسة وفي اللحظة نفسها."
      }
    ]
  },
  "howToUse": {
    "title": "كيفية الاستخدام",
    "steps": [
      {
        "icon": "camera",
        "title": "امنح الإذن للكاميرا",
        "description": "اضغط على زر \"تشغيل الكاميرا\" واسمح للمتصفح بالوصول إليها."
      },
      {
        "icon": "hand",
        "title": "لوّح بإشارتك",
        "description": "قف بوضوح أمام الكاميرا وقم بالإشارة داخل الإطار المحدد."
      },
      {
        "icon": "read",
        "title": "اقرأ واستمع للترجمة",
        "description": "شاهد النص يظهر فورًا على الشاشة واستمع للنطق الصوتي."
      }
    ]
  },
  "team": {
    "title": "تعرّف على فريق مُبصِر",
    "viewDetails": "عرض التفاصيل",
    "members": [
      {
        "id": "ahmed",
        "name": "أحمد الرشيد",
        "title": "قائد الفريق ومهندس ذكاء اصطناعي",
        "avatar": "https://i.postimg.cc/YCdRJrCv/ahmd.jpg",
        "bio": "أنا طالب علوم حاسب في جامعة شقراء، ومهندس ذكاء اصطناعي، ومطور تطبيقات iOS، ومطور متكامل (Full-Stack Developer)، شغوف بابتكار حلول تقنية حديثة تجمع بين الذكاء الاصطناعي وتطوير البرمجيات. شاركت في قيادة وتطوير مشاريع مؤثرة مثل صلة لترجمة أحرف لغة الإشارة، وEduEye للتنبؤ بالمتعثرين واكتشاف الموهوبين، إضافة إلى تطوير Velorent لتأجير السيارات الشخصية، كما كنت جزءًا من فريق عمل على مشروع يسرا لتسهيل الوصول للأماكن المهيأة لذوي الإعاقة. حققت مع فريقي المركز الثاني في هاكاثون كواليثون بين 63 فريقًا من 30 جامعة. كما حصدت المركز الأول ثلاث سنوات متتالية في الملتقى العلمي بالجامعة بمسار الفكرة المتميزة بريادة الأعمال. أنا خريج المعسكر التأسيسي للذكاء الاصطناعي من أبل، وبرنامج سامسونج للذكاء الاصطناعي. أحمل شهادة القيادة العالمية من جامعة كوفنتري ببريطانيا بعد اختياري ضمن أفضل 16 طالبًا في الجامعة. كما حققت المركز الاول في هاكاثون المبادرات الشبابيه حول المملكة بمشروع طوع لجعل الساعات التطوعيه كتنافس جامعي. هذه الإنجازات عززت مهاراتي في القيادة، الابتكار، والجودة، وأسعى لتسخير التقنية في صناعة حلول واقعية ملهمة.",
        "linkedin": "https://www.linkedin.com/in/ahmed-k-alrasheed-446b8829b"
      },
      {
        "id": "amirah",
        "name": "اميرة الدعجاني",
        "title": "مهندسة البيانات",
        "avatar": "https://i.postimg.cc/fbdq44t7/Amirah.jpg",
        "bio": "طالبة في السنة الأخيرة بقسم علوم الحاسب – مسار الذكاء الاصطناعي. أمتلك خبرة عملية في الذكاء الاصطناعي، إنترنت الأشياء، تحليل البيانات، وأتمتة العمليات الروبوتية. نفذت عدة مشاريع بارزة مثل \"صلة\" لترجمة أحرف لغة الإشارة و\"غراس\" لاكتشاف أمراض النباتات. كما طورت نظام حجز مواقف ذكي يعتمد على الذكاء الاصطناعي وIoT. شاركت في هاكاثونات وتحديات تقنية وحصلت على المركز الثاني في هاكاثون المدن الذكية. أنجزت تدريبًا متنوعًا في مجموعة الخريف شمل تحليل البيانات، RPA، وتطوير الويب، إضافةً إلى معسكر سامسونج للذكاء الاصطناعي. وحصلت على شهادات احترافية مستقلة في الذكاء الاصطناعي، إنترنت الأشياء، وتحليل البيانات.",
        "linkedin": "https://www.linkedin.com/in/aldajanii/"
      },
      {
        "id": "abdulrazzaq",
        "name": "عبدالرزاق الدوسري",
        "title": "مطور متكامل",
        "avatar": "https://i.postimg.cc/26szkNTt/self-Pecture.png",
        "bio": "طالب في السنة اﻷخيرة بقسم علوم الحاسب - مسار الذكاء اﻷصطناعي. مهتم بتسخير الذكاء اﻻصطناعي لتطوير حلول تعليمية مبتكرة. طﻮّر نموذﺟًا تنبؤﻳًا للتعثر اﻷكاديمي. أنجز مشروﻋ ً ا لتشخيص نقص المعادن في النباتات باستخدام الرؤية الحاسوبية. حقق المركز الثاني في هاكاثون Qualithon بمشروع EduEye لتحليل بيانات اﻷداء اﻷكاديمي. أنهى برنامج الذكاء اﻻصطناعي المكثف بجامعة KAUST. خريج معسكر سامسونج للذكاء اﻻصطناعي. خبرة عملية في Python، TensorFlow، PyTorch، ومعالجة البيانات الضخمة. يجمع بين المعرفة اﻷكاديمية والخبرة العملية واﻹنجازات التنافسية برؤية لتوظيف الذكاء اﻻصطناعي في بناء مستقبل تعليمي وتقني مبتكر. كما حقق المركز الاول في هاكاثون المبادرات الشبابيه حول المملكة بمشروع طوع لجعل الساعات التطوعيه كتنافس جامعي.",
        "linkedin": "https://www.linkedin.com/in/abdulrazaq-h-aldawsari-046511209/"
      },
      {
        "id": "sadeem",
        "name": "سديم الرشيد",
        "title": "مولدة بيانات",
        "avatar": "https://i.postimg.cc/xjpvPx8G/Sadeem.jpg",
        "bio": "طالبة في السنة الأخيرة بقسم علوم الحاسب - مسار ذكاء اصطناعي، أمتلك أساسًا في تقنيات إنترنت الأشياء والذكاء الاصطناعي والتقنيات الذكية، مع خبرة في تطوير النماذج الأولية، قواعد البيانات، وتحليل الجدوى للأفكار التقنية. طورت نظام ري ذكي مستدام، كما تم اختياري ضمن أفضل 15 فريقًا على مستوى السعودية في تحدي إنترنت الأشياء 23 لمنشآت، مما عزز خبرتي في العرض الاحترافي وبناء النماذج العملية. حصلت على عدة شهادات احترافية في الذكاء الاصطناعي، تحليلات البيانات، وإنترنت الأشياء من جهات معتمدة وأتميز بسرعة التعلم، والقدرة على توظيف التقنيات الحديثة في ابتكار حلول تخدم التحول الرقمي والتنمية المستدامة.",
        "linkedin": "https://www.linkedin.com/in/sadeem-alrasheed-b5b021306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
      }
    ]
  },
  "cta": {
    "title": "هل أنت مستعد لتجاوز حواجز التواصل؟",
    "subtitle": "ابدأ باستخدام أدوات الترجمة الفورية لدينا الآن واجعل كل محادثة ممكنة.",
    "button1": "ترجمة إشارة إلى نص",
    "button2": "ترجمة نص إلى إشارة"
  },
  "faq": {
    "title": "الأسئلة الشائعة",
    "questions": [
      {
        "question": "هل يتم تخزين الفيديو الخاص بي؟",
        "answer": "لا على الإطلاق. تتم معالجة الفيديو مباشرة في متصفحك ولا يتم إرساله أو تخزينه على أي خوادم. خصوصيتك هي أولويتنا القصوى."
      },
      {
        "question": "هل يدعم التطبيق الترجمة الثنائية؟",
        "answer": "نعم بالتأكيد. مُبصِر مصمم ليكون جسر تواصل متكامل، حيث يمكنك الترجمة من لغة الإشارة إلى نص مكتوب، والعكس من نص مكتوب إلى لغة إشارة مرئية."
      },
      {
        "question": "ما هي المتصفحات المدعومة؟",
        "answer": "يعمل مُبصِر بشكل أفضل على أحدث إصدارات Google Chrome و Firefox و Safari و Microsoft Edge على أجهزة الكمبيوتر والأجهزة المحمولة."
      },
      {
        "question": "كيف يمكنني تحسين دقة الترجمة؟",
        "answer": "للحصول على أفضل النتائج، تأكد من وجود إضاءة جيدة، وخلفية واضحة غير مشتتة، وأن تكون يديك وحركاتك واضحة بالكامل داخل إطار الكاميرا."
      },
      {
        "question": "هل التطبيق مجاني؟",
        "answer": "نعم، مُبصِر متاح للاستخدام مجانًا. هدفنا هو جعل التواصل أسهل ومتاحًا للجميع."
      },
      {
        "question": "من هم مبتكري مُبصِر؟",
        "answer": "تم إنشاء مُبصِر بواسطة فريق موهوب: أحمد الرشيد (مدير المشروع ومهندس الذكاء الاصطناعي)، الذي قاد الفريق برؤية ثاقبة وطوّر نماذج الذكاء الاصطناعي الأساسية؛ أميرة الدعجاني (مهندسة البيانات)، المسؤولة عن بناء وإدارة مجموعات البيانات الضخمة للتدريب؛ عبدالرزاق الدوسري (مطور متكامل)، الذي بنى تطبيق الويب بالكامل ليضمن تجربة سلسة؛ وسديم الرشيد (مصممة واجهة المستخدم ومولدة البيانات)، التي صممت الواجهة سهلة الاستخدام وساهمت في توليد بيانات التدريب."
      }
    ]
  },
  "footer": {
    "about": "تطبيق لترجمة لغة الإشارة باستخدام الذكاء الاصطناعي لتسهيل التواصل.",
    "quickLinksTitle": "روابط سريعة",
    "followUsTitle": "تابعنا",
    "copyright": "مُبصِر. جميع الحقوق محفوظة."
  },
  "signToTextPage": {
    "title": "إشارة إلى نص",
    "lettersTab": "ترجمة الحروف",
    "wordsTab": "ترجمة الكلمات"
  },
  "translator": {
    "status": {
      "idle": "جاهز",
      "requesting": "طلب الإذن...",
      "watching": "يراقب",
      "translating": "يترجم...",
      "error": "خطأ"
    },
    "handInFrame": "ضع يدك داخل الإطار",
    "prompt": "اضغط لتفعيل الكاميرا أو ارفع صورة للترجمة",
    "startCamera": "تشغيل الكاميرا",
    "uploadImage": "رفع صورة",
    "analyzeImageButton": "تحليل الصورة",
    "removeImageButton": "إزالة",
    "imagePreviewAlt": "معاينة الصورة المحددة",
    "cameraError": "نحتاج إذن الكاميرا لبدء الترجمة. يرجى تفعيل الكاميرا في إعدادات المتصفح.",
    "apiError": "فشلت الترجمة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.",
    "retryButton": "إعادة المحاولة",
    "modes": {
      "words": "ترجمة كلمات",
      "letters": "ترجمة حروف"
    },
    "translationTitle": "الترجمة النصية",
    "placeholder": {
      "words": "...سيظهر النص هنا",
      "letters": "...ستظهر الحروف هنا"
    },
    "speakButton": "نطق النص",
    "stopButton": "إيقاف",
    "copied": "تم النسخ!",
    "privacyNote": "لا نُخزّن الفيديو. كل شيء يحدث على جهازك.",
    "captureIntervalLabel": "التقاط كل: {seconds} ثانية"
  },
  "textToSign": {
    "title": "ترجمة النص إلى لغة الإشارة",
    "subtitle": "اكتب النص الذي تريد ترجمته، وستقوم الشخصية الافتراضية بعرضه بلغة الإشارة.",
    "inputLabel": "النص للترجمة",
    "placeholder": "مثال: مرحباً، كيف حالك اليوم؟",
    "translateButton": "ترجمة",
    "loadingButton": "جارٍ الترجمة...",
    "loadingAria": "جاري التحميل",
    "avatarAlt": "شخصية افتراضية تترجم النص إلى لغة الإشارة",
    "avatarPlaceholder": "ستظهر الترجمة المرئية هنا."
  },
  "common": {
    "scrollToTop": "العودة إلى الأعلى"
  }
};

const enTranslations = {
  "header": {
    "nav": {
      "home": "Home",
      "signToText": "Sign to Text",
      "textToSign": "Text to Sign",
      "faq": "FAQ"
    },
    "logoAlt": "Mubsir Logo",
    "homeAria": "Mubsir Home Page",
    "darkModeAria": "Enable Dark Mode",
    "lightModeAria": "Enable Light Mode",
    "toggleLanguageAria": "Toggle Language",
    "openMenuAria": "Open Menu",
    "closeMenuAria": "Close Menu"
  },
  "hero": {
    "title": "Real-time Sign Language Translation",
    "subtitle": {
      "line1": "Mubsir helps you with integrated two-way communication.",
      "line2": "It converts sign language into spoken words,",
      "line3": "and words into signs—seamlessly and instantly."
    },
    "ctaButton": "Get Started"
  },
  "whyMubsir": {
    "title": "Why Mubsir?",
    "features": [
      {
        "icon": "fast",
        "title": "Fast",
        "description": "Instant and direct processing within the browser to ensure a lag-free, real-time response."
      },
      {
        "icon": "accurate",
        "title": "Accurate",
        "description": "We use advanced, trained AI models to recognize common signs with high efficiency."
      },
      {
        "icon": "private",
        "title": "Private",
        "description": "Your privacy is our priority. We never store or share your videos."
      },
      {
        "icon": "bilingual",
        "title": "Bilateral Translation",
        "description": "Converts sign language into text, and text into sign language—seamlessly and instantly."
      }
    ]
  },
  "howToUse": {
    "title": "How to Use",
    "steps": [
      {
        "icon": "camera",
        "title": "Grant Camera Access",
        "description": "Click the 'Start Camera' button and allow your browser to access it."
      },
      {
        "icon": "hand",
        "title": "Make Your Sign",
        "description": "Stand clearly in front of the camera and make your sign within the designated frame."
      },
      {
        "icon": "read",
        "title": "Read & Hear Translation",
        "description": "Watch the text appear instantly on the screen and listen to the audio playback."
      }
    ]
  },
  "team": {
    "title": "Meet the Mubsir Team",
    "viewDetails": "View Details",
    "members": [
      {
        "id": "ahmed",
        "name": "Ahmed Alrasheed",
        "title": "Team Lead & AI Engineer",
        "avatar": "https://i.postimg.cc/YCdRJrCv/ahmd.jpg",
        "bio": "I am a computer science student at Shaqra University, an AI engineer, an iOS developer, and a Full-Stack Developer, passionate about creating modern tech solutions that combine AI and software development. I have co-led and developed impactful projects like 'Silah' for translating sign language letters and 'EduEye' for predicting at-risk students and identifying gifted ones. I also developed 'Velorent' for personal car rentals and was part of the 'Yusra' project team to facilitate access for people with disabilities. My team and I won second place in the Qualithon hackathon among 63 teams from 30 universities. I also secured first place for three consecutive years at the university's Scientific Forum in the 'Distinguished Entrepreneurial Idea' track. I am a graduate of Apple's AI Foundation Camp and Samsung's AI program. I hold a Global Leadership certificate from Coventry University in the UK after being selected among the top 16 students at the university. I also won first place in the Youth Initiatives Hackathon across the Kingdom with the 'Tawq' project to make volunteer hours a university competition. These achievements have enhanced my skills in leadership, innovation, and quality, and I strive to leverage technology to create inspiring, real-world solutions.",
        "linkedin": "https://www.linkedin.com/in/ahmed-k-alrasheed-446b8829b"
      },
      {
        "id": "amirah",
        "name": "Amirah Aldajani",
        "title": "Data Engineer",
        "avatar": "https://i.postimg.cc/fbdq44t7/Amirah.jpg",
        "bio": "A final-year Computer Science student, specializing in Artificial Intelligence. I have practical experience in AI, IoT, data analysis, and Robotic Process Automation (RPA). I have executed several notable projects such as 'Silah' for translating sign language letters and 'Ghiras' for detecting plant diseases. I also developed a smart parking reservation system based on AI and IoT. I have participated in hackathons and tech challenges, securing second place in the Smart Cities Hackathon. I completed a diverse internship at Al-Khorayef Group, covering data analysis, RPA, and web development, in addition to Samsung's AI camp. I have also obtained independent professional certifications in AI, IoT, and data analysis.",
        "linkedin": "https://www.linkedin.com/in/aldajanii/"
      },
      {
        "id": "abdulrazzaq",
        "name": "Abdulrazzaq Aldawsari",
        "title": "Full-stack Developer",
        "avatar": "https://i.postimg.cc/26szkNTt/self-Pecture.png",
        "bio": "A final-year student in the Computer Science department, AI track. Interested in harnessing AI to develop innovative educational solutions. I developed a predictive model for academic distress and completed a project to diagnose mineral deficiencies in plants using computer vision. Achieved second place in the Qualithon hackathon with the EduEye project for analyzing academic performance data. Completed the intensive AI program at KAUST and graduated from Samsung's AI camp. I have practical experience in Python, TensorFlow, PyTorch, and big data processing. I combine academic knowledge with practical experience and competitive achievements, with a vision to employ AI in building an innovative educational and technological future. I also won first place in the Youth Initiatives Hackathon across the Kingdom with the 'Tawq' project to make volunteer hours a university competition.",
        "linkedin": "https://www.linkedin.com/in/abdulrazaq-h-aldawsari-046511209/"
      },
      {
        "id": "sadeem",
        "name": "Sadeem Alrasheed",
        "title": "Data Generator",
        "avatar": "https://i.postimg.cc/xjpvPx8G/Sadeem.jpg",
        "bio": "A final-year Computer Science student, specializing in Artificial Intelligence. I have a foundation in IoT, AI, and smart technologies, with experience in prototype development, databases, and feasibility analysis for tech ideas. I developed a sustainable smart irrigation system and was selected among the top 15 teams in Saudi Arabia for the Monsha'at IoT Challenge 23, which enhanced my experience in professional presentation and building practical models. I have obtained several professional certifications in AI, data analytics, and IoT from accredited institutions. I am a fast learner with the ability to leverage modern technologies to create solutions that serve digital transformation and sustainable development.",
        "linkedin": "https://www.linkedin.com/in/sadeem-alrasheed-b5b021306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
      }
    ]
  },
  "cta": {
    "title": "Ready to Break Communication Barriers?",
    "subtitle": "Start using our instant translation tools now and make every conversation possible.",
    "button1": "Translate Sign to Text",
    "button2": "Translate Text to Sign"
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "questions": [
      {
        "question": "Is my video stored?",
        "answer": "Not at all. The video is processed directly in your browser and is never sent to or stored on any servers. Your privacy is our top priority."
      },
      {
        "question": "Does the app support bilateral translation?",
        "answer": "Yes, absolutely. Mubsir is designed to be a complete communication bridge, allowing you to translate from sign language to written text, and vice versa from text to visual sign language."
      },
      {
        "question": "Which browsers are supported?",
        "answer": "Mubsir works best on the latest versions of Google Chrome, Firefox, Safari, and Microsoft Edge on desktop and mobile devices."
      },
      {
        "question": "How can I improve translation accuracy?",
        "answer": "For best results, ensure good lighting, a clear and non-distracting background, and that your hands and gestures are fully visible within the camera frame."
      },
      {
        "question": "Is the application free?",
        "answer": "Yes, Mubsir is available for free. Our goal is to make communication easier and more accessible for everyone."
      },
      {
        "question": "Who are the creators of Mubsir?",
        "answer": "Mubsir was created by a talented team: Ahmad Alrasheed (Project Manager & AI Engineer), who led the team with vision and developed the core AI models; Amirah Aldajani (Data Engineer), responsible for building and managing the vast datasets for training; Abdulrazzaq Aldosari (Full-stack Developer), who built the entire web application for a seamless experience; and Sadeem Alrasheed (UI/UX Designer & Data Generator), who designed the user-friendly interface and helped generate training data."
      }
    ]
  },
  "footer": {
    "about": "An application for translating sign language using AI to facilitate communication.",
    "quickLinksTitle": "Quick Links",
    "followUsTitle": "Follow Us",
    "copyright": "Mubsir. All rights reserved."
  },
   "signToTextPage": {
    "title": "Sign to Text",
    "lettersTab": "Translate Letters",
    "wordsTab": "Translate Words"
  },
  "translator": {
    "status": {
      "idle": "Ready",
      "requesting": "Requesting...",
      "watching": "Watching",
      "translating": "Translating...",
      "error": "Error"
    },
    "handInFrame": "Place your hand in the frame",
    "prompt": "Click to start the camera or upload an image to translate",
    "startCamera": "Start Camera",
    "uploadImage": "Upload Image",
    "analyzeImageButton": "Analyze Image",
    "removeImageButton": "Remove",
    "imagePreviewAlt": "Selected image preview",
    "cameraError": "We need camera permission to start translation. Please enable the camera in your browser settings.",
    "apiError": "Translation failed. Please check your internet connection and try again.",
    "retryButton": "Retry",
    "modes": {
      "words": "Translate Words",
      "letters": "Translate Letters"
    },
    "translationTitle": "Text Translation",
    "placeholder": {
      "words": "...text will appear here",
      "letters": "...letters will appear here"
    },
    "speakButton": "Speak Text",
    "stopButton": "Stop",
    "copied": "Copied!",
    "privacyNote": "We do not store your video. Everything happens on your device.",
    "captureIntervalLabel": "Capture every: {seconds}s"
  },
  "textToSign": {
    "title": "Translate Text to Sign Language",
    "subtitle": "Type the text you want to translate, and the virtual avatar will display it in sign language.",
    "inputLabel": "Text to Translate",
    "placeholder": "Example: Hello, how are you today?",
    "translateButton": "Translate",
    "loadingButton": "Translating...",
    "loadingAria": "Loading",
    "avatarAlt": "Virtual avatar translating text to sign language",
    "avatarPlaceholder": "The visual translation will appear here."
  },
  "common": {
    "scrollToTop": "Back to top"
  }
};


const translationsData: { [key: string]: any } = {
  ar: arTranslations,
  en: enTranslations,
};

export const useTranslations = () => {
  const { language } = useLanguage();
  const translations = translationsData[language];

  const t = useCallback((key: string): string => {
    if (!translations) return key;
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key;
    }
    return typeof result === 'string' ? result : key;
  }, [translations]);
  
  const T = useCallback((key: string): any[] => {
    if (!translations) return [];
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return [];
    }
    return Array.isArray(result) ? result : [];
  }, [translations]);

  // The translations are now bundled, so they are always loaded.
  return { t, T, isLoaded: true };
};
