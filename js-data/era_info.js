/* attention le mot const en declare plusieurs :
  (virgules en fin de ligne a la place du point-virgule) */
const

/* ce tableau liste les indices de chaque rues.
 * cela nous garantie de pouvoir faire la correspondance
 * entre numLoc et eraLayers['periode']
 */
streets = ["trans", "marchands", "marche", "herbes"],

/* contient, pour chaque periode,
 * les infos de chaque batiment pour chaque rue.
 * Sert a remplir les info-bulles pour chaque epoque
 */
eraLayers = {
  "Contemporain" : {
    "trans" : {
      "3"  : "R'eve",
      "4"  : "Dog Station",
      "7"  : "Intemporel Déco",
      "8"  : "Infini'tifs",
      "9"  : "Caboch'Arts",
      "14" : "Au relieur",
      "19" : "Elephant Knives coutelier",
      "21" : "O Clair des Pierres",
      "23" : "L'atelier de Myr",
      "24" : "Le comptoir de Nelly",
      "27" : "Smart Candle 83",
      "28" : "Dracart",
      "30" : "Le k-fé inventé",
      "31" : "Ludo Ado Cuir",
      "33" : "Atelier Photos",
      "34" : "Les Allumés d'Arts",
      "36" : "Magasin Oriental",
      "38" : "Les potiront",
      "43" : "le petit atelier de couture",
      "45" : "Atelier 45 Philippe Rossi Sculpteur",
      "65" : "Cayssials Tennis",
    },
    "marchands" : {
      "1"  : "Snack chez Loua",
      "1B" : "Serge Contat",
      "4"  : "Ribambelle et Co",
      "8"  : "Atelier JDA",
      "12" : "Boucherie traiteur Michel Frères",
      "14" : "Petite Agerola",
    },
    "marche" : {
      "27" : "Boucherie Labat",
      "31" : "Bar-Tabac Le Marigny Loto"
    },
    "herbes" : {
      "2"  : "Les 1000 Colonnes Bar Restaurant",
      "3"  : "Old Street",
      "6"  : "Briollo by Lores",
      "7"  : "Pharmacie Herboristerie Reybaud",
      "8"  : "L'homme by S",
      "12" : "Anh Dao Traiteur",
    },
  },
  "Moderne" : {
    "trans" : {
       "2"  : "Bar «la rotonde»",
       "3"  : "Fromagerie",
       "4"  : "Magasin de pâtes Marie Garçin",
    // "5"  : "Coiffeur pour dames « Vartan »", 
       "6"  : "Restaurant « la niçoise »",
       "8"  : "Triperie « Pastouret »",
      "10"  : "Tailleur « Tito Nannelli »",
      "12"  : "Imprimerie Garcin",
      "14"  : "Epicier « Minas »",
      "19"  : "Vins « Forni »",
      "20"  : "Torréfaction", 
      "21"  : "Epicerie « Gastaldi »",
      "23"  : "Coutelier aiguiseur « Provido »",
      "24"  : "Epicerie « chez mme COLLE»",
      "26"  : "Boulangerie « Pelissier »", 
      "28"  : "Coiffeur « Victor »",
      "30"  : "Le chevillard Lyonnais « Guenon »",
      "31"  : "Ferailleur chiffonnier « Marsiglia »", 
      "33"  : "Tourneur sur bois « Martinoli »",
      "34"  : "Cordonnier « Grisollia »",
      "34B" : "Epicerie « A.Romey »",
      "36"  : "Cinéma ambulant « Foucou »", 
      "38"  : "Epicerie Rossi",
      "43"  : "Etameur « Passerin »",
      "45"  : "Cordonnier « Pellutiero »",
      "48"  : "Tailleur « J.Jangotchiant »",
      "61"  : "bar « le bon jus »",
      "63"  : "bar « le bon jus »",
      "65"  : "Cordage Tennis",
    },
    "marchands" : {
       "2" : "Pharmacie « Reboul »",
       "3" : "Radios et disques « Fabre »",
       "4" : "Coiffeur pour dames « Gauthier »",
       "6" : "Bottier « ARAM »",
       "7" : "Quincallerie « GOIRAND » entrepôt",
       "8" : "Mercerie chez « TITINE »",
       "9" : "Quincailler « GOIRAND » Vente",
      "10" : "Opticien Auguste Grel",
      "11" : "Repasseuse Marzet",
      "12" : "Machines à écrire « PREJEAN »",
      "14" : "Epicerie DEMAZIERES",
    },
    "herbes" : {
      "1" : "Boulangerie « Albissier »",
      "2" : "Le café des mille colonnes",
      "3" : "Bar tabac",
      "4" : "Murisserie bananes",
      "5" : "Mercerie « PRAT »",
      "7" : "Magasin electricité « RAMONDA »",
      "8" : "Chaussures « BOZABALIAN »",
    },
  },
  "Historique"   : {
    "trans" : {
      "2" : "maison Revaute",
      "3" : "maison Surle",
      "4" : "maison Ferrier",
   // "5" : "maison Cavasse",
      "6" : "maison Bonnet",
      "7" : "maison Andre",
      "8" : "maison Gues",
      "9" : "maison Giboin",
      "10" : "maison Provido",
      "12" : "maison Donadey",
      "14" : "maison Donadey",
      "18" : "maison Negro",
      "20" : "maison Bellon",
      "21" : "maison Saglietto",
      "22" : "maison Vassal",
      "24" : "maison Ferraud",
      "28" : "maison Maunier",
      "32" : "maison Truc",
      "34" : "hotellerie Fleur de Lys",
      "38" : "maison Fauchat",
      "42" : "maison Clavier",
      "44" : "maison Reboul",
      "47" : "maison Cavalier",
      "48" : "maison Imbert",
      "49" : "maison Giraud",
      "50" : "maison Giran",
      "51" : "maison Pellenq",
      "53" : "maison Ricard",
      "57" : "maison Casimir",
      "61" : "hostellerie Tete d'Or",
      "63" : "hostellerie Tete d'Or",
    },
    "marchands" : {
       "1" : "maison Granet",
       "2" : "maison Digites",
       "3" : "maison Caussemille",
       "4" : "maison Barbaroux",
       "6" : "chapelle clandestine de Thereson",
       "7" : "maison Laugier",
       "8" : "maison Clavel",
       "9" : "maison Cadish",
      "10" : "maison Giraud",
      "11" : "maison Sivan",
      "12" : "maison Sivan",
      "13" : "maison Missimilly"
    },
    "herbes" : {
      "1" : "maison Vintimille",
      "2" : "auberge des 3 Rois",
      "3" : "maison Chabaud",
      "4" : "maison Castel",
      "5" : "maison Faucachon",
      "7" : "maison Missimilly",
      "8" : "maison Gal",
    }
  }
};