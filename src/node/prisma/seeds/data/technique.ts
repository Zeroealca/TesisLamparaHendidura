export const technique = [
  {
    name: "DIFUSA",
    short_description: "Vista general del segmento anterior (IACLE)",
    description:
      "Haz de luz circular o difuso que es dirigido oblicuamente al segmento anterior. Se utiliza iluminación baja a media, con el uso opcional de un filtro difusor.",
    magnification: "Baja",
    lightingAngle: "45 grados",
    imageNormal:
      "https://drive.google.com/uc?id=1CNhB6wobI3BVGimVTVAejO4NkiMnYEhh&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=13Pb2avpFnh2vR8hUr6C_3dtjcAqGeSht&export=view",
    assess:
      '{"text":"Observación general de:","options":[{"name":"Párpados Párpados y pestañas pestañas"},{"name":"Conjuntiva Conjuntiva y carúncula carúncula"},{"name":"Esclera Esclera y vasos sanguíneos sanguíneos"},{"name":"Córnea"},{"name":"Iris y pupila"}],"intensity":0,"orientation":[45]}',
  },
  {
    name: "DIRECTA (Paralelepípedo)",
    short_description: "Paralelepípedo enfocado en la córnea (IACLE)",
    description:
      "El haz luminoso es enfocado en el área a observar. El paralelepípedo, es una hendidura ancha (1 a 3 mm) formando un volumen sólido, enfocado sobre la estructura a ser examinada. Se utiliza una intensidad luminosa baja a media.",
    magnification: "Baja a media",
    lightingAngle: "De 30 a 45 grados",
    imageNormal:
      "https://drive.google.com/uc?id=1sks8xT9gW1Dox6a7bCge81m7q9-iAWsw&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=1Je9BfZLL9mXOCBtQevN0DA8NSBCiOaVu&export=view",
    assess:
      '{"options":[{"name":"Córnea:","submenu":[{"name":"Nervios corneales"},{"name":"cicatrices"},{"name":"Abrasiones"},{"name":"infiltrados"},{"name":"pliegues"},{"name":"estrías"}]},{"name":"Superficie del cristalino."},{"name":"Evaluación de la adaptación de lentes de contacto."}],"orientation":[30,45],"intensity":25}',
  },
  {
    name: "DIRECTA (Sección óptica)",
    short_description: "Capas de la córnea (Lowther)",
    description:
      "El haz luminoso es enfocado en el área a observar. Se utiliza una Sección Óptica i.e. una hendidura delgada (≤ 1 mm),  1 mm), la cual es enfocada en la córnea. Se cual es enfocada en la córnea. Se utiliza utiliza intensidad luminosa media a alta.",
    magnification: "Baja a media",
    lightingAngle: "De 30 a 45 grados",
    imageNormal:
      "https://drive.google.com/uc?id=1rbe2uo7hO9h38NGq0smnnfspp88zNAIk&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=1d3hWHJq-u9_K1u8O1nRFwSfUW75Esc0y&export=view",
    assess:
      '{"options":[{"name":"Estimar el espesor corneal."},{"name":"Determinar la profundidad de cuerpos extraños o de opacidades corneales."},{"name":"Irregularidades corneales."},{"name":"Película lagrimal con fluoresceína."}],"intensity":50,"orientation":[30,45]}',
  },
  {
    name: "HAZ CÓNICO",
    short_description: "Cámara anterior transparente (IACLE)",
    description:
      "Consiste en un paralelepípedo de baja altura i.e. 2 mm aprox. Esto da como resultado una fuente de luz cuadrada, brillante y pequeña, la cual es enfocada en la cámara anterior (entre la en la cámara anterior (entre la córnea y el córnea y el cristalino), utilizando una intensidad luminosa alta. Importante: La luz ambiente debe estar completamente disminuida.",
    magnification: "Alta",
    lightingAngle: "De 30 a 45 grados",
    imageNormal:
      "https://drive.google.com/uc?id=1cSAYtQiAbYgGkjEgA8_0dAatgy6Iejs9&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=1z5p9VB59yz7eLwGrqWfjSNRUQemzei97&export=view",
    assess:
      '{"text":"Transparencia de la cámara anterior, la cual debe ser totalmente oscura. Si se observan destellos, pigmentos o desechos celulares (fenómeno Tyndall), estamos frente a una respuesta uveal. Normalmente estos hallazgos son signos clínicos de Uveítis.","intensity":75,"orientation":[30,45]}',
  },
  {
    name: "INDIRECTA",
    short_description: "Cicatriz corneal (IACLE)",
    description:
      "El haz luminoso (paralelepípedo) se hace incidir en una zona adyacente a la zona a observar (zona lesionada/alterada). Se utiliza un paralelepípedo el cual puede ser enfocado sobre la córnea o el cristalino utilizando iluminación baja a media",
    magnification: "Media a alta",
    lightingAngle: "De 30 a 45 grados",
    imageNormal:
      "https://drive.google.com/uc?id=1Pt7GGuhCt0yTKHw2v6elqFji4oM-_X5f&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=1jWu206-g9kvz3PfBqyXlJznaTh4Owi2Z&export=view",
    assess:
      '{"options":[{"name":"Vacuolas epiteliales"},{"name":"Erosiones epiteliales"},{"name":"Cicatrices corneales"},{"name":"Patologías del iris"},{"name":"Esfínter pupilar"}],"intensity":25,"orientation":[30,45]}',
  },
  {
    name: "DISPERSIÓN ESCLERAL",
    short_description: "Nubosidad corneal central (Caroline)",
    description:
      "Consiste en un paralelepípedo enfocado en el limbo corneal, de tal forma que toda la córnea es iluminada, bajo el principio óptico de dispersión de la luz. Se utiliza una intensidad luminosa alta.",
    magnification: "Baja",
    lightingAngle: "De 30 a 45 grados",
    imageNormal:
      "https://drive.google.com/uc?id=1tVZaMc2foreFJCJf1xA3c4upqMGOP4we&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=1anp7YoFJ7Opls8sn6y0KMjVC9eHQwUYw&export=view",
    assess:
      '{"options":[{"name":"Edema epitelial"},{"name":"Cicatrices corneales"},{"name":"Cuerpos extraños"}],"intensity":75,"orientation":[30,45]}',
  },
  {
    name: "RETRO-ILUMINACIÓN DIRECTA",
    short_description: "Neovascularización corneal (Caroline)",
    description:
      "Se aprovecha la luz que se refleja del iris o retina (luz de fondo) que incide sobre la zona corneal a observar. Se utiliza un paralelepípedo, con una intensidad luminosa de media a alta.",
    magnification: "Media a alta",
    lightingAngle: "60 grados",
    imageNormal:
      "https://drive.google.com/uc?id=1NAy3BRZ3tCLBdDJU6davqF3OSa71HH-8&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=10f2_xFyod842tu0T6Bgo8tXfDWUhNQNr&export=view",
    assess:
      '{"options":[{"name":"Neovascularización corneal"},{"name":"Cuerpos extraños en córnea"},{"name":"Depósitos en lentes de contacto"}],"intensity":50,"orientation":[60]}',
  },
  {
    name: "RETRO-ILUMINACIÓN INDIRECTA",
    short_description: "Microquistes epiteliales (Zantos)",
    description:
      "La luz que se refleja del iris o retina se hace incidir en un área adyacente a la zona corneal a observar. Se utiliza un paralelepípedo con una intensidad luminosa de media a alta.",
    magnification: "Media a alta",
    lightingAngle: "Ángulo variable",
    imageNormal:
      "https://drive.google.com/uc?id=1wbtcKwJ0ZtBvV7MOFhazb65kbzLiwgeZ&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=1jLF6pOoVQICm3g5Je1PdOeattwD5tZxA&export=view",
    assess:
      '{"options":[{"name":"Microquistes epiteliales"},{"name":"Vacuolas epiteliales"},{"name":"Distrofias corneale Distrofias corneales"},{"name":"Opacidades del cristalino"},{"name":"Depósitos en lentes de contacto"}],"intensity":50,"orientation":[1]}',
  },
  {
    name: "REFLEXIÓN ESPECULAR",
    short_description: "Gutatta endotelial (Zantos)",
    description:
      "Se obtiene cuando el ángulo de incidencia es igual al ángulo de reflexión; de tal manera que el haz reflejado de la córnea pase a través solo de pase a través solo de uno de los oculares uno de los oculares del microscopio. Se utiliza un paralelepípedo con una intensidad luminosa de media a alta.",
    magnification: "Alta",
    lightingAngle: "60 grados",
    imageNormal:
      "https://drive.google.com/uc?id=1kGZBCaLb5M_goXHWR8UeorzvfdfVeV0m&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=1yxPPLhh7wPDlvEGMvpsJbFC-mFpVpE3j&export=view",
    assess:
      '{"options":[{"name":"Células del endotelio corneal"},{"name":"Desechos de la película lagrimal"},{"name":"Espesor de la capa lipídica de la película lagrimal (patrones de interferencia)"}],"intensity":75,"orientation":[60]}',
  },
  {
    name: "Técnica de Van Herick",
    short_description: "Profundidad d e cámara anterior normal (Rojas)",
    description:
      "Consiste en una sección óptica que se enfoca en el limbo de manera que el “corte tranversal” del haz de luz de la sección óptica corte la óptica corte la córnea e ilumine córnea e ilumine el iris. el iris. El ancho de la sección corneal es comparado con la distancia entre el iris y la corne con la distancia entre el iris y la cornea posterior, es decir, el intervalo acuoso.",
    magnification: "Baja",
    lightingAngle: "De 60 grados",
    imageNormal:
      "https://drive.google.com/uc?id=1Honx-UzR4GW7m7_dMpmIXpG3Zpfub4-I&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=17LhrP5xN_h5XjXjk_jBmdIiFsHp2S23B&export=view",
    assess:
      '{"text":"El objetivo es determinar que tan cerca se encuentra el iris con relación a la superficie posterior corneal en la zona limbal. Esta técnica es utilizada para estimar la profundidad de la cámara anterior (CA). La relación normal debe ser 1/4 a 1/2 del espesor de la sección corneal. Igual o menor a 1/4 estamos frente a una CA moderadamente estrecha.","intensity":0,"orientation":[60]}',
  },
  {
    name: "Iluminación filtrada",
    short_description: "Queratitis puntata superficial (IACLE)",
    description:
      "Está técnica utiliza el filtro azul de cobalto más la instilación de fluoresceína. Se puede utilizar en combinación con un filtro Wratten #12 (color amarillo) para mejorar el contraste del fluorograma. La intensidad luminosa es variable.",
    magnification: "Baja a Alta",
    lightingAngle: "Ángulo variable",
    imageNormal:
      "https://drive.google.com/uc?id=1qxKXywMJKEh3kwosRwGvxCcg02DGzEgK&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=1594228JqNBXNtK3UjjwRolRh2X0ArjSm&export=view",
    assess:
      '{"options":[{"name":"Tinción corneal"},{"name":"Tinción conjuntival"},{"name":"Evalúa el tiempo de ruptura de la película lagrimal (BUT)"},{"name":"Evaluación de Evaluación de la adaptación la adaptación de los lentes de contacto RPG (fluorogramas)"}],"intensity":25,"orientation":[1]}',
  },
  {
    name: "ILUMINACIÓN TANGENCIAL",
    short_description: "Coloboma de iris (IACLE)",
    description:
      "Es una iluminación oblicua ubicada hacia el canto externo del ojo del paciente y el sistema de observación frente al ojo del examinador, se utiliza un haz de luz difuso con una intensidad luminosa de media a alta.",
    magnification: "Baja a media",
    lightingAngle: "De 70 a 90 grados",
    imageNormal:
      "https://drive.google.com/uc?id=14WVksmlHg2bZEoTX59fB2Sf2SDmskMVZ&export=view",
    imageTechnique:
      "https://drive.google.com/uc?id=1HhMh_1PH3QHeGQDSkGyu1r6l_eycIOzi&export=view",
    assess:
      '{"options":[{"name":"Tinción corneal"},{"name":"Tinción conjuntival"},{"name":"Evalúa el tiempo de ruptura de la película lagrimal (BUT)"},{"name":"Evaluación de Evaluación de la adaptación la adaptación de los lentes de contacto RPG (fluorogramas)"}],"intensity":50,"orientation":[70,90]}',
  },
];
