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
        "id": "abdulrazaq",
        "name": "عبدالرزاق الدوسري",
        "title": "مطور متكامل",
        "avatar": "https://i.postimg.cc/26szkNTt/self-Pecture.png",
        "bio": "طالب في السنة اﻷخيرة بقسم علوم الحاسب - مسار الذكاء اﻷصطناعي. مهتم بتطوير الويب والذكاء الاصطناعي، ولدي خبرة في بناء تطبيقات ويب متكاملة باستخدام تقنيات حديثة. شاركت في مشروع 'صلة' لترجمة لغة الإشارة وساهمت في تطوير الواجهات الخلفية. أسعى لتطبيق مهاراتي في حل مشكلات العالم الحقيقي.",
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
  "faq": {
    "title": "أسئلة شائعة",
    "questions": [
      {
        "question": "هل مُبصِر مجاني؟",
        "answer": "نعم، مُبصِر مجاني بالكامل للاستخدام الشخصي. هدفنا هو جعل التواصل أسهل للجميع."
      },
      {
        "question": "ما مدى دقة الترجمة؟",
        "answer": "نحن نستخدم أحدث نماذج الذكاء الاصطناعي لضمان أعلى دقة ممكنة، ونقوم بتحديثها باستمرار لتحسين الأداء. قد تختلف الدقة قليلاً حسب ظروف الإضاءة ووضوح الإشارة."
      },
      {
        "question": "هل يتم تخزين بياناتي؟",
        "answer": "لا، نحن نحترم خصوصيتك. تتم جميع عمليات المعالجة مباشرة في متصفحك. لا يتم رفع أو تخزين أي صور أو فيديوهات على خوادمنا."
      },
      {
        "question": "هل يعمل التطبيق على جميع الأجهزة؟",
        "answer": "يعمل مُبصِر على معظم المتصفحات الحديثة على أجهزة الكمبيوتر المكتبية والأجهزة المحمولة. للحصول على أفضل أداء، نوصي باستخدام Google Chrome أو Safari."
      },
      {
        "question": "هل يدعم التطبيق الترجمة الثنائية؟",
        "answer": "نعم بالتأكيد. مُبصِر مصمم ليكون جسر تواصل متكامل، حيث يمكنك الترجمة من لغة الإشارة إلى نص مكتوب، والعكس من نص مكتوب إلى لغة إشارة مرئية."
      },
      {
        "question": "من هم مبتكري مبصر ؟",
        "answer": "تم إنشاء مُبصِر بواسطة فريق موهوب: أحمد الرشيد (مدير المشروع ومهندس الذكاء الاصطناعي)، الذي قاد الفريق برؤية ثاقبة وطوّر نماذج الذكاء الاصطناعي الأساسية؛ أميرة الدعجاني (مهندسة البيانات)، المسؤولة عن بناء وإدارة مجموعات البيانات الضخمة للتدريب؛ عبدالرزاق الدوسري (مطور متكامل)، الذي بنى تطبيق الويب بالكامل ليضمن تجربة سلسة؛ وسديم الرشيد (مصممة واجهة المستخدم ومولدة البيانات)، التي صممت الواجهة سهلة الاستخدام وساهمت في توليد بيانات التدريب."
      }
    ]
  },
  "cta": {
    "title": "هل أنت مستعد لسد فجوة التواصل؟",
    "subtitle": "انضم إلينا اليوم وجرّب مستقبل التواصل بلغة الإشارة. إنه سريع ومجاني ويحترم خصوصيتك.",
    "button1": "ترجمة إشارة إلى نص",
    "button2": "ترجمة نص إلى إشارة"
  },
  "footer": {
    "about": "مُبصِر هو أداة لترجمة لغة الإشارة مدعومة بالذكاء الاصطناعي، مصممة لجعل التواصل أكثر سهولة للجميع.",
    "quickLinksTitle": "روابط سريعة",
    "followUsTitle": "تابعنا",
    "copyright": "مُبصِر. جميع الحقوق محفوظة."
  },
  "textToSign": {
    "title": "من النص إلى لغة الإشارة",
    "subtitle": "اكتب أي نص في المربع أدناه وشاهد الصورة الرمزية ثلاثية الأبعاد (الأفاتار) تقوم بترجمته إلى لغة الإشارة المتحركة.",
    "inputLabel": "أدخل النص هنا:",
    "placeholder": "مرحباً بالعالم...",
    "translateButton": "ترجم إلى إشارة",
    "loadingButton": "جار الترجمة...",
    "avatarAlt": "أفاتار يترجم النص إلى لغة الإشارة",
    "avatarPlaceholder": "ستظهر ترجمة لغة الإشارة هنا.",
    "loadingAria": "جاري تحميل الأفاتار"
  },
  "signToTextPage": {
    "title": "من الإشارة إلى النص",
    "subtitle": "استخدم كاميرا جهازك لترجمة لغة الإشارة إلى نص في الوقت الفعلي.",
    "lettersTab": "ترجمة الحروف",
    "wordsTab": "ترجمة الكلمات",
    "confidenceLabel": "مستوى الثقة",
    "copyButton": "نسخ النص"
  },
  "translator": {
    "prompt": "وجّه الكاميرا أو حمّل صورة للبدء.",
    "handInFrame": "ضع يدك بوضوح داخل الإطار",
    "imagePreviewAlt": "معاينة الصورة المحملة",
    "cameraError": "فشل الوصول إلى الكاميرا. يرجى التحقق من الأذونات.",
    "apiError": "حدث خطأ أثناء التحليل.",
    "retryButton": "إعادة المحاولة",
    "speakButton": "نطق النص",
    "copyButton": "نسخ النص",
    "startCamera": "تشغيل الكاميرا",
    "uploadImage": "تحميل صورة",
    "stopButton": "إيقاف",
    "captureIntervalLabel": "التقاط كل {seconds} ثواني",
    "analyzeImageButton": "تحليل الصورة",
    "removeImageButton": "إزالة الصورة",
    "privacyNote": "تتم معالجة جميع الصور محليًا في متصفحك. خصوصيتك مضمونة.",
    "placeholder": {
      "letters": "سيظهر الحرف المترجم هنا...",
      "words": "ستظهر الكلمة المترجمة هنا..."
    },
    "status": {
      "idle": "خامل",
      "requesting": "طلب الكاميرا...",
      "watching": "مراقبة",
      "translating": "جار الترجمة...",
      "error": "خطأ"
    }
  },
  "common": {
    "scrollToTop": "العودة للأعلى"
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
      "line1": "Mubsir helps you with seamless two-way communication,",
      "line2": "translating sign language into spoken words,",
      "line3": "and words into sign language—instantly and effortlessly."
    },
    "ctaButton": "Get Started"
  },
  "whyMubsir": {
    "title": "Why Mubsir?",
    "features": [
      {
        "icon": "fast",
        "title": "Fast",
        "description": "Instant, in-browser processing ensures real-time responses with no delay."
      },
      {
        "icon": "accurate",
        "title": "Accurate",
        "description": "We use advanced, trained AI models to recognize common signs with high efficiency."
      },
      {
        "icon": "private",
        "title": "Private",
        "description": "Your privacy is our priority. We never store or share your images or videos."
      },
      {
        "icon": "bilingual",
        "title": "Two-Way Translation",
        "description": "Translates sign language to spoken words and words to sign language—seamlessly."
      }
    ]
  },
  "howToUse": {
    "title": "How to Use",
    "steps": [
      {
        "icon": "camera",
        "title": "Allow Camera Access",
        "description": "Click the 'Start Camera' button and allow the browser to access it."
      },
      {
        "icon": "hand",
        "title": "Make Your Sign",
        "description": "Stand clearly in front of the camera and make your sign within the designated frame."
      },
      {
        "icon": "read",
        "title": "Read & Hear the Translation",
        "description": "Watch the text appear instantly on the screen and listen to the audio pronunciation."
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
        "bio": "I am a computer science student at Shaqra University, an AI engineer, an iOS app developer, and a full-stack developer, passionate about creating modern tech solutions that combine AI and software development. I have led and developed impactful projects like 'Silah' for sign language letter translation, and 'EduEye' for predicting struggling students and identifying gifted ones, in addition to developing 'Velorent' for personal car rentals. I was also part of a team working on the 'Yusra' project to facilitate access for people with disabilities. My team and I won second place at the Qualithon hackathon among 63 teams from 30 universities. I also won first place for three consecutive years at the university's scientific forum in the outstanding entrepreneurship idea track. I am a graduate of Apple's AI foundational bootcamp and Samsung's AI program. I hold a Global Leadership certificate from Coventry University in the UK after being selected among the top 16 students at the university. I also achieved first place in the youth initiatives hackathon across the kingdom with the 'Tawq' project, which gamifies volunteer hours for university competition. These achievements have enhanced my skills in leadership, innovation, and quality, and I seek to harness technology to create inspiring, real-world solutions.",
        "linkedin": "https://www.linkedin.com/in/ahmed-k-alrasheed-446b8829b"
      },
      {
        "id": "amirah",
        "name": "Amirah Aldajani",
        "title": "Data Engineer",
        "avatar": "https://i.postimg.cc/fbdq44t7/Amirah.jpg",
        "bio": "Final year Computer Science student – AI track. I have practical experience in AI, IoT, data analysis, and robotic process automation. I have implemented several notable projects like 'Silah' for sign language letter translation and 'Ghiras' for detecting plant diseases. I also developed a smart parking reservation system based on AI and IoT. I have participated in hackathons and tech challenges, winning second place in the Smart Cities Hackathon. I completed a diverse internship at Al-Khorayef Group covering data analysis, RPA, and web development, in addition to Samsung's AI camp. I have also obtained independent professional certifications in AI, IoT, and data analysis.",
        "linkedin": "https://www.linkedin.com/in/aldajanii/"
      },
      {
        "id": "abdulrazaq",
        "name": "Abdulrazaq Aldosari",
        "title": "Full-Stack Developer",
        "avatar": "https://i.postimg.cc/26szkNTt/self-Pecture.png",
        "bio": "Final year Computer Science student - AI track. Interested in web development and AI, I have experience building full-stack web applications using modern technologies. I participated in the 'Silah' project for sign language translation and contributed to back-end development. I strive to apply my skills to solve real-world problems.",
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
  "faq": {
    "title": "Frequently Asked Questions",
    "questions": [
      {
        "question": "Is Mubsir free to use?",
        "answer": "Yes, Mubsir is completely free for personal use. Our goal is to make communication easier for everyone."
      },
      {
        "question": "How accurate is the translation?",
        "answer": "We use state-of-the-art AI models to ensure the highest possible accuracy, and we continuously update them to improve performance. Accuracy may vary slightly depending on lighting conditions and the clarity of the sign."
      },
      {
        "question": "Is my data stored?",
        "answer": "No, we respect your privacy. All processing is done directly in your browser. No images or videos are ever uploaded or stored on our servers."
      },
      {
        "question": "Does it work on all devices?",
        "answer": "Mubsir works on most modern browsers on desktop and mobile devices. For the best performance, we recommend using Google Chrome or Safari."
      },
      {
        "question": "Does the application support two-way translation?",
        "answer": "Yes, absolutely. Mubsir is designed to be an integrated communication bridge, where you can translate from sign language to written text, and vice versa from written text to visible sign language."
      },
      {
        "question": "Who are the creators of Mubsir?",
        "answer": "Mubsir was created by a talented team: Ahmed Alrasheed (Project Manager & AI Engineer), who led the team with insightful vision and developed the core AI models; Amirah Aldajani (Data Engineer), responsible for building and managing the large datasets for training; Abdulrazzaq Aldosari (Full-Stack Developer), who built the entire web application to ensure a seamless experience; and Sadeem Alrasheed (UI Designer & Data Generator), who designed the user-friendly interface and contributed to generating training data."
      }
    ]
  },
  "cta": {
    "title": "Ready to Bridge the Communication Gap?",
    "subtitle": "Join us today and experience the future of sign language communication. It's fast, free, and respects your privacy.",
    "button1": "Translate Sign to Text",
    "button2": "Translate Text to Sign"
  },
  "footer": {
    "about": "Mubsir is an AI-powered sign language translation tool designed to make communication more accessible for everyone.",
    "quickLinksTitle": "Quick Links",
    "followUsTitle": "Follow Us",
    "copyright": "Mubsir. All rights reserved."
  },
  "textToSign": {
    "title": "Text to Sign Language",
    "subtitle": "Type any text into the box below and watch the 3D avatar translate it into animated sign language.",
    "inputLabel": "Enter text here:",
    "placeholder": "Hello, world...",
    "translateButton": "Translate to Sign",
    "loadingButton": "Translating...",
    "avatarAlt": "Avatar translating text to sign language",
    "avatarPlaceholder": "The sign language translation will appear here.",
    "loadingAria": "Loading avatar"
  },
  "signToTextPage": {
    "title": "Sign to Text",
    "subtitle": "Use your device's camera to translate sign language into text in real-time.",
    "lettersTab": "Translate Letters",
    "wordsTab": "Translate Words",
    "confidenceLabel": "Confidence",
    "copyButton": "Copy Text"
  },
  "translator": {
    "prompt": "Point your camera or upload an image to start.",
    "handInFrame": "Place your hand clearly inside the frame",
    "imagePreviewAlt": "Uploaded image preview",
    "cameraError": "Failed to access camera. Please check permissions.",
    "apiError": "An error occurred during analysis.",
    "retryButton": "Retry",
    "speakButton": "Speak Text",
    "copyButton": "Copy Text",
    "startCamera": "Start Camera",
    "uploadImage": "Upload Image",
    "stopButton": "Stop",
    "captureIntervalLabel": "Capture every {seconds}s",
    "analyzeImageButton": "Analyze Image",
    "removeImageButton": "Remove Image",
    "privacyNote": "All image processing is done locally in your browser. Your privacy is guaranteed.",
    "placeholder": {
      "letters": "Translated letter will appear here...",
      "words": "Translated word will appear here..."
    },
    "status": {
      "idle": "Idle",
      "requesting": "Requesting Camera...",
      "watching": "Watching",
      "translating": "Translating...",
      "error": "Error"
    }
  },
  "common": {
    "scrollToTop": "Scroll to top"
  }
};

const translations = {
  ar: arTranslations,
  en: enTranslations,
};

// A simple deep-get function to retrieve nested values
function get(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const useTranslations = () => {
  const { language } = useLanguage();
  const isLoaded = true; // Assume translations are always loaded

  const t = useCallback(
    (key: string) => {
      const translation = get(translations[language], key);
      return typeof translation === 'string' ? translation : key;
    },
    [language]
  );
  
  // Gets a non-string value (like an array of objects)
  const T = useCallback(
    (key: string) => {
        const translation = get(translations[language], key);
        return translation || [];
    },
    [language]
  );

  return { t, T, isLoaded };
};