import { CarPart } from "../interfaces/car-part.interface";

export const CAR_PARTS = {
  PARAFANGO_AD: "Parafango_ad",
  PORTA_AD: "Porta_ad",
  PORTA_PD: "Porta_pd",
  PARAFANGO_PD: "Parafango_pd",
  COFANO: "Cofano",
  TETTO: "Tetto",
  PIANTONE_D: "Piantone_d",
  PIANTONE_S: "Piantone_s",
  SPORTELLO_S: "Sportello_s",
  SPORTELLO_I: "Sportello_i",
  PARAFANGO_AS: "Parafango_as",
  PORTA_AS: "Porta_as",
  PORTA_PS: "Porta_ps",
  PARAFANGO_PS: "Parafango_ps",
};

export const CAR_PARTS_LIST: CarPart[] = Object.keys(CAR_PARTS).map((key) => {
  return {
    name: CAR_PARTS[key as keyof typeof CAR_PARTS],
    isAluminum: false,
    shouldPaint: false,
    shouldReplace: false,
    shouldGlue: false,
    smallSmash: "",
    smallSmashWorkingHours: 0,
    smash: "",
    smashWorkingHours: 0,
    note: {
      smashes: "",
      details: "",
    },
    workingHours: 0,
    price: 0,
  };
});

export const CAR_PARTS_CANVAS_COORDINATES = {
  Parafango_ad: { x: 310, y: 280, relocate: false },
  Porta_ad: { x: 510, y: 270, relocate: false },
  Porta_pd: { x: 689, y: 270, relocate: false },
  Parafango_pd: { x: 860, y: 285, relocate: false },
  Cofano: { x: 265, y: 630, relocate: false },
  Tetto: { x: 660, y: 630, relocate: false },
  Piantone_d: { x: 790, y: 482, relocate: false },
  Piantone_s: { x: 795, y: 755, relocate: false },
  Sportello_s: { x: 960, y: 630, relocate: true },
  Sportello_i: { x: 1075, y: 630, relocate: true },
  Parafango_as: { x: 310, y: 995, relocate: false },
  Porta_as: { x: 510, y: 985, relocate: false },
  Porta_ps: { x: 689, y: 985, relocate: false },
  Parafango_ps: { x: 860, y: 975, relocate: false },
};

export const SMASH_WORKING_HOURS = {
  0: { smallSmash: 0, smash: 0 },
  1: { smallSmash: 3, smash: 5 },
  2: { smallSmash: 4, smash: 6 },
  3: { smallSmash: 5, smash: 7 },
  4: { smallSmash: 5, smash: 8 },
  5: { smallSmash: 6, smash: 9 },
  6: { smallSmash: 7, smash: 10 },
  7: { smallSmash: 8, smash: 10 },
  8: { smallSmash: 8, smash: 11 },
  9: { smallSmash: 9, smash: 12 },
  10: { smallSmash: 10, smash: 13 },
  11: { smallSmash: 10, smash: 14 },
  12: { smallSmash: 11, smash: 15 },
  13: { smallSmash: 11, smash: 15 },
  14: { smallSmash: 12, smash: 16 },
  15: { smallSmash: 13, smash: 17 },
  16: { smallSmash: 13, smash: 18 },
  17: { smallSmash: 14, smash: 19 },
  18: { smallSmash: 14, smash: 19 },
  19: { smallSmash: 15, smash: 20 },
  20: { smallSmash: 16, smash: 21 },
  21: { smallSmash: 16, smash: 22 },
  22: { smallSmash: 17, smash: 23 },
  23: { smallSmash: 17, smash: 23 },
  24: { smallSmash: 18, smash: 24 },
  25: { smallSmash: 18, smash: 25 },
  26: { smallSmash: 19, smash: 26 },
  27: { smallSmash: 19, smash: 27 },
  28: { smallSmash: 20, smash: 27 },
  29: { smallSmash: 20, smash: 28 },
  30: { smallSmash: 20, smash: 29 },
  31: { smallSmash: 21, smash: 30 },
  32: { smallSmash: 21, smash: 31 },
  33: { smallSmash: 21, smash: 31 },
  34: { smallSmash: 22, smash: 32 },
  35: { smallSmash: 22, smash: 33 },
  36: { smallSmash: 22, smash: 34 },
  37: { smallSmash: 22, smash: 35 },
  38: { smallSmash: 23, smash: 35 },
  39: { smallSmash: 23, smash: 36 },
  40: { smallSmash: 23, smash: 37 },
  41: { smallSmash: 24, smash: 38 },
  42: { smallSmash: 24, smash: 38 },
  43: { smallSmash: 24, smash: 39 },
  44: { smallSmash: 24, smash: 40 },
  45: { smallSmash: 25, smash: 40 },
  46: { smallSmash: 25, smash: 41 },
  47: { smallSmash: 25, smash: 42 },
  48: { smallSmash: 26, smash: 43 },
  49: { smallSmash: 26, smash: 44 },
  50: { smallSmash: 26, smash: 44 },
  51: { smallSmash: 27, smash: 45 },
  52: { smallSmash: 27, smash: 45 },
  53: { smallSmash: 27, smash: 46 },
  54: { smallSmash: 28, smash: 47 },
  55: { smallSmash: 28, smash: 47 },
  56: { smallSmash: 28, smash: 48 },
  57: { smallSmash: 28, smash: 49 },
  58: { smallSmash: 29, smash: 50 },
  59: { smallSmash: 29, smash: 50 },
  60: { smallSmash: 29, smash: 51 },
  61: { smallSmash: 30, smash: 52 },
  62: { smallSmash: 30, smash: 52 },
  63: { smallSmash: 30, smash: 53 },
  64: { smallSmash: 31, smash: 54 },
  65: { smallSmash: 31, smash: 54 },
  66: { smallSmash: 31, smash: 55 },
  67: { smallSmash: 31, smash: 56 },
  68: { smallSmash: 32, smash: 57 },
  69: { smallSmash: 32, smash: 57 },
  70: { smallSmash: 32, smash: 58 },
  71: { smallSmash: 33, smash: 58 },
  72: { smallSmash: 33, smash: 59 },
  73: { smallSmash: 33, smash: 60 },
  74: { smallSmash: 34, smash: 60 },
  75: { smallSmash: 34, smash: 61 },
  76: { smallSmash: 34, smash: 61 },
  77: { smallSmash: 34, smash: 62 },
  78: { smallSmash: 35, smash: 63 },
  79: { smallSmash: 35, smash: 63 },
  80: { smallSmash: 35, smash: 64 },
  81: { smallSmash: 36, smash: 64 },
  82: { smallSmash: 36, smash: 65 },
  83: { smallSmash: 36, smash: 66 },
  84: { smallSmash: 37, smash: 66 },
  85: { smallSmash: 37, smash: 67 },
  86: { smallSmash: 37, smash: 67 },
  87: { smallSmash: 37, smash: 68 },
  88: { smallSmash: 38, smash: 69 },
  89: { smallSmash: 38, smash: 69 },
  90: { smallSmash: 38, smash: 70 },
  91: { smallSmash: 39, smash: 70 },
  92: { smallSmash: 39, smash: 71 },
  93: { smallSmash: 39, smash: 72 },
  94: { smallSmash: 39, smash: 72 },
  95: { smallSmash: 40, smash: 73 },
  96: { smallSmash: 40, smash: 73 },
  97: { smallSmash: 40, smash: 74 },
  98: { smallSmash: 40, smash: 75 },
  99: { smallSmash: 41, smash: 76 },
  100: { smallSmash: 41, smash: 76 },
  101: { smallSmash: 41, smash: 76 },
  102: { smallSmash: 41, smash: 77 },
  103: { smallSmash: 42, smash: 77 },
  104: { smallSmash: 42, smash: 78 },
  105: { smallSmash: 42, smash: 78 },
  106: { smallSmash: 42, smash: 79 },
  107: { smallSmash: 43, smash: 79 },
  108: { smallSmash: 43, smash: 80 },
  109: { smallSmash: 43, smash: 80 },
  110: { smallSmash: 43, smash: 81 },
  111: { smallSmash: 43, smash: 81 },
  112: { smallSmash: 44, smash: 82 },
  113: { smallSmash: 44, smash: 82 },
  114: { smallSmash: 44, smash: 83 },
  115: { smallSmash: 44, smash: 83 },
  116: { smallSmash: 45, smash: 84 },
  117: { smallSmash: 45, smash: 84 },
  118: { smallSmash: 45, smash: 85 },
  119: { smallSmash: 45, smash: 85 },
  120: { smallSmash: 46, smash: 86 },
  121: { smallSmash: 46, smash: 86 },
  122: { smallSmash: 46, smash: 87 },
  123: { smallSmash: 46, smash: 87 },
  124: { smallSmash: 47, smash: 87 },
  125: { smallSmash: 47, smash: 88 },
  126: { smallSmash: 47, smash: 88 },
  127: { smallSmash: 47, smash: 89 },
  128: { smallSmash: 48, smash: 89 },
  129: { smallSmash: 48, smash: 90 },
  130: { smallSmash: 48, smash: 90 },
  131: { smallSmash: 48, smash: 91 },
  132: { smallSmash: 48, smash: 91 },
  133: { smallSmash: 49, smash: 92 },
  134: { smallSmash: 49, smash: 92 },
  135: { smallSmash: 49, smash: 92 },
  136: { smallSmash: 49, smash: 93 },
  137: { smallSmash: 50, smash: 93 },
  138: { smallSmash: 50, smash: 94 },
  139: { smallSmash: 50, smash: 94 },
  140: { smallSmash: 50, smash: 95 },
  141: { smallSmash: 51, smash: 95 },
  142: { smallSmash: 51, smash: 95 },
  143: { smallSmash: 51, smash: 96 },
  144: { smallSmash: 51, smash: 96 },
  145: { smallSmash: 51, smash: 97 },
  146: { smallSmash: 52, smash: 97 },
  147: { smallSmash: 52, smash: 97 },
  148: { smallSmash: 52, smash: 98 },
  149: { smallSmash: 52, smash: 98 },
  150: { smallSmash: 53, smash: 99 },
  151: { smallSmash: 53, smash: 99 },
  152: { smallSmash: 53, smash: 99 },
  153: { smallSmash: 53, smash: 100 },
  154: { smallSmash: 53, smash: 100 },
  155: { smallSmash: 54, smash: 100 },
  156: { smallSmash: 54, smash: 101 },
  157: { smallSmash: 54, smash: 101 },
  158: { smallSmash: 54, smash: 101 },
  159: { smallSmash: 55, smash: 102 },
  160: { smallSmash: 55, smash: 102 },
  161: { smallSmash: 55, smash: 102 },
  162: { smallSmash: 55, smash: 103 },
  163: { smallSmash: 55, smash: 103 },
  164: { smallSmash: 56, smash: 103 },
  165: { smallSmash: 56, smash: 104 },
  166: { smallSmash: 56, smash: 104 },
  167: { smallSmash: 56, smash: 104 },
  168: { smallSmash: 57, smash: 104 },
  169: { smallSmash: 57, smash: 105 },
  170: { smallSmash: 57, smash: 105 },
  171: { smallSmash: 57, smash: 105 },
  172: { smallSmash: 57, smash: 105 },
  173: { smallSmash: 58, smash: 106 },
  174: { smallSmash: 58, smash: 106 },
  175: { smallSmash: 58, smash: 106 },
  176: { smallSmash: 58, smash: 106 },
  177: { smallSmash: 58, smash: 107 },
  178: { smallSmash: 59, smash: 107 },
  179: { smallSmash: 59, smash: 107 },
  180: { smallSmash: 59, smash: 107 },
  181: { smallSmash: 59, smash: 108 },
  182: { smallSmash: 60, smash: 108 },
  183: { smallSmash: 60, smash: 108 },
  184: { smallSmash: 60, smash: 108 },
  185: { smallSmash: 60, smash: 108 },
  186: { smallSmash: 60, smash: 109 },
  187: { smallSmash: 61, smash: 109 },
  188: { smallSmash: 61, smash: 109 },
  189: { smallSmash: 61, smash: 109 },
  190: { smallSmash: 61, smash: 109 },
  191: { smallSmash: 61, smash: 110 },
  192: { smallSmash: 62, smash: 110 },
  193: { smallSmash: 62, smash: 110 },
  194: { smallSmash: 62, smash: 110 },
  195: { smallSmash: 62, smash: 110 },
  196: { smallSmash: 62, smash: 110 },
  197: { smallSmash: 63, smash: 110 },
  198: { smallSmash: 63, smash: 111 },
  199: { smallSmash: 63, smash: 111 },
  200: { smallSmash: 63, smash: 111 },
  201: { smallSmash: 63, smash: 111 },
  202: { smallSmash: 64, smash: 111 },
  203: { smallSmash: 64, smash: 111 },
  204: { smallSmash: 64, smash: 111 },
  205: { smallSmash: 64, smash: 111 },
  206: { smallSmash: 64, smash: 111 },
  207: { smallSmash: 65, smash: 111 },
  208: { smallSmash: 65, smash: 111 },
  209: { smallSmash: 65, smash: 111 },
  210: { smallSmash: 65, smash: 111 },
  211: { smallSmash: 65, smash: 111 },
  212: { smallSmash: 66, smash: 111 },
  213: { smallSmash: 66, smash: 111 },
  214: { smallSmash: 66, smash: 111 },
  215: { smallSmash: 66, smash: 111 },
  216: { smallSmash: 66, smash: 111 },
  217: { smallSmash: 67, smash: 111 },
  218: { smallSmash: 67, smash: 111 },
  219: { smallSmash: 67, smash: 111 },
  220: { smallSmash: 67, smash: 111 },
  221: { smallSmash: 67, smash: 111 },
  222: { smallSmash: 68, smash: 111 },
  223: { smallSmash: 68, smash: 111 },
  224: { smallSmash: 68, smash: 111 },
  225: { smallSmash: 68, smash: 111 },
  226: { smallSmash: 68, smash: 111 },
  227: { smallSmash: 69, smash: 111 },
  228: { smallSmash: 69, smash: 111 },
  229: { smallSmash: 69, smash: 111 },
  230: { smallSmash: 69, smash: 111 },
  231: { smallSmash: 69, smash: 111 },
  232: { smallSmash: 69, smash: 111 },
  233: { smallSmash: 70, smash: 111 },
  234: { smallSmash: 70, smash: 111 },
  235: { smallSmash: 70, smash: 111 },
  236: { smallSmash: 70, smash: 111 },
  237: { smallSmash: 70, smash: 111 },
  238: { smallSmash: 70, smash: 111 },
  239: { smallSmash: 71, smash: 111 },
  240: { smallSmash: 71, smash: 111 },
  241: { smallSmash: 71, smash: 111 },
  242: { smallSmash: 71, smash: 111 },
  243: { smallSmash: 71, smash: 111 },
  244: { smallSmash: 72, smash: 111 },
  245: { smallSmash: 72, smash: 111 },
  246: { smallSmash: 72, smash: 111 },
  247: { smallSmash: 72, smash: 111 },
  248: { smallSmash: 72, smash: 111 },
  249: { smallSmash: 72, smash: 111 },
  250: { smallSmash: 73, smash: 111 },
  251: { smallSmash: 73, smash: 111 },
  252: { smallSmash: 73, smash: 111 },
  253: { smallSmash: 73, smash: 111 },
  254: { smallSmash: 73, smash: 111 },
  255: { smallSmash: 73, smash: 111 },
  256: { smallSmash: 74, smash: 111 },
  257: { smallSmash: 74, smash: 111 },
  258: { smallSmash: 74, smash: 111 },
  259: { smallSmash: 74, smash: 111 },
  260: { smallSmash: 74, smash: 111 },
  261: { smallSmash: 74, smash: 111 },
  262: { smallSmash: 75, smash: 111 },
  263: { smallSmash: 75, smash: 111 },
  264: { smallSmash: 75, smash: 111 },
  265: { smallSmash: 75, smash: 111 },
  266: { smallSmash: 75, smash: 111 },
  267: { smallSmash: 75, smash: 111 },
  268: { smallSmash: 76, smash: 111 },
  269: { smallSmash: 76, smash: 111 },
  270: { smallSmash: 76, smash: 111 },
  271: { smallSmash: 76, smash: 111 },
  272: { smallSmash: 76, smash: 111 },
  273: { smallSmash: 76, smash: 111 },
  274: { smallSmash: 77, smash: 111 },
  275: { smallSmash: 77, smash: 111 },
  276: { smallSmash: 77, smash: 111 },
  277: { smallSmash: 77, smash: 111 },
  278: { smallSmash: 77, smash: 111 },
  279: { smallSmash: 77, smash: 111 },
  280: { smallSmash: 78, smash: 111 },
  281: { smallSmash: 78, smash: 111 },
  282: { smallSmash: 78, smash: 111 },
  283: { smallSmash: 78, smash: 111 },
  284: { smallSmash: 78, smash: 111 },
  285: { smallSmash: 78, smash: 111 },
  286: { smallSmash: 79, smash: 111 },
  287: { smallSmash: 79, smash: 111 },
  288: { smallSmash: 79, smash: 111 },
  289: { smallSmash: 79, smash: 111 },
  290: { smallSmash: 79, smash: 111 },
  291: { smallSmash: 79, smash: 111 },
  292: { smallSmash: 79, smash: 111 },
  293: { smallSmash: 80, smash: 111 },
  294: { smallSmash: 80, smash: 111 },
  295: { smallSmash: 80, smash: 111 },
  296: { smallSmash: 80, smash: 111 },
  297: { smallSmash: 80, smash: 111 },
  298: { smallSmash: 80, smash: 111 },
  299: { smallSmash: 81, smash: 111 },
  300: { smallSmash: 81, smash: 111 },
  301: { smallSmash: 81, smash: 111 },
  302: { smallSmash: 81, smash: 111 },
  303: { smallSmash: 81, smash: 111 },
  304: { smallSmash: 81, smash: 111 },
  305: { smallSmash: 82, smash: 111 },
  306: { smallSmash: 82, smash: 111 },
  307: { smallSmash: 82, smash: 111 },
  308: { smallSmash: 82, smash: 111 },
  309: { smallSmash: 82, smash: 111 },
  310: { smallSmash: 82, smash: 111 },
  311: { smallSmash: 82, smash: 111 },
  312: { smallSmash: 82, smash: 111 },
  313: { smallSmash: 83, smash: 111 },
  314: { smallSmash: 83, smash: 111 },
  315: { smallSmash: 83, smash: 111 },
  316: { smallSmash: 83, smash: 111 },
  317: { smallSmash: 83, smash: 111 },
  318: { smallSmash: 83, smash: 111 },
  319: { smallSmash: 83, smash: 111 },
  320: { smallSmash: 84, smash: 111 },
  321: { smallSmash: 84, smash: 111 },
  322: { smallSmash: 84, smash: 111 },
  323: { smallSmash: 84, smash: 111 },
  324: { smallSmash: 84, smash: 111 },
  325: { smallSmash: 84, smash: 111 },
  326: { smallSmash: 84, smash: 111 },
  327: { smallSmash: 85, smash: 111 },
  328: { smallSmash: 85, smash: 111 },
  329: { smallSmash: 85, smash: 111 },
  330: { smallSmash: 85, smash: 111 },
  331: { smallSmash: 85, smash: 111 },
  332: { smallSmash: 85, smash: 111 },
  333: { smallSmash: 85, smash: 111 },
  334: { smallSmash: 85, smash: 111 },
  335: { smallSmash: 86, smash: 111 },
  336: { smallSmash: 86, smash: 111 },
  337: { smallSmash: 86, smash: 111 },
  338: { smallSmash: 86, smash: 111 },
  339: { smallSmash: 86, smash: 111 },
  340: { smallSmash: 86, smash: 111 },
  341: { smallSmash: 86, smash: 111 },
  342: { smallSmash: 86, smash: 111 },
  343: { smallSmash: 87, smash: 111 },
  344: { smallSmash: 87, smash: 111 },
  345: { smallSmash: 87, smash: 111 },
  346: { smallSmash: 87, smash: 111 },
  347: { smallSmash: 87, smash: 111 },
  348: { smallSmash: 87, smash: 111 },
  349: { smallSmash: 87, smash: 111 },
  350: { smallSmash: 88, smash: 111 },
  351: { smallSmash: 88, smash: 111 },
  352: { smallSmash: 88, smash: 111 },
  353: { smallSmash: 88, smash: 111 },
  354: { smallSmash: 88, smash: 111 },
  355: { smallSmash: 88, smash: 111 },
  356: { smallSmash: 88, smash: 111 },
  357: { smallSmash: 88, smash: 111 },
  358: { smallSmash: 88, smash: 111 },
  359: { smallSmash: 89, smash: 111 },
  360: { smallSmash: 89, smash: 111 },
  361: { smallSmash: 89, smash: 111 },
  362: { smallSmash: 89, smash: 111 },
  363: { smallSmash: 89, smash: 111 },
  364: { smallSmash: 89, smash: 111 },
  365: { smallSmash: 89, smash: 111 },
  366: { smallSmash: 89, smash: 111 },
  367: { smallSmash: 90, smash: 111 },
  368: { smallSmash: 90, smash: 111 },
  369: { smallSmash: 90, smash: 111 },
  370: { smallSmash: 90, smash: 111 },
  371: { smallSmash: 90, smash: 111 },
  372: { smallSmash: 90, smash: 111 },
  373: { smallSmash: 90, smash: 111 },
  374: { smallSmash: 90, smash: 111 },
  375: { smallSmash: 91, smash: 111 },
  376: { smallSmash: 91, smash: 111 },
  377: { smallSmash: 91, smash: 111 },
  378: { smallSmash: 91, smash: 111 },
  379: { smallSmash: 91, smash: 111 },
  380: { smallSmash: 91, smash: 111 },
  381: { smallSmash: 91, smash: 111 },
  382: { smallSmash: 91, smash: 111 },
  383: { smallSmash: 91, smash: 111 },
  384: { smallSmash: 92, smash: 111 },
  385: { smallSmash: 92, smash: 111 },
  386: { smallSmash: 92, smash: 111 },
  387: { smallSmash: 92, smash: 111 },
  388: { smallSmash: 92, smash: 111 },
  389: { smallSmash: 92, smash: 111 },
  390: { smallSmash: 92, smash: 111 },
  391: { smallSmash: 92, smash: 111 },
  392: { smallSmash: 92, smash: 111 },
  393: { smallSmash: 93, smash: 111 },
  394: { smallSmash: 93, smash: 111 },
  395: { smallSmash: 93, smash: 111 },
  396: { smallSmash: 93, smash: 111 },
  397: { smallSmash: 93, smash: 111 },
  398: { smallSmash: 93, smash: 111 },
  399: { smallSmash: 93, smash: 111 },
  400: { smallSmash: 93, smash: 111 },
  401: { smallSmash: 93, smash: 111 },
  402: { smallSmash: 94, smash: 111 },
  403: { smallSmash: 94, smash: 111 },
  404: { smallSmash: 94, smash: 111 },
  405: { smallSmash: 94, smash: 111 },
  406: { smallSmash: 94, smash: 111 },
  407: { smallSmash: 94, smash: 111 },
  408: { smallSmash: 94, smash: 111 },
  409: { smallSmash: 94, smash: 111 },
  410: { smallSmash: 94, smash: 111 },
  411: { smallSmash: 95, smash: 111 },
  412: { smallSmash: 95, smash: 111 },
  413: { smallSmash: 95, smash: 111 },
  414: { smallSmash: 95, smash: 111 },
  415: { smallSmash: 95, smash: 111 },
  416: { smallSmash: 95, smash: 111 },
  417: { smallSmash: 95, smash: 111 },
  418: { smallSmash: 95, smash: 111 },
  419: { smallSmash: 95, smash: 111 },
  420: { smallSmash: 95, smash: 111 },
  421: { smallSmash: 96, smash: 111 },
  422: { smallSmash: 96, smash: 111 },
  423: { smallSmash: 96, smash: 111 },
  424: { smallSmash: 96, smash: 111 },
  425: { smallSmash: 96, smash: 111 },
  426: { smallSmash: 96, smash: 111 },
  427: { smallSmash: 96, smash: 111 },
  428: { smallSmash: 96, smash: 111 },
  429: { smallSmash: 96, smash: 111 },
  430: { smallSmash: 97, smash: 111 },
  431: { smallSmash: 97, smash: 111 },
  432: { smallSmash: 97, smash: 111 },
  433: { smallSmash: 97, smash: 111 },
  434: { smallSmash: 97, smash: 111 },
  435: { smallSmash: 97, smash: 111 },
  436: { smallSmash: 97, smash: 111 },
  437: { smallSmash: 97, smash: 111 },
  438: { smallSmash: 97, smash: 111 },
  439: { smallSmash: 97, smash: 111 },
  440: { smallSmash: 97, smash: 111 },
  441: { smallSmash: 97, smash: 111 },
  442: { smallSmash: 98, smash: 111 },
  443: { smallSmash: 98, smash: 111 },
  444: { smallSmash: 98, smash: 111 },
  445: { smallSmash: 98, smash: 111 },
  446: { smallSmash: 98, smash: 111 },
  447: { smallSmash: 98, smash: 111 },
  448: { smallSmash: 98, smash: 111 },
  449: { smallSmash: 98, smash: 111 },
  450: { smallSmash: 98, smash: 111 },
  451: { smallSmash: 98, smash: 111 },
  452: { smallSmash: 98, smash: 111 },
  453: { smallSmash: 99, smash: 111 },
  454: { smallSmash: 99, smash: 111 },
  455: { smallSmash: 99, smash: 111 },
  456: { smallSmash: 99, smash: 111 },
  457: { smallSmash: 99, smash: 111 },
  458: { smallSmash: 99, smash: 111 },
  459: { smallSmash: 99, smash: 111 },
  460: { smallSmash: 99, smash: 111 },
  461: { smallSmash: 99, smash: 111 },
  462: { smallSmash: 99, smash: 111 },
  463: { smallSmash: 99, smash: 111 },
  464: { smallSmash: 100, smash: 111 },
  465: { smallSmash: 100, smash: 111 },
  466: { smallSmash: 100, smash: 111 },
  467: { smallSmash: 100, smash: 111 },
  468: { smallSmash: 100, smash: 111 },
  469: { smallSmash: 100, smash: 111 },
  470: { smallSmash: 100, smash: 111 },
  471: { smallSmash: 100, smash: 111 },
  472: { smallSmash: 100, smash: 111 },
  473: { smallSmash: 100, smash: 111 },
  474: { smallSmash: 100, smash: 111 },
  475: { smallSmash: 101, smash: 111 },
  476: { smallSmash: 101, smash: 111 },
  477: { smallSmash: 101, smash: 111 },
  478: { smallSmash: 101, smash: 111 },
  479: { smallSmash: 101, smash: 111 },
  480: { smallSmash: 101, smash: 111 },
  481: { smallSmash: 101, smash: 111 },
  482: { smallSmash: 101, smash: 111 },
  483: { smallSmash: 101, smash: 111 },
  484: { smallSmash: 101, smash: 111 },
  485: { smallSmash: 101, smash: 111 },
  486: { smallSmash: 102, smash: 111 },
  487: { smallSmash: 102, smash: 111 },
  488: { smallSmash: 102, smash: 111 },
  489: { smallSmash: 102, smash: 111 },
  490: { smallSmash: 102, smash: 111 },
  491: { smallSmash: 102, smash: 111 },
  492: { smallSmash: 102, smash: 111 },
  493: { smallSmash: 102, smash: 111 },
  494: { smallSmash: 102, smash: 111 },
  495: { smallSmash: 102, smash: 111 },
  496: { smallSmash: 102, smash: 111 },
  497: { smallSmash: 103, smash: 111 },
  498: { smallSmash: 103, smash: 111 },
  499: { smallSmash: 103, smash: 111 },
  500: { smallSmash: 103, smash: 111 },
  501: { smallSmash: 103, smash: 111 },
  502: { smallSmash: 103, smash: 111 },
  503: { smallSmash: 103, smash: 111 },
  504: { smallSmash: 103, smash: 111 },
  505: { smallSmash: 103, smash: 111 },
  506: { smallSmash: 103, smash: 111 },
  507: { smallSmash: 103, smash: 111 },
  508: { smallSmash: 103, smash: 111 },
  509: { smallSmash: 104, smash: 111 },
  510: { smallSmash: 104, smash: 111 },
  511: { smallSmash: 104, smash: 111 },
  512: { smallSmash: 104, smash: 111 },
  513: { smallSmash: 104, smash: 111 },
  514: { smallSmash: 104, smash: 111 },
  515: { smallSmash: 104, smash: 111 },
  516: { smallSmash: 104, smash: 111 },
  517: { smallSmash: 104, smash: 111 },
  518: { smallSmash: 104, smash: 111 },
  519: { smallSmash: 104, smash: 111 },
  520: { smallSmash: 104, smash: 111 },
  521: { smallSmash: 104, smash: 111 },
  522: { smallSmash: 105, smash: 111 },
  523: { smallSmash: 105, smash: 111 },
  524: { smallSmash: 105, smash: 111 },
  525: { smallSmash: 105, smash: 111 },
  526: { smallSmash: 105, smash: 111 },
  527: { smallSmash: 105, smash: 111 },
  528: { smallSmash: 105, smash: 111 },
  529: { smallSmash: 105, smash: 111 },
  530: { smallSmash: 105, smash: 111 },
  531: { smallSmash: 105, smash: 111 },
  532: { smallSmash: 105, smash: 111 },
  533: { smallSmash: 105, smash: 111 },
  534: { smallSmash: 106, smash: 111 },
  535: { smallSmash: 106, smash: 111 },
  536: { smallSmash: 106, smash: 111 },
  537: { smallSmash: 106, smash: 111 },
  538: { smallSmash: 106, smash: 111 },
  539: { smallSmash: 106, smash: 111 },
  540: { smallSmash: 106, smash: 111 },
  541: { smallSmash: 106, smash: 111 },
  542: { smallSmash: 106, smash: 111 },
  543: { smallSmash: 106, smash: 111 },
  544: { smallSmash: 106, smash: 111 },
  545: { smallSmash: 106, smash: 111 },
  546: { smallSmash: 106, smash: 111 },
  547: { smallSmash: 107, smash: 111 },
  548: { smallSmash: 107, smash: 111 },
  549: { smallSmash: 107, smash: 111 },
  550: { smallSmash: 107, smash: 111 },
  551: { smallSmash: 107, smash: 111 },
  552: { smallSmash: 107, smash: 111 },
  553: { smallSmash: 107, smash: 111 },
  554: { smallSmash: 107, smash: 111 },
  555: { smallSmash: 107, smash: 111 },
  556: { smallSmash: 107, smash: 111 },
  557: { smallSmash: 107, smash: 111 },
  558: { smallSmash: 107, smash: 111 },
  559: { smallSmash: 107, smash: 111 },
  560: { smallSmash: 107, smash: 111 },
  561: { smallSmash: 108, smash: 111 },
  562: { smallSmash: 108, smash: 111 },
  563: { smallSmash: 108, smash: 111 },
  564: { smallSmash: 108, smash: 111 },
  565: { smallSmash: 108, smash: 111 },
  566: { smallSmash: 108, smash: 111 },
  567: { smallSmash: 108, smash: 111 },
  568: { smallSmash: 108, smash: 111 },
  569: { smallSmash: 108, smash: 111 },
  570: { smallSmash: 108, smash: 111 },
  571: { smallSmash: 108, smash: 111 },
  572: { smallSmash: 108, smash: 111 },
  573: { smallSmash: 108, smash: 111 },
  574: { smallSmash: 108, smash: 111 },
  575: { smallSmash: 109, smash: 111 },
  576: { smallSmash: 109, smash: 111 },
  577: { smallSmash: 109, smash: 111 },
  578: { smallSmash: 109, smash: 111 },
  579: { smallSmash: 109, smash: 111 },
  580: { smallSmash: 109, smash: 111 },
  581: { smallSmash: 109, smash: 111 },
  582: { smallSmash: 109, smash: 111 },
  583: { smallSmash: 109, smash: 111 },
  584: { smallSmash: 109, smash: 111 },
  585: { smallSmash: 109, smash: 111 },
  586: { smallSmash: 109, smash: 111 },
  587: { smallSmash: 109, smash: 111 },
  588: { smallSmash: 109, smash: 111 },
  589: { smallSmash: 109, smash: 111 },
  590: { smallSmash: 109, smash: 111 },
  591: { smallSmash: 110, smash: 111 },
  592: { smallSmash: 110, smash: 111 },
  593: { smallSmash: 110, smash: 111 },
  594: { smallSmash: 110, smash: 111 },
  595: { smallSmash: 110, smash: 111 },
  596: { smallSmash: 110, smash: 111 },
  597: { smallSmash: 110, smash: 111 },
  598: { smallSmash: 110, smash: 111 },
  599: { smallSmash: 110, smash: 111 },
  600: { smallSmash: 110, smash: 111 },
  601: { smallSmash: 110, smash: 111 },
  602: { smallSmash: 110, smash: 111 },
  603: { smallSmash: 110, smash: 111 },
  604: { smallSmash: 110, smash: 111 },
  605: { smallSmash: 110, smash: 111 },
  606: { smallSmash: 110, smash: 111 },
  607: { smallSmash: 110, smash: 111 },
  608: { smallSmash: 110, smash: 111 },
  609: { smallSmash: 111, smash: 111 },
  610: { smallSmash: 111, smash: 111 },
};
