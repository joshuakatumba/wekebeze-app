// chatNodes.js
export const chatNodes = {
  cervical: {
    en: {
      q1: {
        id: "q1",
        type: "question",
        text: "Do you know what causes cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes1" },
          { text: "No", next_node_id: "ans_no1" },
        ],
      },
      ans_yes1: {
        id: "ans_yes1",
        type: "answer",
        text: "Great! Most cervical cancers are caused by high-risk HPV infection.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+HPV+and+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz1" }],
      },
      ans_no1: {
        id: "ans_no1",
        type: "answer",
        text: "No worries! Cervical cancer is mainly caused by persistent high-risk HPV infection.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+HPV+and+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz1" }],
      },
      quiz1: {
        id: "quiz1",
        type: "quiz",
        text: "Quiz: What is the main cause of cervical cancer?",
        image_url: null,
        buttons: [
          { text: "A) Smoking", next_node_id: "quiz1_wrong" },
          { text: "B) High-risk HPV infection", next_node_id: "quiz1_correct" },
          { text: "C) Poor diet", next_node_id: "quiz1_wrong" },
          { text: "D) Stress", next_node_id: "quiz1_wrong" },
        ],
      },
      quiz1_correct: {
        id: "quiz1_correct",
        type: "answer",
        text: "Correct! High-risk HPV infection is the main cause of cervical cancer.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q2" }],
      },
      quiz1_wrong: {
        id: "quiz1_wrong",
        type: "answer",
        text: "Not quite. The main cause is high-risk HPV infection. Let's continue learning!",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q2" }],
      },
      q2: {
        id: "q2",
        type: "question",
        text: "Do you know the symptoms of cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes2" },
          { text: "No", next_node_id: "ans_no2" },
        ],
      },
      ans_yes2: {
        id: "ans_yes2",
        type: "answer",
        text: "Excellent! Common symptoms include unusual bleeding, pelvic pain, or discharge.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Symptoms+of+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz2" }],
      },
      ans_no2: {
        id: "ans_no2",
        type: "answer",
        text: "That's okay! Symptoms may include unusual vaginal bleeding, pelvic pain, or unusual discharge.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Symptoms+of+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz2" }],
      },
      quiz2: {
        id: "quiz2",
        type: "quiz",
        text: "Quiz: Which of these is NOT a common symptom of cervical cancer?",
        image_url: null,
        buttons: [
          { text: "A) Unusual vaginal bleeding", next_node_id: "quiz2_wrong" },
          { text: "B) Pelvic pain", next_node_id: "quiz2_wrong" },
          { text: "C) Hair loss", next_node_id: "quiz2_correct" },
          { text: "D) Unusual discharge", next_node_id: "quiz2_wrong" },
        ],
      },
      quiz2_correct: {
        id: "quiz2_correct",
        type: "answer",
        text: "Correct! Hair loss is not a common symptom of cervical cancer.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q3" }],
      },
      quiz2_wrong: {
        id: "quiz2_wrong",
        type: "answer",
        text: "Not quite. Hair loss is not typically a symptom of cervical cancer. The common symptoms are unusual bleeding, pelvic pain, and unusual discharge.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q3" }],
      },
      q3: {
        id: "q3",
        type: "question",
        text: "Do you know the risk factors for cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes3" },
          { text: "No", next_node_id: "ans_no3" },
        ],
      },
      ans_yes3: {
        id: "ans_yes3",
        type: "answer",
        text: "Perfect! Risk factors include HPV infection, smoking, and weakened immune system.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Risk+Factors+for+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz3" }],
      },
      ans_no3: {
        id: "ans_no3",
        type: "answer",
        text: "No problem! Key risk factors are HPV infection, smoking, multiple partners, and no screening.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Risk+Factors+for+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz3" }],
      },
      quiz3: {
        id: "quiz3",
        type: "quiz",
        text: "Quiz: Which is the most important risk factor for cervical cancer?",
        image_url: null,
        buttons: [
          { text: "A) Smoking", next_node_id: "quiz3_wrong" },
          { text: "B) HPV infection", next_node_id: "quiz3_correct" },
          { text: "C) Family history", next_node_id: "quiz3_wrong" },
          { text: "D) Age over 50", next_node_id: "quiz3_wrong" },
        ],
      },
      quiz3_correct: {
        id: "quiz3_correct",
        type: "answer",
        text: "Correct! HPV infection is the most important risk factor for cervical cancer.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q4" }],
      },
      quiz3_wrong: {
        id: "quiz3_wrong",
        type: "answer",
        text: "Not quite. HPV infection is the most important risk factor, though smoking and other factors also play a role.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q4" }],
      },
      q4: {
        id: "q4",
        type: "question",
        text: "Do you know how to prevent cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes4" },
          { text: "No", next_node_id: "ans_no4" },
        ],
      },
      ans_yes4: {
        id: "ans_yes4",
        type: "answer",
        text: "Awesome! Prevention includes HPV vaccination, regular screening, and safe sex.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Preventing+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz4" }],
      },
      ans_no4: {
        id: "ans_no4",
        type: "answer",
        text: "Don't worry! You can prevent it with HPV vaccine, Pap smears, and healthy lifestyle.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Preventing+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz4" }],
      },
      quiz4: {
        id: "quiz4",
        type: "quiz",
        text: "Quiz: Which of these is an effective way to prevent cervical cancer?",
        image_url: null,
        buttons: [
          { text: "A) HPV vaccination", next_node_id: "quiz4_correct" },
          { text: "B) Eating more sugar", next_node_id: "quiz4_wrong" },
          { text: "C) Avoiding exercise", next_node_id: "quiz4_wrong" },
          { text: "D) Drinking more alcohol", next_node_id: "quiz4_wrong" },
        ],
      },
      quiz4_correct: {
        id: "quiz4_correct",
        type: "answer",
        text: "Correct! HPV vaccination is an effective prevention method.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q5" }],
      },
      quiz4_wrong: {
        id: "quiz4_wrong",
        type: "answer",
        text: "Not quite. HPV vaccination, regular screening, and safe sex practices are key prevention methods.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q5" }],
      },
      q5: {
        id: "q5",
        type: "question",
        text: "Do you know about screening for cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes5" },
          { text: "No", next_node_id: "ans_no5" },
        ],
      },
      ans_yes5: {
        id: "ans_yes5",
        type: "answer",
        text: "Great! Screening involves Pap tests and HPV tests every 3-5 years.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Screening+for+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz5" }],
      },
      ans_no5: {
        id: "ans_no5",
        type: "answer",
        text: "No issue! Get screened with Pap smear or HPV test regularly, starting at age 21.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Screening+for+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz5" }],
      },
      quiz5: {
        id: "quiz5",
        type: "quiz",
        text: "Quiz: At what age should women start cervical cancer screening?",
        image_url: null,
        buttons: [
          { text: "A) Age 18", next_node_id: "quiz5_wrong" },
          { text: "B) Age 21", next_node_id: "quiz5_correct" },
          { text: "C) Age 30", next_node_id: "quiz5_wrong" },
          { text: "D) Age 40", next_node_id: "quiz5_wrong" },
        ],
      },
      quiz5_correct: {
        id: "quiz5_correct",
        type: "answer",
        text: "Correct! Women should start cervical cancer screening at age 21.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q6" }],
      },
      quiz5_wrong: {
        id: "quiz5_wrong",
        type: "answer",
        text: "Not quite. Screening typically starts at age 21, though guidelines may vary by country.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q6" }],
      },
      q6: {
        id: "q6",
        type: "question",
        text: "Do you know about treatment options for cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes6" },
          { text: "No", next_node_id: "ans_no6" },
        ],
      },
      ans_yes6: {
        id: "ans_yes6",
        type: "answer",
        text: "Excellent! Treatments include surgery, chemotherapy, radiation, and targeted therapies.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Treatment+Options+for+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz6" }],
      },
      ans_no6: {
        id: "ans_no6",
        type: "answer",
        text: "No worries! Common treatments are surgery to remove abnormal cells, chemotherapy, radiation, and immunotherapy.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Treatment+Options+for+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz6" }],
      },
      quiz6: {
        id: "quiz6",
        type: "quiz",
        text: "Quiz: Which is a common treatment for cervical cancer?",
        image_url: null,
        buttons: [
          { text: "A) Surgery", next_node_id: "quiz6_correct" },
          { text: "B) Antibiotics", next_node_id: "quiz6_wrong" },
          { text: "C) Vitamins", next_node_id: "quiz6_wrong" },
          { text: "D) Painkillers", next_node_id: "quiz6_wrong" },
        ],
      },
      quiz6_correct: {
        id: "quiz6_correct",
        type: "answer",
        text: "Correct! Surgery is a common treatment for cervical cancer.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q7" }],
      },
      quiz6_wrong: {
        id: "quiz6_wrong",
        type: "answer",
        text: "Not quite. Surgery, chemotherapy, radiation, and other therapies are standard treatments.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q7" }],
      },
      q7: {
        id: "q7",
        type: "question",
        text: "Do you know about support resources for cervical cancer patients?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes7" },
          { text: "No", next_node_id: "ans_no7" },
        ],
      },
      ans_yes7: {
        id: "ans_yes7",
        type: "answer",
        text: "Great! Support includes counseling, support groups, hotlines, and organizations like cancer societies.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Support+Resources+for+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz7" }],
      },
      ans_no7: {
        id: "ans_no7",
        type: "answer",
        text: "That's okay! Seek support from family, friends, counselors, and groups like Reach to Recovery.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Support+Resources+for+Cervical+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz7" }],
      },
      quiz7: {
        id: "quiz7",
        type: "quiz",
        text: "Quiz: What type of support can help cervical cancer patients cope?",
        image_url: null,
        buttons: [
          { text: "A) Support groups", next_node_id: "quiz7_correct" },
          { text: "B) Ignoring the diagnosis", next_node_id: "quiz7_wrong" },
          { text: "C) Isolating yourself", next_node_id: "quiz7_wrong" },
          { text: "D) Avoiding treatment", next_node_id: "quiz7_wrong" },
        ],
      },
      quiz7_correct: {
        id: "quiz7_correct",
        type: "answer",
        text: "Correct! Support groups provide emotional and practical help for cervical cancer patients.",
        image_url: null,
        buttons: [{ text: "Finish", next_node_id: "end" }],
      },
      quiz7_wrong: {
        id: "quiz7_wrong",
        type: "answer",
        text: "Not quite. Support groups, counseling, and community resources are valuable for coping.",
        image_url: null,
        buttons: [{ text: "Finish", next_node_id: "end" }],
      },
      end: {
        id: "end",
        type: "answer",
        text: "Thank you for learning about cervical cancer! You've completed the chat.",
        image_url: null,
        buttons: [],
      },
    },
    lg: {
      q1: {
        id: "q1",
        type: "question",
        text: "Omuzi owulira oba kyini ekiriko okukola cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes1" },
          { text: "Nedda", next_node_id: "ans_no1" },
        ],
      },
      ans_yes1: {
        id: "ans_yes1",
        type: "answer",
        text: "Bulungi! Obulwadde bungi bwa cervical bukolebwa HPV ey’obulwadde obw’obulabe.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+HPV+and+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz1" }],
      },
      ans_no1: {
        id: "ans_no1",
        type: "answer",
        text: "Tewali kye tusuubira! Cervical cancer eyinza okukolebwa HPV ey'obulwadde obw'obulabe.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+HPV+and+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz1" }],
      },
      quiz1: {
        id: "quiz1",
        type: "quiz",
        text: "Quiz: Kiki ekikola cervical cancer mu njawulo?",
        image_url: null,
        buttons: [
          {
            text: "A) HPV ey'obulwadde obw'obulabe",
            next_node_id: "quiz1_correct",
          },
          { text: "B) Okunywa soka", next_node_id: "quiz1_wrong" },
          { text: "C) Okulya obubi", next_node_id: "quiz1_wrong" },
          { text: "D) Obulwadde obw'obulabe", next_node_id: "quiz1_wrong" },
        ],
      },
      quiz1_correct: {
        id: "quiz1_correct",
        type: "answer",
        text: "Kituufu! HPV ey'obulwadde obw'obulabe ye nsibuko enkulu ya cervical cancer.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q2" }],
      },
      quiz1_wrong: {
        id: "quiz1_wrong",
        type: "answer",
        text: "Si kituufu. HPV ey'obulwadde obw'obulabe ye nsibuko enkulu, wabula ebintu ebirala birimu.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q2" }],
      },
      q2: {
        id: "q2",
        type: "question",
        text: "Omuzi ebikolebwa bya cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes2" },
          { text: "Nedda", next_node_id: "ans_no2" },
        ],
      },
      ans_yes2: {
        id: "ans_yes2",
        type: "answer",
        text: "Kirungi nnyo! Ebikolebwa birimu okwawukira okw’enjawulo, obulumi mu ddovu, oba discharge etali ya busa.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Symptoms+of+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz2" }],
      },
      ans_no2: {
        id: "ans_no2",
        type: "answer",
        text: "Tewali nsonga! Ebikolebwa birimu okwawukira okw'enjawulo mu mwezi, obulumi mu ddovu, oba discharge etali ya busa.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Symptoms+of+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz2" }],
      },
      quiz2: {
        id: "quiz2",
        type: "quiz",
        text: "Quiz: Kiki si akabonero ka cervical cancer?",
        image_url: null,
        buttons: [
          { text: "A) Okwawukira okw'enjawulo", next_node_id: "quiz2_wrong" },
          { text: "B) Obulumi mu ddovu", next_node_id: "quiz2_wrong" },
          { text: "C) Obulwadde obw'obulabe", next_node_id: "quiz2_correct" },
          { text: "D) Discharge etali ya busa", next_node_id: "quiz2_wrong" },
        ],
      },
      quiz2_correct: {
        id: "quiz2_correct",
        type: "answer",
        text: "Kituufu! Obulwadde obw'obulabe si akabonero ka cervical cancer.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q3" }],
      },
      quiz2_wrong: {
        id: "quiz2_wrong",
        type: "answer",
        text: "Si kituufu. Obulwadde obw'obulabe si akabonero, ebikolebwa bye okwawukira, obulumi mu ddovu, ne discharge.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q3" }],
      },
      q3: {
        id: "q3",
        type: "question",
        text: "Omuzi ebikwata ku risk factors bya cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes3" },
          { text: "Nedda", next_node_id: "ans_no3" },
        ],
      },
      ans_yes3: {
        id: "ans_yes3",
        type: "answer",
        text: "Kituufu! Ebikwata ku risk birimu HPV, okunywa sigareeti, ne busungu mu mubiri.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Risk+Factors+for+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz3" }],
      },
      ans_no3: {
        id: "ans_no3",
        type: "answer",
        text: "Tewali kye tusuubira! Ebikwata ku risk birimu HPV, okunywa sigareeti, ab’obulenzi abangi, ne kutasuzumibwa.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Risk+Factors+for+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz3" }],
      },
      quiz3: {
        id: "quiz3",
        type: "quiz",
        text: "Quiz: Kiki ekikulu ku risk factors bya cervical cancer?",
        image_url: null,
        buttons: [
          { text: "A) Okunywa sigareeti", next_node_id: "quiz3_wrong" },
          { text: "B) HPV", next_node_id: "quiz3_correct" },
          { text: "C) Ebyafa ku muryango", next_node_id: "quiz3_wrong" },
          { text: "D) Emyaka eginze", next_node_id: "quiz3_wrong" },
        ],
      },
      quiz3_correct: {
        id: "quiz3_correct",
        type: "answer",
        text: "Kituufu! HPV ye nsibuko enkulu ku risk factors bya cervical cancer.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q4" }],
      },
      quiz3_wrong: {
        id: "quiz3_wrong",
        type: "answer",
        text: "Si kituufu. HPV ye nsibuko enkulu, wabula okunywa sigareeti n'ebirala birimu.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q4" }],
      },
      q4: {
        id: "q4",
        type: "question",
        text: "Omuzi engeri y’okukendeeza cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes4" },
          { text: "Nedda", next_node_id: "ans_no4" },
        ],
      },
      ans_yes4: {
        id: "ans_yes4",
        type: "answer",
        text: "Kirungi! Okukendeeza kirimu HPV vaccine, okusuzumibwa obutereevu, ne bulamu obulungi.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Preventing+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz4" }],
      },
      ans_no4: {
        id: "ans_no4",
        type: "answer",
        text: "Tewali nsonga! Oyinza okukendeeza ne HPV vaccine, Pap smear, ne bulamu obulungi.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Preventing+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz4" }],
      },
      quiz4: {
        id: "quiz4",
        type: "quiz",
        text: "Quiz: Kiki ekirimu mu kukendeeza cervical cancer?",
        image_url: null,
        buttons: [
          { text: "A) HPV vaccine", next_node_id: "quiz4_correct" },
          { text: "B) Okulya emmere mingi", next_node_id: "quiz4_wrong" },
          { text: "C) Okutambula ku bigere", next_node_id: "quiz4_wrong" },
          { text: "D) Okunywa omwenge mingi", next_node_id: "quiz4_wrong" },
        ],
      },
      quiz4_correct: {
        id: "quiz4_correct",
        type: "answer",
        text: "Kituufu! HPV vaccine kirina okuyamba okukendeeza cervical cancer.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q5" }],
      },
      quiz4_wrong: {
        id: "quiz4_wrong",
        type: "answer",
        text: "Si kituufu. HPV vaccine, okusuzumibwa, ne bulamu obulungi bye bikendeeza.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q5" }],
      },
      q5: {
        id: "q5",
        type: "question",
        text: "Omuzi ku kusuzuma cervical cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes5" },
          { text: "Nedda", next_node_id: "ans_no5" },
        ],
      },
      ans_yes5: {
        id: "ans_yes5",
        type: "answer",
        text: "Bulungi! Okusuzuma kirimu Pap test ne HPV test buli myaka 3-5.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Screening+for+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz5" }],
      },
      ans_no5: {
        id: "ans_no5",
        type: "answer",
        text: "Tewali kye tusuubira! Suzumibwa ne Pap smear oba HPV test obutereevu, otandike emyaka 21.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Screening+for+Cervical+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz5" }],
      },
      quiz5: {
        id: "quiz5",
        type: "quiz",
        text: "Quiz: Emyaka emeka gye bayita okutandika okusuzuma cervical cancer?",
        image_url: null,
        buttons: [
          { text: "A) Emyaka 18", next_node_id: "quiz5_wrong" },
          { text: "B) Emyaka 21", next_node_id: "quiz5_correct" },
          { text: "C) Emyaka 30", next_node_id: "quiz5_wrong" },
          { text: "D) Emyaka 40", next_node_id: "quiz5_wrong" },
        ],
      },
      quiz5_correct: {
        id: "quiz5_correct",
        type: "answer",
        text: "Kituufu! Okusuzuma kutandika emyaka 21, ku lugero lwa guidelines.",
        image_url: null,
        buttons: [{ text: "Maliriza", next_node_id: "end" }],
      },
      quiz5_wrong: {
        id: "quiz5_wrong",
        type: "answer",
        text: "Si kituufu. Okusuzuma kutandika emyaka 21, wabula kiyinza okuva ku risk factors zo.",
        image_url: null,
        buttons: [{ text: "Maliriza", next_node_id: "end" }],
      },
      end: {
        id: "end",
        type: "answer",
        text: "Webale ku kumanya ku cervical cancer! Omaze okumaliriza chat.",
        image_url: null,
        buttons: [],
      },
    },
  },
  breast: {
    en: {
      q1: {
        id: "q1",
        type: "question",
        text: "Do you know what breast cancer is?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes1" },
          { text: "No", next_node_id: "ans_no1" },
        ],
      },

      ans_yes1: {
        id: "ans_yes1",
        type: "answer",
        text: "Breast cancer is when abnormal cells grow uncontrollably in the breast. Early detection saves lives (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+What+Is+Breast+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz1" }],
      },

      ans_no1: {
        id: "ans_no1",
        type: "answer",
        text: "Breast cancer happens when breast cells grow abnormally. It can affect women and men (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+What+Is+Breast+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz1" }],
      },

      quiz1: {
        id: "quiz1",
        type: "quiz",
        text: "What best describes breast cancer?",
        image_url: null,
        buttons: [
          { text: "A. Infection", next_node_id: "wrong1" },
          { text: "B. Injury", next_node_id: "wrong1" },
          { text: "C. Abnormal cell growth", next_node_id: "correct1" },
          { text: "D. Allergy", next_node_id: "wrong1" },
        ],
      },

      correct1: {
        id: "correct1",
        type: "answer",
        text: "Correct ✅ Breast cancer involves abnormal cell growth.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q2" }],
      },

      wrong1: {
        id: "wrong1",
        type: "answer",
        text: "Not quite ❌ Breast cancer is abnormal cell growth.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q2" }],
      },

      q2: {
        id: "q2",
        type: "question",
        text: "Do you know what causes breast cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes2" },
          { text: "No", next_node_id: "ans_no2" },
        ],
      },

      ans_yes2: {
        id: "ans_yes2",
        type: "answer",
        text: "Causes include genetics, age, hormones, lifestyle, and environment (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Causes",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz2" }],
      },

      ans_no2: {
        id: "ans_no2",
        type: "answer",
        text: "Breast cancer risk rises with age, family history, hormones, and lifestyle (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Causes",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz2" }],
      },

      quiz2: {
        id: "quiz2",
        type: "quiz",
        text: "Which is a known risk factor?",
        image_url: null,
        buttons: [
          { text: "A. Witchcraft", next_node_id: "wrong2" },
          { text: "B. Family history", next_node_id: "correct2" },
          { text: "C. Cold weather", next_node_id: "wrong2" },
          { text: "D. Dirty water", next_node_id: "wrong2" },
        ],
      },

      correct2: {
        id: "correct2",
        type: "answer",
        text: "Correct ✅ Family history increases risk.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q3" }],
      },

      wrong2: {
        id: "wrong2",
        type: "answer",
        text: "Incorrect ❌ Family history is a real risk factor.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q3" }],
      },

      q3: {
        id: "q3",
        type: "question",
        text: "Can men get breast cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes3" },
          { text: "No", next_node_id: "ans_no3" },
        ],
      },

      ans_yes3: {
        id: "ans_yes3",
        type: "answer",
        text: "Yes. Men can get breast cancer, though it is rare (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Men+and+Breast+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz3" }],
      },

      ans_no3: {
        id: "ans_no3",
        type: "answer",
        text: "Actually, men can also develop breast cancer (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Men+and+Breast+Cancer",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz3" }],
      },

      quiz3: {
        id: "quiz3",
        type: "quiz",
        text: "Breast cancer affects:",
        image_url: null,
        buttons: [
          { text: "A. Only women", next_node_id: "wrong3" },
          { text: "B. Only men", next_node_id: "wrong3" },
          { text: "C. Women and men", next_node_id: "correct3" },
          { text: "D. Children only", next_node_id: "wrong3" },
        ],
      },

      correct3: {
        id: "correct3",
        type: "answer",
        text: "Correct ✅ Both women and men can be affected.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q4" }],
      },

      wrong3: {
        id: "wrong3",
        type: "answer",
        text: "Not correct ❌ Men can also get breast cancer.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q4" }],
      },

      q4: {
        id: "q4",
        type: "question",
        text: "Is every breast lump cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_no4" },
          { text: "No", next_node_id: "ans_yes4" },
        ],
      },

      ans_yes4: {
        id: "ans_yes4",
        type: "answer",
        text: "Most lumps are benign, but any new lump should be checked (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Breast+Lumps",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz4" }],
      },

      ans_no4: {
        id: "ans_no4",
        type: "answer",
        text: "Not all lumps are cancer, but testing is important (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Breast+Lumps",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz4" }],
      },

      quiz4: {
        id: "quiz4",
        type: "quiz",
        text: "What should you do if you find a lump?",
        image_url: null,
        buttons: [
          { text: "A. Ignore it", next_node_id: "wrong4" },
          { text: "B. Massage it", next_node_id: "wrong4" },
          { text: "C. See a health worker", next_node_id: "correct4" },
          { text: "D. Pray only", next_node_id: "wrong4" },
        ],
      },

      correct4: {
        id: "correct4",
        type: "answer",
        text: "Correct ✅ Always seek medical advice.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q5" }],
      },

      wrong4: {
        id: "wrong4",
        type: "answer",
        text: "Incorrect ❌ A health check is important.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q5" }],
      },

      q5: {
        id: "q5",
        type: "question",
        text: "Do you know early signs of breast cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes5" },
          { text: "No", next_node_id: "ans_no5" },
        ],
      },

      ans_yes5: {
        id: "ans_yes5",
        type: "answer",
        text: "Signs include lumps, nipple discharge, skin changes, or pain (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Early+Signs",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz5" }],
      },

      ans_no5: {
        id: "ans_no5",
        type: "answer",
        text: "Early signs can be painless lumps or breast changes (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Early+Signs",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz5" }],
      },

      quiz5: {
        id: "quiz5",
        type: "quiz",
        text: "Which is an early sign?",
        image_url: null,
        buttons: [
          { text: "A. Fever", next_node_id: "wrong5" },
          { text: "B. Breast lump", next_node_id: "correct5" },
          { text: "C. Headache", next_node_id: "wrong5" },
          { text: "D. Cough", next_node_id: "wrong5" },
        ],
      },

      correct5: {
        id: "correct5",
        type: "answer",
        text: "Correct ✅ A lump can be an early sign.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q6" }],
      },

      wrong5: {
        id: "wrong5",
        type: "answer",
        text: "Not correct ❌ Lumps are key warning signs.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q6" }],
      },

      q6: {
        id: "q6",
        type: "question",
        text: "Do you know how breast cancer can be prevented?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes6" },
          { text: "No", next_node_id: "ans_no6" },
        ],
      },

      ans_yes6: {
        id: "ans_yes6",
        type: "answer",
        text: "Healthy lifestyle, screening, and breastfeeding reduce risk (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Prevention",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz6" }],
      },

      ans_no6: {
        id: "ans_no6",
        type: "answer",
        text: "Regular screening and healthy living help prevent breast cancer (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Prevention",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz6" }],
      },

      quiz6: {
        id: "quiz6",
        type: "quiz",
        text: "Which helps lower risk?",
        image_url: null,
        buttons: [
          { text: "A. Smoking", next_node_id: "wrong6" },
          { text: "B. Exercise", next_node_id: "correct6" },
          { text: "C. Excess alcohol", next_node_id: "wrong6" },
          { text: "D. Stress only", next_node_id: "wrong6" },
        ],
      },

      correct6: {
        id: "correct6",
        type: "answer",
        text: "Correct ✅ Exercise helps reduce risk.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q7" }],
      },

      wrong6: {
        id: "wrong6",
        type: "answer",
        text: "Incorrect ❌ Healthy habits reduce risk.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q7" }],
      },

      q7: {
        id: "q7",
        type: "question",
        text: "Is breast cancer curable?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes7" },
          { text: "No", next_node_id: "ans_no7" },
        ],
      },

      ans_yes7: {
        id: "ans_yes7",
        type: "answer",
        text: "Yes. Early-detected breast cancer is highly treatable (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Treatment",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz7" }],
      },

      ans_no7: {
        id: "ans_no7",
        type: "answer",
        text: "Many cases are curable, especially if found early (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Treatment",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz7" }],
      },

      quiz7: {
        id: "quiz7",
        type: "quiz",
        text: "Best chance of cure comes from:",
        image_url: null,
        buttons: [
          { text: "A. Early detection", next_node_id: "correct7" },
          { text: "B. Prayer only", next_node_id: "wrong7" },
          { text: "C. Herbs", next_node_id: "wrong7" },
          { text: "D. Waiting", next_node_id: "wrong7" },
        ],
      },

      correct7: {
        id: "correct7",
        type: "answer",
        text: "Correct ✅ Early detection saves lives.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q8" }],
      },

      wrong7: {
        id: "wrong7",
        type: "answer",
        text: "Incorrect ❌ Early care improves survival.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q8" }],
      },

      q8: {
        id: "q8",
        type: "question",
        text: "Does breastfeeding reduce breast cancer risk?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes8" },
          { text: "No", next_node_id: "ans_no8" },
        ],
      },

      ans_yes8: {
        id: "ans_yes8",
        type: "answer",
        text: "Yes. Breastfeeding lowers breast cancer risk (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Breastfeeding",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz8" }],
      },

      ans_no8: {
        id: "ans_no8",
        type: "answer",
        text: "Breastfeeding actually helps reduce risk (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Breastfeeding",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz8" }],
      },

      quiz8: {
        id: "quiz8",
        type: "quiz",
        text: "Breastfeeding effect on risk:",
        image_url: null,
        buttons: [
          { text: "A. Increases risk", next_node_id: "wrong8" },
          { text: "B. No effect", next_node_id: "wrong8" },
          { text: "C. Reduces risk", next_node_id: "correct8" },
          { text: "D. Causes cancer", next_node_id: "wrong8" },
        ],
      },

      correct8: {
        id: "correct8",
        type: "answer",
        text: "Correct ✅ It reduces risk.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q9" }],
      },

      wrong8: {
        id: "wrong8",
        type: "answer",
        text: "Incorrect ❌ Breastfeeding is protective.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q9" }],
      },

      q9: {
        id: "q9",
        type: "question",
        text: "Do bras cause breast cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_no9" },
          { text: "No", next_node_id: "ans_yes9" },
        ],
      },

      ans_yes9: {
        id: "ans_yes9",
        type: "answer",
        text: "No evidence shows bras cause breast cancer (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Myth+Busting",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz9" }],
      },

      ans_no9: {
        id: "ans_no9",
        type: "answer",
        text: "Correct. Bras do not cause breast cancer (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Myth+Busting",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz9" }],
      },

      quiz9: {
        id: "quiz9",
        type: "quiz",
        text: "Bras and breast cancer:",
        image_url: null,
        buttons: [
          { text: "A. Cause cancer", next_node_id: "wrong9" },
          { text: "B. Increase risk", next_node_id: "wrong9" },
          { text: "C. No proven link", next_node_id: "correct9" },
          { text: "D. Cure cancer", next_node_id: "wrong9" },
        ],
      },

      correct9: {
        id: "correct9",
        type: "answer",
        text: "Correct ✅ No proven link exists.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q10" }],
      },

      wrong9: {
        id: "wrong9",
        type: "answer",
        text: "Incorrect ❌ No scientific link exists.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q10" }],
      },

      q10: {
        id: "q10",
        type: "question",
        text: "Do family planning methods affect breast cancer risk?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes10" },
          { text: "No", next_node_id: "ans_no10" },
        ],
      },

      ans_yes10: {
        id: "ans_yes10",
        type: "answer",
        text: "Some hormonal methods slightly change risk; benefits often outweigh risks (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Family+Planning",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz10" }],
      },

      ans_no10: {
        id: "ans_no10",
        type: "answer",
        text: "Certain hormonal methods may slightly affect risk (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Family+Planning",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz10" }],
      },

      quiz10: {
        id: "quiz10",
        type: "quiz",
        text: "Hormonal contraception and risk:",
        image_url: null,
        buttons: [
          { text: "A. Always causes cancer", next_node_id: "wrong10" },
          { text: "B. Slightly affects risk", next_node_id: "correct10" },
          { text: "C. No effect ever", next_node_id: "wrong10" },
          { text: "D. Cures cancer", next_node_id: "wrong10" },
        ],
      },

      correct10: {
        id: "correct10",
        type: "answer",
        text: "Correct ✅ Effects are small and manageable.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q11" }],
      },

      wrong10: {
        id: "wrong10",
        type: "answer",
        text: "Incorrect ❌ Risk change is small.",
        image_url: null,
        buttons: [{ text: "Next Topic", next_node_id: "q11" }],
      },

      q11: {
        id: "q11",
        type: "question",
        text: "Have you heard common breast cancer myths?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_yes11" },
          { text: "No", next_node_id: "ans_no11" },
        ],
      },

      ans_yes11: {
        id: "ans_yes11",
        type: "answer",
        text: "Myths include antiperspirants, phones, stress. Science shows no proof (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Common+Myths",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz11" }],
      },

      ans_no11: {
        id: "ans_no11",
        type: "answer",
        text: "Many myths exist, but evidence does not support them (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Common+Myths",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz11" }],
      },

      quiz11: {
        id: "quiz11",
        type: "quiz",
        text: "Which is a myth?",
        image_url: null,
        buttons: [
          {
            text: "A. Antiperspirants cause cancer",
            next_node_id: "correct11",
          },
          { text: "B. Early detection helps", next_node_id: "wrong11" },
          { text: "C. Screening saves lives", next_node_id: "wrong11" },
          { text: "D. Treatment works", next_node_id: "wrong11" },
        ],
      },

      correct11: {
        id: "correct11",
        type: "answer",
        text: "Correct ✅ That is a myth.",
        image_url: null,
        buttons: [{ text: "Next Myth", next_node_id: "q12" }],
      },

      wrong11: {
        id: "wrong11",
        type: "answer",
        text: "Incorrect ❌ Antiperspirants causing cancer is a myth.",
        image_url: null,
        buttons: [{ text: "Next Myth", next_node_id: "q12" }],
      },

      q12: {
        id: "q12",
        type: "question",
        text: "Is breast cancer only a disease of older women?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_no12" },
          { text: "No", next_node_id: "ans_yes12" },
        ],
      },

      ans_yes12: {
        id: "ans_yes12",
        type: "answer",
        text: "Correct. Breast cancer can affect younger women too, though risk increases with age (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Age+and+Risk",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz12" }],
      },

      ans_no12: {
        id: "ans_no12",
        type: "answer",
        text: "Not true. Younger women can also develop breast cancer (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Age+and+Risk",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz12" }],
      },

      quiz12: {
        id: "quiz12",
        type: "quiz",
        text: "Who can get breast cancer?",
        image_url: null,
        buttons: [
          { text: "A. Only older women", next_node_id: "wrong12" },
          { text: "B. Only young women", next_node_id: "wrong12" },
          { text: "C. Women of all ages", next_node_id: "correct12" },
          { text: "D. Children only", next_node_id: "wrong12" },
        ],
      },

      correct12: {
        id: "correct12",
        type: "answer",
        text: "Correct ✅ Women of many ages can be affected.",
        image_url: null,
        buttons: [{ text: "Next Myth", next_node_id: "q13" }],
      },

      wrong12: {
        id: "wrong12",
        type: "answer",
        text: "Incorrect ❌ Breast cancer can affect many ages.",
        image_url: null,
        buttons: [{ text: "Next Myth", next_node_id: "q13" }],
      },

      q13: {
        id: "q13",
        type: "question",
        text: "Are painful breast lumps more dangerous than painless ones?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_no13" },
          { text: "No", next_node_id: "ans_yes13" },
        ],
      },

      ans_yes13: {
        id: "ans_yes13",
        type: "answer",
        text: "Correct. Many cancerous lumps are painless (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Pain+Myth",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz13" }],
      },

      ans_no13: {
        id: "ans_no13",
        type: "answer",
        text: "Pain does not determine cancer risk. Painless lumps can be cancerous (ACS).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Pain+Myth",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz13" }],
      },

      quiz13: {
        id: "quiz13",
        type: "quiz",
        text: "Which lump needs medical check?",
        image_url: null,
        buttons: [
          { text: "A. Only painful lumps", next_node_id: "wrong13" },
          { text: "B. Only large lumps", next_node_id: "wrong13" },
          { text: "C. Any new lump", next_node_id: "correct13" },
          { text: "D. Soft lumps only", next_node_id: "wrong13" },
        ],
      },

      correct13: {
        id: "correct13",
        type: "answer",
        text: "Correct ✅ Any new lump should be checked.",
        image_url: null,
        buttons: [{ text: "Next Myth", next_node_id: "q14" }],
      },

      wrong13: {
        id: "wrong13",
        type: "answer",
        text: "Incorrect ❌ All new lumps need checking.",
        image_url: null,
        buttons: [{ text: "Next Myth", next_node_id: "q14" }],
      },

      q14: {
        id: "q14",
        type: "question",
        text: "Does surgery cause breast cancer to spread?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_no14" },
          { text: "No", next_node_id: "ans_yes14" },
        ],
      },

      ans_yes14: {
        id: "ans_yes14",
        type: "answer",
        text: "Correct. Surgery does not spread cancer and is a key treatment (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Surgery+Myth",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz14" }],
      },

      ans_no14: {
        id: "ans_no14",
        type: "answer",
        text: "This is a myth. Surgery helps remove cancer safely (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Surgery+Myth",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz14" }],
      },

      quiz14: {
        id: "quiz14",
        type: "quiz",
        text: "Surgery for breast cancer:",
        image_url: null,
        buttons: [
          { text: "A. Spreads cancer", next_node_id: "wrong14" },
          { text: "B. Has no role", next_node_id: "wrong14" },
          { text: "C. Is effective treatment", next_node_id: "correct14" },
          { text: "D. Is harmful always", next_node_id: "wrong14" },
        ],
      },

      correct14: {
        id: "correct14",
        type: "answer",
        text: "Correct ✅ Surgery is an effective treatment.",
        image_url: null,
        buttons: [{ text: "Next Myth", next_node_id: "q15" }],
      },

      wrong14: {
        id: "wrong14",
        type: "answer",
        text: "Incorrect ❌ Surgery does not spread cancer.",
        image_url: null,
        buttons: [{ text: "Next Myth", next_node_id: "q15" }],
      },

      q15: {
        id: "q15",
        type: "question",
        text: "Can herbal medicine alone cure breast cancer?",
        image_url: null,
        buttons: [
          { text: "Yes", next_node_id: "ans_no15" },
          { text: "No", next_node_id: "ans_yes15" },
        ],
      },

      ans_yes15: {
        id: "ans_yes15",
        type: "answer",
        text: "Correct. There is no proof herbs alone cure breast cancer (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Herbal+Myth",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz15" }],
      },

      ans_no15: {
        id: "ans_no15",
        type: "answer",
        text: "This is a myth. Medical treatment is essential (WHO).",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Herbal+Myth",
        buttons: [{ text: "Take Quiz", next_node_id: "quiz15" }],
      },

      quiz15: {
        id: "quiz15",
        type: "quiz",
        text: "Best treatment approach is:",
        image_url: null,
        buttons: [
          { text: "A. Herbs only", next_node_id: "wrong15" },
          { text: "B. Medical care", next_node_id: "correct15" },
          { text: "C. Waiting", next_node_id: "wrong15" },
          { text: "D. Avoid doctors", next_node_id: "wrong15" },
        ],
      },

      correct15: {
        id: "correct15",
        type: "answer",
        text: "Correct ✅ Medical treatment saves lives.",
        image_url: null,
        buttons: [{ text: "Next", next_node_id: "end" }],
      },

      wrong15: {
        id: "wrong15",
        type: "answer",
        text: "Incorrect ❌ Medical care is essential.",
        image_url: null,
        buttons: [{ text: "Next", next_node_id: "end" }],
      },

      end: {
        id: "end",
        type: "answer",
        text: "Thank you for learning about breast cancer. Early knowledge saves lives 💙",
        image_url: null,
        buttons: [],
      },
    },
    lg: {
      q1: {
        id: "q1",
        type: "question",
        text: "Omuzi owulira oba kyini ekiriko okukola breast cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes1" },
          { text: "Nedda", next_node_id: "ans_no1" },
        ],
      },
      ans_yes1: {
        id: "ans_yes1",
        type: "answer",
        text: "Kirungi nnyo! Breast cancer eyinza okukolebwa genetic mutations, hormones, ne bulamu.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Causes+of+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz1" }],
      },
      ans_no1: {
        id: "ans_no1",
        type: "answer",
        text: "Tewali nsonga! Ebikola birimu genetic factors nga BRCA, hormones, ne bulamu.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Causes+of+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz1" }],
      },
      quiz1: {
        id: "quiz1",
        type: "quiz",
        text: "Quiz: Kiki ekikola breast cancer mu njawulo?",
        image_url: null,
        buttons: [
          { text: "A) BRCA gene mutations", next_node_id: "quiz1_correct" },
          { text: "B) Okunywa soka", next_node_id: "quiz1_wrong" },
          { text: "C) Okulya obubi", next_node_id: "quiz1_wrong" },
          { text: "D) Okutambula ku bigere", next_node_id: "quiz1_wrong" },
        ],
      },
      quiz1_correct: {
        id: "quiz1_correct",
        type: "answer",
        text: "Kituufu! BRCA gene mutations bikola breast cancer mu njawulo.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q2" }],
      },
      quiz1_wrong: {
        id: "quiz1_wrong",
        type: "answer",
        text: "Si kituufu. BRCA gene mutations bikola breast cancer, wabula bulamu na byokulala birimu.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q2" }],
      },
      q2: {
        id: "q2",
        type: "question",
        text: "Omuzi ebikolebwa bya breast cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes2" },
          { text: "Nedda", next_node_id: "ans_no2" },
        ],
      },
      ans_yes2: {
        id: "ans_yes2",
        type: "answer",
        text: "Bulungi! Noonya ebibala, okutondawo mu kifuba, discharge okuva mu nipple, oba okutondawo ku nkoko.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Signs+and+Symptoms+of+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz2" }],
      },
      ans_no2: {
        id: "ans_no2",
        type: "answer",
        text: "Kirungi! Ebikolebwa birimu ekibala, okutondawo mu kifuba, ebizibu ku nipple, oba okutondawo ku nkoko.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Signs+and+Symptoms+of+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz2" }],
      },
      quiz2: {
        id: "quiz2",
        type: "quiz",
        text: "Quiz: Kiki akabonero ak’olubereberye aka breast cancer?",
        image_url: null,
        buttons: [
          {
            text: "A) Ekibala ekipya mu kifuba",
            next_node_id: "quiz2_correct",
          },
          { text: "B) Okwongera obuzito", next_node_id: "quiz2_wrong" },
          { text: "C) Obulumi ku mutwe", next_node_id: "quiz2_wrong" },
          { text: "D) Obulumi ku mgongo", next_node_id: "quiz2_wrong" },
        ],
      },
      quiz2_correct: {
        id: "quiz2_correct",
        type: "answer",
        text: "Kituufu! Ekibala ekipya mu kifuba kye akabonero ak'olubereberye aka breast cancer.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q3" }],
      },
      quiz2_wrong: {
        id: "quiz2_wrong",
        type: "answer",
        text: "Si kituufu. Ekibala ekipya, okutondawo mu kifuba, discharge okuva mu nipple, oba okutondawo ku nkoko bye bikolebwa.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q3" }],
      },
      q3: {
        id: "q3",
        type: "question",
        text: "Omuzi ebikwata ku risk factors bya breast cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes3" },
          { text: "Nedda", next_node_id: "ans_no3" },
        ],
      },
      ans_yes3: {
        id: "ans_yes3",
        type: "answer",
        text: "Kituufu! Ebikwata ku risk birimu emyaka, ebyafa ku muryango, genetics, ne hormone use.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Risk+Factors+for+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz3" }],
      },
      ans_no3: {
        id: "ans_no3",
        type: "answer",
        text: "Tewali kye tusuubira! Ebikulu ku risk birimu okuba mukazi, emyaka, ebyafa ku muryango, ne genes ezimu.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Risk+Factors+for+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz3" }],
      },
      quiz3: {
        id: "quiz3",
        type: "quiz",
        text: "Quiz: Kiki ekikulu ku risk factors bya breast cancer?",
        image_url: null,
        buttons: [
          { text: "A) Okuba mukazi", next_node_id: "quiz3_correct" },
          { text: "B) Okunywa coffee", next_node_id: "quiz3_wrong" },
          { text: "C) Okuba n’empologoma", next_node_id: "quiz3_wrong" },
          { text: "D) Okubeera mu kibuga", next_node_id: "quiz3_wrong" },
        ],
      },
      quiz3_correct: {
        id: "quiz3_correct",
        type: "answer",
        text: "Kituufu! Okuba mukazi kye kikulu ku risk factors bya breast cancer.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q4" }],
      },
      quiz3_wrong: {
        id: "quiz3_wrong",
        type: "answer",
        text: "Si kituufu. Okuba mukazi kye kikulu, wabula emyaka n’ebyafa ku muryango bikulu nnyo.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q4" }],
      },
      q4: {
        id: "q4",
        type: "question",
        text: "Omuzi engeri y’okukendeeza breast cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes4" },
          { text: "Nedda", next_node_id: "ans_no4" },
        ],
      },
      ans_yes4: {
        id: "ans_yes4",
        type: "answer",
        text: "Kirungi! Okukendeeza kirimu bulamu obulungi, exercise, okugabanya okunywa omwenge, ne kusuzuma.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Preventing+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz4" }],
      },
      ans_no4: {
        id: "ans_no4",
        type: "answer",
        text: "Tewali nsonga! Guma mu bulamu obulungi, kola exercise, leka okunywa sigareeti, ne kusuzumibwa obutereevu.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Preventing+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz4" }],
      },
      quiz4: {
        id: "quiz4",
        type: "quiz",
        text: "Quiz: Kiki ekirimu mu bulamu ekirina okuyamba okukendeeza breast cancer?",
        image_url: null,
        buttons: [
          {
            text: "A) Okukola exercise obutereevu",
            next_node_id: "quiz4_correct",
          },
          { text: "B) Okulya emmere mingi", next_node_id: "quiz4_wrong" },
          { text: "C) Okunywa omwenge mingi", next_node_id: "quiz4_wrong" },
          { text: "D) Okunywa sigareeti", next_node_id: "quiz4_wrong" },
        ],
      },
      quiz4_correct: {
        id: "quiz4_correct",
        type: "answer",
        text: "Kituufu! Okukola exercise obutereevu kirina okuyamba okukendeeza breast cancer.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q5" }],
      },
      quiz4_wrong: {
        id: "quiz4_wrong",
        type: "answer",
        text: "Si kituufu. Okuguma mu bulamu obulungi, okukola exercise, ne okugabanya omwenge bye bikendeeza.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q5" }],
      },
      q5: {
        id: "q5",
        type: "question",
        text: "Omuzi ku kusuzuma breast cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes5" },
          { text: "Nedda", next_node_id: "ans_no5" },
        ],
      },
      ans_yes5: {
        id: "ans_yes5",
        type: "answer",
        text: "Bulungi! Okusuzuma kirimu mammograms okuva emyaka 40-50, ne self-checks buli mwezi.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Screening+for+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz5" }],
      },
      ans_no5: {
        id: "ans_no5",
        type: "answer",
        text: "Tewali kye tusuubira! Funa mammograms buli mwaka 1-2 okuva emyaka 40, ne kola self-checks buli mwezi.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Screening+for+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz5" }],
      },
      quiz5: {
        id: "quiz5",
        type: "quiz",
        text: "Quiz: Emyaka emeka gye bayita okutandika okusuzuma breast cancer ne mammogram?",
        image_url: null,
        buttons: [
          { text: "A) Emyaka 30", next_node_id: "quiz5_wrong" },
          { text: "B) Emyaka 40-50", next_node_id: "quiz5_correct" },
          { text: "C) Emyaka 60", next_node_id: "quiz5_wrong" },
          { text: "D) Emyaka 70", next_node_id: "quiz5_wrong" },
        ],
      },
      quiz5_correct: {
        id: "quiz5_correct",
        type: "answer",
        text: "Kituufu! Okusuzuma ne mammogram kutandika emyaka 40-50, ku lugero lwa guidelines.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q6" }],
      },
      quiz5_wrong: {
        id: "quiz5_wrong",
        type: "answer",
        text: "Si kituufu. Okusuzuma kutandika emyaka 40-50, wabula kiyinza okuva ku risk factors zo.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q6" }],
      },
      q6: {
        id: "q6",
        type: "question",
        text: "Omuzi ku treatment options za breast cancer?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes6" },
          { text: "Nedda", next_node_id: "ans_no6" },
        ],
      },
      ans_yes6: {
        id: "ans_yes6",
        type: "answer",
        text: "Kirungi nnyo! Treatments zirimu surgery, chemotherapy, radiation, hormone therapy, ne targeted drugs.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Treatment+Options+for+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz6" }],
      },
      ans_no6: {
        id: "ans_no6",
        type: "answer",
        text: "Tewali nsonga! Common treatments zirimu surgery okuggya tumor, chemotherapy, radiation, ne hormone therapy.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Treatment+Options+for+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz6" }],
      },
      quiz6: {
        id: "quiz6",
        type: "quiz",
        text: "Quiz: Kiki ekirimu mu treatment ya early-stage breast cancer?",
        image_url: null,
        buttons: [
          { text: "A) Surgery", next_node_id: "quiz6_correct" },
          { text: "B) Antibiotics", next_node_id: "quiz6_wrong" },
          { text: "C) Painkillers", next_node_id: "quiz6_wrong" },
          { text: "D) Vitamins", next_node_id: "quiz6_wrong" },
        ],
      },
      quiz6_correct: {
        id: "quiz6_correct",
        type: "answer",
        text: "Kituufu! Surgery kirimu mu treatment ya early-stage breast cancer.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q7" }],
      },
      quiz6_wrong: {
        id: "quiz6_wrong",
        type: "answer",
        text: "Si kituufu. Surgery, chemotherapy, radiation, ne hormone therapy bye bikulu.",
        image_url: null,
        buttons: [{ text: "Okuddako ku Topic", next_node_id: "q7" }],
      },
      q7: {
        id: "q7",
        type: "question",
        text: "Omuzi ku support resources za breast cancer patients?",
        image_url: null,
        buttons: [
          { text: "Ye", next_node_id: "ans_yes7" },
          { text: "Nedda", next_node_id: "ans_no7" },
        ],
      },
      ans_yes7: {
        id: "ans_yes7",
        type: "answer",
        text: "Bulungi! Support zirimu counseling, support groups, hotlines, ne organizations nga Susan G. Komen.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Support+Resources+for+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz7" }],
      },
      ans_no7: {
        id: "ans_no7",
        type: "answer",
        text: "Tewali nsonga! Noonya support okuva ku family, friends, counselors, ne groups nga Reach to Recovery.",
        image_url:
          "https://via.placeholder.com/400x300?text=Infographic:+Support+Resources+for+Breast+Cancer",
        buttons: [{ text: "Dda ku Quiz", next_node_id: "quiz7" }],
      },
      quiz7: {
        id: "quiz7",
        type: "quiz",
        text: "Quiz: Kiki ekirimu mu support ekirina okuyamba breast cancer patients?",
        image_url: null,
        buttons: [
          { text: "A) Support groups", next_node_id: "quiz7_correct" },
          { text: "B) Okwawukana ne diagnosis", next_node_id: "quiz7_wrong" },
          { text: "C) Okwewaba", next_node_id: "quiz7_wrong" },
          { text: "D) Okugaana treatment", next_node_id: "quiz7_wrong" },
        ],
      },
      quiz7_correct: {
        id: "quiz7_correct",
        type: "answer",
        text: "Kituufu! Support groups zirina okuyamba emotional ne practical help ku breast cancer patients.",
        image_url: null,
        buttons: [{ text: "Maliriza", next_node_id: "end" }],
      },
      quiz7_wrong: {
        id: "quiz7_wrong",
        type: "answer",
        text: "Si kituufu. Support groups, counseling, ne community resources bye bikulu ku coping.",
        image_url: null,
        buttons: [{ text: "Maliriza", next_node_id: "end" }],
      },
      end: {
        id: "end",
        type: "answer",
        text: "Webale ku kumanya ku breast cancer! Omaze okumaliriza chat.",
        image_url: null,
        buttons: [],
      },
    },
  },
};
